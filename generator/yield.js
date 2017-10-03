function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}


let delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

// yield* 后面要加遍历器
let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

for(let value of delegatingIterator) {
  console.log(value);
}

// yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。
// 反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值。

function* concat(iter1, iter2) {
  let c = yield* iter1;
  console.log(c)
  yield* iter2;
}

let iter1 = (function* () {
  yield 1
  yield 2
  return 3
})()

let iter2 = (function* () {
  yield 4
  yield 5
})()

let gg = concat(iter1, iter2)
for (var value of gg) {
  console.log(value)
}