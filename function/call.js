Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    console.error('type error');
  }
  let args = [...arguments].slice(1);
  let res = null;
  // context 为 falsy this 指向 window
  context = context || window;
  // 在函数给到 context 对象上，使得能够调用给定作用域下参数
  context.fn = this;
  // 调用函数
  res = context.fn(...args);
  // 得到结果后将函数删除
  delete context.fn;
  return res;
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

add.myCall(scope, 'a', 'b');
