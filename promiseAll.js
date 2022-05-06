function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError('argument must be a array')
    }
    let resolveNum = 0
    let len = promises.length
    let res = []
    for (let index = 0; index < len; index++) {
      Promise.resolve(promises[index]).then(value => {
        res[index] = value
        if (++resolveNum === len) {
          return resolve(res)
        }
      }).catch(e => reject(e))
    }
  })
}
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})
