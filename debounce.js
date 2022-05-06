function debounce(fn, wait) {
  let timer = null
  return function () {
    let self = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => [
      fn.apply(self, args)
    ], wait)
  }
}


function debounce(fn, delay = 500) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn(...args))
      }, delay)
    })
  }
}