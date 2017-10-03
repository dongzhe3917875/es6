var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield 'Tick';
    console.log('Tock!');
    yield 'Tock';
  }
};

var g = clock()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())