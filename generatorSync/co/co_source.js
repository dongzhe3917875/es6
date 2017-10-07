let slice = Array.prototype.slice;
module.exports = co['default'] = co.co = co;
co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};
function co(gen) {
  let ctx = this
  let args = slice.call(arguments, 1);
  return new Promise(function(resolve, reject) {
    // 是不是函数
    if (typeof gen === 'function') gen = gen.apply(ctx, args)
    // 是不是generator函数
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()

    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
      return null
    }

    function onRejected(err) {
      let ret
      try {
        ret = gen.throw(err)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value)
      // 将ret的value改成promise
      let value = toPromise.call(ctx, ret.value)
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }

  })
}
// Convert a `yield`ed value into a promise.

function toPromise(obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj
  if (isGenerator(obj) || isGeneratorFunction(obj)) return co.call(this, obj)
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

function thunkToPromise (fn) {
  let ctx = this
  return new Promise(function(resolve, reject) {
    // thunk执行回调函数 返回一个带有res的Promise的结果 默认应该是(err,res)的形式
    fn.call(ctx, function(err, res) {
      if (err) return reject(err)
      if (arguments.length > 2) res = slice.call(arguments, 1)
      resolve(res)
    })
  })
}

// 把array中的每一个值都转换为promise
function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

// 支持对象
function objectToPromise(obj) {
  let results = new obj.constructor()
  let keys = Object.keys(obj)
  let promises = []
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let promise = toPromise.call(this, obj[key])
    console.log('promise', promise)
    if (promise && isPromise(promise)) defer(promise, key)
    else results[key] = obj[key]
  }

  return Promise.all(promises).then(function() {return results})

  function defer(promise, key) {
    results[key] = undefined
    promises.push(promise.then(function(res) {
      results[key] = res
    }))
  }
}

// 判断是否为Promise
function isPromise(obj) {
  return 'function' == typeof obj.then;
}

// 判断是否为Generator
function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}


function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  // 通过constructor来判断
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  // 通过prototype来做
  return isGenerator(constructor.prototype);
}

function isObject(val) {
  return Object == val.constructor;
}