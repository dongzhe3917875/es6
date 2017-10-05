let fs = require('fs')
let readFileAsync = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// let readFileAsync = file => new Promise((resolve, reject) => fs.readFile(file, 'utf-8', (err, data) => err? reject(err): resolve(data)))

readFileAsync('./text.txt')
  .then(data => console.log(data))
  .then(() => readFileAsync('./text2.txt'))
  .then(data => console.log(data))
  .catch(err => console.log(err))