// 1:交换值
var x = 1, y = 2;
[x, y] = [y, x];

// 2:取函数的对象形式的返回值
// 返回一个数组

function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();

// 3:提取JSON DATA
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

// 4: 给函数设定默认值

// 5;遍历MAP解构
var map = new Map();
map.set('first', 'dong');
map.set('last', 'zhe');
for (let [key, value] of map) {
	console.log('key: ' + key +' , value: ' + value);
}

// 6:加载模块的时候也很有用
const { SourceMapConsumer, SourceNode } = require("source-map");
