function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
}
// thunkify只允许回调函数执行一次
let fs = require('fs')
var readFileThunk = thunkify(fs.readFile);
let run = fn => {
  var g = fn()
  var obj = {
    text1: function(err, data) {
      console.log('text1', data)
      next(data)
    },
    text2: function(err, data) {
      console.log('text2', data)
      next(data)
    }
  }
  let next = (data) => {
    let result = g.next(data)
    if (result.done) return;
    result.value.func(obj[result.value.callback])
  }
  next()
}
var g = function* (){
  var f1 = yield {func: readFileThunk('./text.txt', 'utf-8'), callback: 'text1'}
  console.log('f1', f1)
  var f2 = yield {func: readFileThunk('./text.txt', 'utf-8'), callback: 'text2'}
};

run(g);