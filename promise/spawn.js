function spawn(fn) {
  function continuer (verb, arg) {
    let result
    try {
      result = gen[verb](arg)
    } catch(e) {
      return Promise.reject(e)
    }
    if (result.done) {
      return result.value
    } else {
      return Promise.resolve(result.value).then(onFulfilled, onRejected)
    }
  }

  let gen = fn()

  onFulfilled = continuer.bind(continuer, 'next')
  onRejected = continuer.bind(continuer, 'throw')

  return onFulfilled()
}