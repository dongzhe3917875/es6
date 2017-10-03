// 可以直接遍历数组的值
var arr = ['a', 'b', 'c']

for (let value of arr) {
  console.log(value)
}

// 相当于
for (let value, i = 0; value = arr[i++]; i <= arr.length) {
  console.log(value)
}

// 同时遍历

for (let [key, value] of arr.entries()) {
  console.log(key, value)
}

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
let obj = {
  a: '1',
  b: '2',
  d: '4',
  e: '7',
  c: '3'
}
for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}

// break 也可以
var arr2 = [1,2,3]
arr2[Symbol.iterator] = function() {
  const self = this
  var index = 0
  return {
    next () {
      if (index < self.length) {
        return {done: false, value: self[index++]}
      } else {
        return {done: true, value: undefined}
      }
    },
    return () {
      console.log('stop before:', self[index-1], ' you can do some thing here when break')
      return {done: true}
    }
  }
}
for (var item of arr2) {if (item > 2) break; console.log(item)}

// 利用Generator实现Iterator

var myIterable = {};

myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...myIterable]) // [1, 2, 3]