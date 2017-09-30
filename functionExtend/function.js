// ES6支持函数参数默认值
// ES5
// typeof undefined = 'undefined'
// y = y || 'World'; 这样写会忽略y为‘’的情况 
function log(x, y) {
	if (typeof y === 'undefined') {
		y = 'world';
	}
	console.log(x, y)
}
log('hello', '')
log('hello')

// ES6 支持默认值
function log2(x, y = 'world') {
	console.log(x, y);
}
function Point(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}
var p = new Point();
// 参数变量是默认声明的 不能用let const再次声明
// 区分两个概念 解构赋值的默认值和函数的默认值

// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 解构赋值的默认值无论传什么都会保证有值 可以覆盖的值就覆盖 不覆盖就是默认值
// 函数默认值只要传值就会被覆盖 只有不传值才会保留默认值
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

// 定义了默认值的参数，应该是函数的尾参数

// 指定了默认值以后，函数的length属性，
// 将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
// 这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，
// 预期传入的参数个数就不包括这个参数了。同理，rest参数也不会计入length属性。
(function(...args) {}).length // 0
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

// 变量的作用域规则是不变的
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2 x是局部变量 所以优先取得局部变量的值 在赋值的一瞬间决定的


var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined

// 相当于
var x = 1;
function foo(x) {
	x = x
	let x;
}

// 如果参数的默认值是一个函数，该函数的作用域是其声明时所在的作用域

// 应用 指定某个参数不能为空
function throwIfMissing() {
	throw new Error('Missing parameter')
}
function foo(must = throwIfMissing()) {
	return must;
}
foo();
foo('dongzhe');

// 这表明参数的默认值不是在定义时执行，
// 而是在运行时执行（即如果参数已经赋值，默认值中的函数就不会运行）

// 指定默个参数是可以生省略的
function foo(optional = undefined) { 
	console.log(optional)
}



