// 场景：无限滚动，高频点赞事件
// 时间戳
export function throttle(fn, wait) {
  let cur = Date.now();
  return function (...args) {
    let now = Date.now();
    if (now - cur >= wait) {
      cur = Date.now();
      return fn(...args);
    }
  };
}

// 定时器
export function __throttle(fn, wait) {
  let timer = null;
  return function (...args) {
    !timer &&
      (timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, wait));
  };
}

function _throttle(fn, delay = 100) {
  let timer = null;
  return (...args) => {
    if (timer) {
      return;
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn(...args));
        timer = null;
      }, delay);
    });
  };
}

// 第三种限制函数执行频率的方法
// requestAnimationFrame
// 有更高的保真度，因为是浏览器原生 API
// 一般在动画或者绘制时使用，在重新绘制计算元素位置的情况下使用
// 与节流类似，16ms
// 函数重新计算并在屏幕上渲染元素，并且希望保证平滑的更改或动画时

// 涉及到 ajax 请求/移出添加类时一般使用节流或防抖

// lodash 中 throttle 为 debounce 的变式，将 leading 和 trailing 设置为 true
// 前沿执行后，会将参数置为 undefined 就无法执行后沿，除非在前沿执行完成后，但本次周期尚未完成时再次触发事件，给参数赋值，就能执行后沿。
// 中间无论触发多少次，都只有前沿和后沿执行
