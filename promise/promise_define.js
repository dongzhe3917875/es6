let promise = status => new Promise((resolve, reject) => status && resolve(true) || reject(false))
promise(true).then(ele => console.log(ele))
promise(false).then(undefined, err => console.log('error', err))

// JavaScript promise API 将任何使用 then() 方法的结构都当作 promise 一样（或按 promise 的说法为 thenable）来处理
// 可以使用 Promise.resolve 将其他类型转换为promise

var jsPromise = Promise.resolve($.ajax('/whatever.json'))

// 如果promise的then返回一个值 那么把这个值当成下一个promise接受的数据
// 如果promise还返回一个promise 那么会等到resolve或者reject的时候 才会把数据给下一个then