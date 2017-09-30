
// 数组是按照顺序取值的 对象是按照名字对应取值的
var { foo, bar } = { foo: 'dong', bar: 'zhe' };

// 变量名与属性不一样的写法
var {foo: f} = {foo: "dongzhe"}

// let在同一个代码块是不能重复定义的 我们可以用一个开头的圆括号来
// 使得解析器不会认为里面的大括号是一个代码块 可以正常的赋值

let foolet;
({foolet} = {foolet: 'hehehe'})

// 嵌套赋值
var obj = {
	p: [
		"hello",
		{
			y: 'world'
		}
	]
}
var {p} = obj;
var [x, {y}] = obj.p

// 默认值也需要严格等于undefined、
// var { message: msg = 'Something went wrong' } = {message: undefined};
var { message: msg = 'Something went wrong' } = {};

// 解构赋值一般是将声明和赋值在一起进行的 若要先声明再赋值 则需要很小心的
// 必须加上小括号使得解析器不会把大括号解析为代码块
var x1
({x1} = {x1: "hahaha"})
// ps 加上小括号可以使其内部变成一个表达式 而不是语句 {a:1}实际上是一个标签语句 ({a:1})被转换为一个表达式

// 可以把数组当成对象来解构 [1, 2, 3] => {0:1,1:2,2:3}
var arr = [1, 2, 3];
var {0: first, [arr.length -1]: last} = arr; // 方括号的写法属于属性名表达式





