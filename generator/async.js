function* gen(url) {
  let result = yield fetch(url)
  document.body.innerHTML = result.bio
}

let g = gen('https://api.github.com/users/github')
let result = g.next()
result.value
  .then(json => json.json())
  .then(value => g.next(value))