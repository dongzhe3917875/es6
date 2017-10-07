let fs = require('fs')
let readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
let run = fn => {
  let g = fn()
  let next = (data) => {
    let result = g.next(data)
    if (result.done) return;
    result.value.then(data => {
      console.log(data)
      next(data)
    })
  }
  next()
}

let g = function* (){
  let f1 = yield readFile('./text.txt')
  console.log('f1', f1)
  let f2 = yield readFile('./text.txt')
  console.log('f2', f2)
};

run(g);