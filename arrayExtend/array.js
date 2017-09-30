// Array.from
// Array.of
// Array.copyWithin
// Array.find
// Array.findIndex
// Array.fill
// Array.keys Array.values Array.entries 
// Array.includes

// 类数组 可以迭代 有length属性
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5 convert
let arr1 = [].slice.call(arrayLike);

// ES6 convert
let arr2 = Array.from(arrayLike);

// let arr3 = [...arrayLike];  这个有问题 // 扩展运算符转换不了这种
// 有length的数组

// list
Array.from(arrayLike).forEach(ele => console.log(ele))

// nodelist
// Array.from(document.querySelectorAll('div'));

// argyments
function hello(a, b, c) {
	console.log(Array.from(arguments))
}
hello(1, 2, 3);

// string
Array.from('hello')

// Set

let nameSet = new Set(['a', 'b']);
Array.from(nameSet);

// 有length的对象
Array.from({length: 3});
// [...{length:3}] 会报错

// 生成顺序列
// 一句话生成序列数组
Array.from({length:23}).map((ele, index)=> index)
Object.keys(String(new Array(24)).split(''))
Array.from({length: 5}, (v, k) => k)

// 第一个参数指定第二个参数的运行次数
Array.from({ length: 2 }, () => 'jack') // ['jack', 'jack']

// 
Array.from({ length: 2 }, function(){ return this.name}, {name: 'dongzhe'})

// Array.from({ length: 2 }, () => this.name, {name: 'dongzhe'})
// 上面那行代码是有问题的 箭头函数是继承this的 不能够自己绑定this 
// 1 使用function形式 2.如果一定要用箭头函数 需要改成如下形式
Array.from({ length: 2 }, ((obj) => () => obj.name)({name: 'dongzhe'}))
// profill
const toArray = (() => Array.from? Array.from: obj => [].slice.call(obj))()

// 选取DOM节点
// let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.of()
// new Array is instead of Array.of
var arr = Array.of()  // []
var oarr  = new  Array() // []

var arr1 = Array.of(3) // [3]
var oarr1 = new Array(3) // [undefined, undefined, undefined]

var arr2 = Array.of(1, 2, 3) // [1, 2, 3]
var oarr2 = new Array(1, 2, 3) // [1, 2, 3]

// copyWithin() 会改变数组本身
// 接受三个参数 a, b, c 会将b到c的位置的数据复制到从a开始的往后的位置
var arr3 = [1, 2, 3, 4, 5, 6] // 把5, 6 替换 1，2
arr3.copyWithin(0, 4)
// 插入到2之后
var arr4 = [1, 2, 3, 4, 5, 6];
arr4.splice(2, 0, 5, 6)

var arr5 = [1, 2, 3, 4, 5, 6];
var insertArray = [5, 6];
arr5.splice(2, 0, ...insertArray);
// [ 1, 2, 5, 6, 3, 4, 5, 6 ]

// 给对象复制添加数据
[].copyWithin.call({length: 5, 3: 1, 4: 2}, 0, 3)

// Array.find 找到第一个符合数据的值
[1, 4, -5, 10].find(n => n < 0);

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

// 可以弥补NaN的不足
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0

// Array.fill
var arr6 = ['a', 'b', 'c'];
Array.fill(7, 1, 2) // fill方法从1号位开始，向原数组填充7，到2号位之前结束

for (let index of['a', 'b'].keys()) {
  console.log(index)
}
for (let value in ['a', 'b'].values()) {
  console.log(value)
}
for (let [index, elem] of['a', 'b'].entries()) {
  console.log(index, elem);
}
// for...of  can call next function to iterator
// Array.includes 判断是否存在特定的值 第二个值规定了起始位置
var arr7 = [1, true, NaN, "3"];
arr7.includes(NaN) // true
// instead
const contains = (() =>
	Array.prototype.includes ? (arr, value) => arr.includes(value) : (arr, value) => arr.some(el => el === value)
)();
contains(["foo", "bar"], "baz"); // => false
// ES6则是明确将空位转为undefined 相当于使用Array.from来转换数组 也可以使用
// ...扩展运算符呢 注意他的局限性 
// 最后避免出现空位是最好的选择