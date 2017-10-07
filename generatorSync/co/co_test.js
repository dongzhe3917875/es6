let co = require('./co_source.js')
let thunkify = require('./thunkify.js')
console.log(co)
let fs = require('fs')

co(function* () {
  let result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});

let onerror = function(err) {
  console.log('from onerror')
  console.log(err.stack)
}

co(function *(){
  // resolve multiple promises in parallel
  let a = Promise.resolve(1);
  let b = Promise.resolve(2);
  let c = Promise.resolve(3);
  let res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error('from throw', err.message); // "boom"
  }
}).catch(onerror);

// Yieldables yield支持的类型
// promise 这个自然没问题

// thunk 这个指的是只支持单个参数的函数 包括回调函数也是 但是只支持服务端那种err data参数的回调函数
let readFileThunk = thunkify(fs.readFile)
co(function *() {
  let file1 = yield readFileThunk('./text.txt', 'utf-8')
  return file1
}).then(function(finalVal) {
  console.log('finalVal', finalVal)
})

// array就转换为了promise.all

// object也转换为了 promise.all
co(function* () {
  let res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  }

  // console.log(res); // => { 1: 1, 2: 2 }
  return res
}).then(function(results) {
  console.log('results:' , results)
}).catch(onerror);