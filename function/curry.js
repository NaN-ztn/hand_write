export function _curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;

  args = args || [];

  return function () {
    let subArgs = [].slice.call(arguments);

    // 拼接得到现有的所有参数
    subArgs = args.concat(subArgs);

    // 判断参数的长度是否已经满足函数所需参数的长度j
    // 函数的 length 返回除 ...rest 参数外所期望的参数个数
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn(subArgs);
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      // 参数不满足期望个数
      return curry(fn, subArgs);
    }
  };
}

// es6 实现
// function curry(fn, ...args) {
//   return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
// }

export function curry(fn, args = []) {
  return function (...subArgs) {
    let Args = [...args, ...subArgs];
    return Args.length >= fn.length ? fn(...Args) : curry(fn, Args);
  };
}
