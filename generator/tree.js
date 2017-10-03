function Tree(left, label, right) {
  this.left = left
  this.label = label
  this.right = right
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历

function* inorder(t) {
  if (t) {
    yield* inorder(t.left)
    yield t.label
    yield* inorder(t.right)
  }
}

function make(array) {
  if (array.length === 1) return new Tree(null, array[0], null)
  return new Tree(make(array[0]), array[1], make(array[2]))
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])

for (let item of inorder(tree)) {
  console.log(item)
}
