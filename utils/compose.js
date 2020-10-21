export function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 通过数组的reduce方法，将两个方法合成一个方法，然后用这个合成的方法再去和下一个方法合成，直到结束，这样我们就得到了一个所有方法的合成函数。



function add (a) {
  return function (b) {
    return a + b
  }
}

// 得到合成后的方法
// let add6 = compose(add(1), add(2), add(3))

// add6(10) // 16