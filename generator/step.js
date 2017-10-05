let step1 = (...args) => args.reduce((ele1, ele2) => ele1 + ele2, 0)
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4

let steps = [step1, step2, step3, step4]

function* iterateSteps(steps, ...args) {
  let n
  for (let i = 0; i < steps.length; i++) {
    if (n) {
      n = yield steps[i].call(null, n)
    } else {
      n = yield
    }
  }
}

function scheduler(steps, ...args) {
  let g = iterateSteps(steps)
  let val = steps[0].apply(null, args)
  // 这里是第一个值
  console.log(val)
  // 因为无法传参数 所以无所谓执行 就是空耗一个yield
  g.next()
  // while(val) {
  //   val = g.next(val).value
  //   // 在这里可以拿到想要的值
  //   console.log(val)
  // }
  let finalVal = steps.slice(1).reduce((val, val1) => g.next(val).value, val)
  console.log(finalVal)
  // for (let i = 0; i < stepNew.length; i++) {
  //   val = g.next(val).value
  //   // 在这里可以拿到想要的值
  //   console.log(val)
  // }
}

scheduler(steps, 1, 2, 3)
