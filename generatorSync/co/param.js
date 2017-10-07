function* gen(x, y) {
  let z = x + y
  yield z * 3
}
let g = gen(2,3)
console.log(g.next())