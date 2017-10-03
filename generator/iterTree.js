// yield*命令可以很方便地取出嵌套数组的所有成员
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i])
    }
  } else {
    yield* tree
  }
}

const tree = [ 'a', ['b', 'c', ['v', 'n']], ['d', 'e'] ];
for (let val of iterTree(tree)) {
  console.log(val)
}