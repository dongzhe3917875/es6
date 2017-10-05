// Thunk版本的readFile（单参数版本）
let fs = require('fs')
let Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, 'utf-8', callback)
  }
}

let readFileThunk = Thunk('./text.txt')
readFileThunk(function(err, data) {
  console.log(data)
});

// Thunk 函数转换器
const ThunkTransfer = fn => (...args) => callback => fn.call(null, ...args, callback)

let readFileThunkTransfer = ThunkTransfer(fs.readFile);
readFileThunkTransfer('./text.txt', 'utf-8')(function(err, data) {
  console.log(data)
})