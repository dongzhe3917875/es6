function* gen(x) {
  let y = yield x + 2
  return y
}
let g = gen(1)
// next会停在yield的位置上 值是yield后面表达式的值
console.log(g.next())
console.log(g.next())

// next也接受参数输入

function* genNew(x) {
  let y = yield x + 2
  let z = yield y + 10
  return z + 1
}
let gNew = genNew(1)
console.log(gNew.next())
// 第二个 next 方法带有参数2，这个参数可以传入 Generator
// 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此，这一步的 value 属性，返回的就是2（变量 y 的值）。
console.log(gNew.next(2)) // 2给了y
// 最后一个总是return
console.log(gNew.next(6)) // 6给了z

function* genError(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

let gError = genError(1)
gError.next()
gError.throw('出错了')
// 出错了