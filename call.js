Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    console.error("type error");
  }
  let args = [...arguments].slice(1);
  let res = null
  context = context || window
  context.fn = this;
  // 调用函数
  res = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
}
