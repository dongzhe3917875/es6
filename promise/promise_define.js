let promise = status => new Promise((resolve, reject) => status && resolve(true) || reject(false))
promise(true).then(ele => console.log(ele))
promise(false).then(undefined, err => console.log('error', err))

// JavaScript promise API 将任何使用 then() 方法的结构都当作 promise 一样（或按 promise 的说法为 thenable）来处理
// 可以使用 Promise.resolve 将其他类型转换为promise

var jsPromise = Promise.resolve($.ajax('/whatever.json'))

// 如果promise的then返回一个值 那么把这个值当成下一个promise接受的数据
// 如果promise还返回一个promise 那么会等到resolve或者reject的时候 才会把数据给下一个then

// 对错误的处理
// 1.使用then的第二个参数处理错误
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.log("Failed!", error);
})

// 2.使用catch
get('story.json').then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})

// 等价于

get('story.json').then(function(response) {
  console.log("Success!", response);
}).then(undefined, function(error) {
  console.log("Failed!", error);
})

// then(func1).catch(func2) 拒绝时两者皆会调用

// promise all
// Promise.all 包含一组 promise，并创建一个在所有内容成功完成
// 后执行的 promise。您将获得一组结果（即一组 promise 执行的结果），其顺序与您与传入 promise 的顺序相同。
Promise.all(arrayOfPromises).then(function(arrayOfResults) {
  //...
})