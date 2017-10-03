// 因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。
// 该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

let arr = ['a', 'v', 'e']
let iter = arr[Symbol.iterator]()
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())

class RangeIterator {
  constructor (start, stop) {
    this.value = start
    this.stop = stop
  }
  // 定义
  [Symbol.iterator]() {
    return this
  }
  // 一定要定义next
  next () {
    var value = this.value
    if (value < this.stop) {
      this.value++
      return {done: false, value}
    } else {
      return {done: true, value: undefined}
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop)
}
// for of 按顺序调用
for (var item of range(0,3)) {
  console.log(item)
}
let obj = {
  data: ['dongzhe', 'henhao', 'feichanghao'],
  [Symbol.iterator]() {
    const self = this
    var index = 0
    return {
      next() {
        if (index < self.data.length) {

        }
      }
    }
  }
}