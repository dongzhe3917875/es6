let fs = require('fs')
let readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

let gen = function* (){
  let f1 = yield readFile('./text.txt')
  let f2 = yield readFile('./text2.txt')
  console.log(f1.toString())
  console.log(f2.toString())
}

let g = gen()

g.next().value.then(data => {
  g.next(data).value.then(data => {
    g.next(data)
  })
})
