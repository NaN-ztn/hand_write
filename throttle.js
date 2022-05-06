function throttle(fn, wait) {
  let cur = Date.now()
  return function () {
    let self = this
    let args = arguments
    let now = Date.now()
    if (now - cur >= 0) {
      cur = Date.now()
      return fn.apply(self, args);
    }
  }
}

function throttle(fn, delay = 100) {
  let timer = null
  return (...args) => {
    if (timer) {
      return
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn(...args))
        timer = null
      }, delay)
    })
  }
}