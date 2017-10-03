function* fibonacci() {
  let [prev, curr] = [0, 1]
  for(;;) {
    [prev, curr] = [curr, prev + curr]
    yield curr
  }
}
let arr = []
for (let n of fibonacci()) {
  if (n > 1000) break;
  arr.push(n)
}

console.log(arr)