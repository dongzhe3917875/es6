// rest参数 获得剩余的参数
function add(...values) {
	let sum = 0;
	for (var val of values) {
		sum += val
	}
	return sum;
}

add(2, 3, 4)

const sortNumbers = (...numbers) => numbers.sort();
sortNumbers(2, 5, 3, 7, 1, 8);

// rest参数之后不能再有其他参数

function push(array, ...items) {
	items.forEach(ele => array.push(ele))
}
var a = [];
push(a, 1, 2, 3, 4, 5)

// ... 不仅可以将参数转换为数组， 也可以将数组转换为参数
// 而且这个不要求必须放到最后 也就是说后面可以有其他参数
console.log(1, ...[2, 3, 4], 5)

function minus(x, y) {
	return x - y;
}

minus(...[10, 7])

// 可以作为跳板 现转换为参数 在转换为数组
[...document.querySelectorAll('div')] instanceof Array // true
// rest和扩展结合使用
function add (a, b) {
	return a + b
}
function f(v, w, x, ...values) {
	console.log(v,w,x,values)
	console.log(add(...values))
}
var args = [0, 1];
f(-1, ...args, 2, 5);
var args = [1, 2, 3]
// 与apply等价
func.apply(null, args) === func(...args)
// max
Math.max(...[14, 3, 77]) === Math.max.apply(null, 14, 3, 77])
// push
Array.prototype.push.apply([0, 1, 2], [3, 4, 5]) === [0, 1, 2].push(...[3, 4, 5]);

// 扩展运算法...相当于把数组中的元素解放出来 变成参数序列 具体怎么再组合可以灵活使用
var ar1 = [1, 2, 3]
var ar2 = [2, 3, 4]
var ar3 = [3, 4, 5]
var arrconcat = [...ar1, ...ar2, ...ar3]

// 将字符串转换为数组
[...'hello']
// 扩展运算符内部调用的是数据结构的Iterator接口
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
