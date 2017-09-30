// 解构赋值最基本用法
var [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third1] = ['foo', 'bar', 'bar'];
let [x, ,y] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
// head 1
// tail [2, 3, 4]
// 解构不成功 返回undefiend
var [bar1, foo1] = [1];
// foo1 undefined

// 不完全解构
let [x1, y1] = [1, 2, 4];

// 不可遍历的解构 报错
// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

function* fibs() {
  var a = 0;
  var b = 1;
  while(true) {
    yield a;
    [a, b] = [b, a+b];
  }
}
var [first, second, third, forth, fifth, sixth] = fibs();
// 每取得一个值就调用一次next函数 并返回对象中的value值 即使无穷大也没关系
// 因为真正要取值的时候才会调用
console.log(sixth)

//可以存在默认值，默认值只有在赋值为undefined的时候才生效
var [default1 = 1] = [undefined];
console.log(default1); // 默认值生效
var [default2 = 1] = [null];
console.log(default2); // 默认值被复制

