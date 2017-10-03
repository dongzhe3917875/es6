function* objEntries() {
  for (let item of Object.keys(this)) {
    yield [item, this[item]]
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objEntries

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`)
}

// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口