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

let getJSON = url => get(url).then(JSON.parse)

let getStory = (url, story) => getJSON(url).then(response => {
  story.innerHTML = response.heading
  return response
})

let getChapter =  (story) => {
  let storyPromise
  storyPromise = storyPromise || getStory('story.json', story)
  var getSingleChapter = (index) => storyPromise.then((storys) => {
    var next = storys.chapterUrls[index + 1] && true || false
    getJSON(storys.chapterUrls[index]).then((chapter => {
      addHtmlToPage(chapter.html, story)
      // 在这里利用了迭代器模式
      // 在then里面 要么返回一个promise 要么返回一个值 保证可以让then一直进行下去
      return next && getSingleChapter(index + 1) || undefined
    }))
  })
  return getSingleChapter
}

let addHtmlToPage = (html, page) => {
  let node = document.createElement('div')
  node.innerHTML = html
  page.appendChild(node)
}
// get('story.json').then(response => console.log('success', response), (err) => console.log('failed', err))