let async1 = () => {
  return new Promise((resolve, reject) => setTimeout(() => {
    console.log(1)
    reject(1)
  }, 200))
}
// 明确拒绝时，会发生拒绝 两者皆触发
// async1().catch((ele) => console.log(ele))

// 还可以隐式拒绝

let jsonPromise = new Promise((resolve, reject) => resolve(JSON.parse("This ain't JSON")))
// 如果在触发的resolve引发错误 第一个then怎么也不会发生的 往后继续找catch
jsonPromise
  .then(data => console.log(data))
  .then(data => console.log('1111'))
  .catch(err => console.log('err: ' + err))

// 如果有reject处理
let jsonPromiseReject = new Promise((resolve, reject) => reject(JSON.parse("This ain't JSON")))

// 无论resolve还是reject 出错了 都会被catch

// 也可以捕获 在nodejs中多用catch
jsonPromiseReject
  .then(data => console.log(data))
  .catch(err => console.log('err: ' + err))

// 在浏览器中可以用reject来捕获错误, 可以看出打印的信息更丰富

jsonPromiseReject
  .then(data => console.log(data), err => console.log(err))

// catch还能捕获错误的错误

jsonPromiseReject
  .then(data => console.log(data), err => {
    return async1()
  }).catch(err => console.log('err: ' + err))

// 错误被捕获而后续代码继续执行

// catch可以继续接then来处理最终逻辑

