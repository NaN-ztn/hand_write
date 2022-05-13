// 场景：无限滚动，高频点赞事件
function throttle(fn, wait) {
  let cur = Date.now();
  return function () {
    let self = this;
    let args = arguments;
    let now = Date.now();
    if (now - cur >= 0) {
      cur = Date.now();
      return fn.apply(self, args);
    }
  };
}

function throttle(fn, delay = 100) {
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
