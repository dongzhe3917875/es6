function bar(x=2, y=x) {
  console.log([x, y])
  return [x, y];
}
bar();
function func(arg) {
  {
    let arg = "ssss";
    console.log("define param: " + arg);
  }
  console.log("function param: " + arg);
}
func("aaaa");
// 每个代码块都只能定义一个人let 且只在代码块中有意义
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n);
}
f1();
// let + {} = 匿名function + var

// conat的数值一旦声明就不能改变 所以声明后需要立刻初始化、
// 只在块级作用域内有效
// 不能重复声明
// 如果指向地址 只能保证地址不变

// 冻结对象 Object.freeze({})
const foo = Object.freeze({})
// foo.aaa = 'aaa'   error
const foo1 = {};
foo1.aaa = 'aaa' // right

// Object.freeze只是浅冻结 要想深冻结 就需把所有对象属性冻结

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, value) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
}
// var 的变量属于window
// let const的属性不属于 window

