// apply 函数实现
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    // apply 第二个参数为数组
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};

var a = 1,
  b = 1;

let scope = {
  a: 2,
  b: 2,
};

function add(vala, valb) {
  console.log(vala + valb, this.a + this.b);
}

add('a', 'b');

add.myApply(scope, ['a', 'b']);
