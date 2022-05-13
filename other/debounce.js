// 限定时间范围内连续触发相同事件，函数不会执行，直到时间间隔大于限制才执行
// 场景：搜索框防抖，浏览器滚动，鼠标移动事件 resize事件等
// 在不触发事件后一段时间内执行（后沿）
// 与节流最大区别在于节流时每隔一定时间至少执行一次
export function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}

function _debounce(fn, delay = 500) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        timer = null;
        resolve(fn(...args));
      }, delay);
    });
  };
}

// _.debounce();
// lodash 中每次调用 的 debounced 函数修改 lastCallTime 变量，
// 在定时器到期时进行判断，若不执行，则重置定时器，用重新计算的还需等待时间作为定时器延时时间
// 每次调用 的 deounced 函数时，都会先走 leadingEdge 分支，以判断是否时前沿调用
// maxing 用于距离函数上次调用的最大时间。即指
