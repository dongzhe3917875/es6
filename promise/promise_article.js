// article = loading + load(title) + load(context * N) + loading_end
let get = url => {
  return new Promise((resolve, reject) => {
    // 创建XMLhttpRequest
    let req = new XMLHttpRequest()
    req.open('GET', url)
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response)
      } else {
        reject(Error(req.statusText))
      }
    }
    req.onerror = () => reject(Error("Network Error"))
    req.send()
  })
}

// 转化为JSON
let getJSON = url => get(url).then(JSON.parse)

// 加载标题
let getStory = (url, story) => getJSON(url).then(response => {
  story.innerHTML = response.heading
  return response
})

// 加载单个章节

let getSpecifyChapter =  (source = 'story.json', story) => {
  // 闭包
  let storyPromise
  // 单例模式
  storyPromise = storyPromise || getStory(source, story)
  return index => storyPromise
    .then(storys => getJSON(storys.chapterUrls[index]))
    .then(chapter => addHtmlToPage(chapter.html, story))
    .catch(err => addTextToPage(err, story))
}

// 依次加载章节
let getChapter =  (story) => {
  // 闭包
  let storyPromise
  // 单例模式
  storyPromise = storyPromise || getStory('story.json', story)
  let getSingleChapter = (index) => storyPromise.then((storys) => {
    let next = storys.chapterUrls[index + 1] && true || false
    getJSON(storys.chapterUrls[index]).then((chapter => {
      addHtmlToPage(chapter.html, story)
      // 在这里利用了迭代器模式
      // 在then里面 要么返回一个promise 要么返回一个值 保证可以让then一直进行下去
      return next && getSingleChapter(index + 1) || undefined
    })).catch(err => addTextToPage(err, story))
  })
  return getSingleChapter
}

let getSequenceChapter = (source = 'story.json', story) => {
  // 闭包
  let storyPromise
  // 单例模式
  storyPromise = storyPromise || getStory(source, story)
  return storyPromise
    .then(storys => {
      // TODO: for each url in story.chapterUrls, fetch &amp; display
      // 将 chapterUrls 数组转变为 promise 序列
      // // Start off with a promise that always resolves Promise.resolve()
      storys.chapterUrls.reduce((sequence, chapterUrl) => {
        return sequence.then(() => getJSON(chapterUrl)).then(chapter => addHtmlToPage(chapter.html, story))
      }, Promise.resolve())
    })
    // Catch any error that happened along the way
    .catch(err => addTextToPage("Argh, broken: " + err.message, story))
    .then(() => document.querySelector('.spinner').style.display = 'none')
}


let addHtmlToPage = (html, page) => {
  let node = document.createElement('div')
  node.innerHTML = html
  page.appendChild(node)
}

let addTextToPage = (html, page) => page.innerHTML = html
// get('story.json').then(response => console.log('success', response), (err) => console.log('failed', err))