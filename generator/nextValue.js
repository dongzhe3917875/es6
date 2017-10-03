function* f() {
  for (let i = 0; true; i++) {
    var reset = yield i;
    if (reset) i = -1
  }
}
// 如果next方法没有参数，每次运行到yield表达式，
// 变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数
// （即true），因此i会等于-1，下一轮循环就会从-1开始递增。
let g = f()

console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next(true))

function* foo(x) {
  let y = 2 * (yield (x + 1));
  let z = yield (y / 3);
  return (x + y + z);
}

let a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

let b = foo(5);
b.next() // { value:6, done:false }
// 设置的是上一次yield的值 2 * 12 / 3 = 8
console.log(b.next(12)) // { value:8, done:false }
// 设置的是上一次yield的值 y = 24 z = 13    24 + 13 + 5 = 42
console.log(b.next(13)) // { value:42, done:true }

// wrapper 是为了第一次就可以给next传参数

var wrapper = func => (...args) => {
  let g = func.apply(this, args)
  g.next()
  return g
}
var demo = function* () {
  console.log(`First input: ${yield}`)
  return 'DONE'
}
let wrapped = wrapper(demo)
wrapped().next('hello world')

