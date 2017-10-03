var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
    console.log('err', e)
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw('err') // b
g.next() // c