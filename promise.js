const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {

  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  state = PENDING
  // fullfilledCallBack = null
  // rejectedCallBack = null
  fullfilledCallBack = []
  rejectedCallBack = []

  value = null
  reason = null

  resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      // this.fullfilledCallBack && this.fullfilledCallBack(value)
      while (this.fullfilledCallBack.length) this.fullfilledCallBack.shift()()
    }
  }

  reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      // this.rejectedCallBack && this.rejectedCallBack(reason)
      while (this.rejectedCallBack.length) this.rejectedCallBack.shift()()
    }
  }


  static resolve = (value) => {
    if (value instanceof MyPromise) {
      return value;
    }
    // 常规resolve处理
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }
  // 静态reject方法
  static reject = (reason) => {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  then = (onFulfilled, onRejected) => {
    const p = new MyPromise((resolve, reject) => {

      const resolveMicroTask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(x, p, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      const rejectMicroTask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(x, p, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === FULFILLED) {
        resolveMicroTask()
      } else if (this.state === REJECTED) {
        rejectMicroTask()
      } else if (this.state === PENDING) {
        this.fullfilledCallBack.push(resolveMicroTask)
        this.rejectedCallBack.push(rejectMicroTask)
      }
    })
    return p
  }

  resolvePromise(x, self, resolve, reject) {
    if (x === self) {
      return reject(new TypeError("The promise and the return value are the same"));
    }
    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else {
      resolve(x);
    }
  }

}

// new MyPromise((resolve, reject) => {
//   console.log('in promise', new Date().getTime());
//   setTimeout(() => {
//     resolve('3s 之后执行结果');
//   }, 3000)
// }).then(res => console.log(res, new Date().getTime()));

// const promise = new MyPromise((resolve, reject) => {
//   console.log("in promise", new Date().getTime());
//   setTimeout(() => {
//     resolve(2);
//   }, 3000);
// })
// promise.then(res => {
//   console.log('first', res);
// })
// promise.then(res => {
//   console.log('second', res);
// });
// promise.then(res => {
//   console.log('third', res);
// });

const promise = new MyPromise((resolve, reject) => {
  console.log("in promise", new Date().getTime());
  setTimeout(() => {
    resolve(2);
  }, 3000);
})
promise.then(x => {
  return new MyPromise((resolve, reject) => { reject(x * 2); })
}).then(console.log, console.log);

// all实现
// let p1 = Promise.resolve()
// let p2 = Promise.resolve()
// let p3 = Promise.reject('no')

// const x =
//   p1.then(() => p1, (e) => Promise.reject(e))
// setTimeout(console.log, 0, x)


// const promise = new MyPromise((resolve, reject) => {
//   // 目前这里只处理同步的问题
//   setTimeout(() => {
//     resolve(2);
//   }, 1000);
// });

// promise
//   .then(value => {
//     console.log(1);
//     console.log("resolve", value);
//     return value * 2;
//   })
//   .then(value => {
//     console.log(2);
//     console.log("resolve", value);
//     return ++value;
//   })
//   .then(value => {
//     console.log(3);
//     console.log("resolve", value);
//     // return value;
//   });


// let p1 = Promise.reject('no')
// let p2 = Promise.reject('p2')
// let p3 = Promise.resolve('yes')
// async function f() {
//   try {
//     let x1 = await p1
//     let x2 = await p2
//     let x3 = await p3
//   } catch (e) {
//     console.log(e);
//   }
// }
// f()