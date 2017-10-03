let makeIterator = arr => {
  let index = 0
  return {
    next() {
      return index < arr.length? {value: arr[index++], done: false} : {value: undefined, done: true}
    }
  }
}

let it = makeIterator(['a', 'b'])
console.log(it.next())
console.log(it.next())
console.log(it.next())

// 遍历Iterator可以使用for of Iterator接口主要供for...of消费
// 默认的 Iterator 接口部署在数据结构的Symbol.iterator属性
// 因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。
// 该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

