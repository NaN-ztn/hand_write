Function.prototype.bind = function () {
  // 将参数转换为数组 ES5 方法
  var args = Array.prototype.slice.call(arguments);
  // context 为参数中第一个变量且修改了 arg 数组，删除首个元素
  // splice 返回被删除元素的数组，因此取 [0]
  var context = args.splice(0, 1)[0];
  var fn = this;
  var noop = function () {};
  var res = function () {
    // 这里的 rest 是 bind 执行完成后返回函数执行时的 arguments
    let rest = Array.prototype.slice.call(arguments);
    // this只和运行的时候有关系，所以这里的 this 和上面的 fn 不是一码事
    // new res() 和 res() 在调用的时候，res中的 this 是不同的东西
    // 若 res 用作构造函数，则 new 出来的对象的 this 无法改变
    // 这里用 concat 的意义在于，bind 函数可以实现柯里化
    return fn.apply(this instanceof noop ? this : context, args.concat(rest));
  };
  // 完善原型链，使 bind 返回的函数 prototype 为一个空对象，该对象的原型为原函数的 prototype
  if (this.prototype) {
    noop.prototype = this.prototype;
  }
  // 可以使用 object.create()
  res.prototype = new noop();
  return res;
};

Function.prototype.bind = function (context, ...args) {
  var fn = this;
  return function (...rest) {
    return fn.apply(context, [...args, ...rest]);
  };
};

// bind 函数实现
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    // 构造函数的处理
    return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments));
  };
};

Function.prototype.simpleBind = function (context, ...args) {
  let fn = this;
  return function res(...rests) {
    return fn.apply(this instanceof fn ? this : context, [...args, ...rests]);
  };
};

function add(a, b, c) {
  return a + b + c;
}

const bindAdd = add.simpleBind(window, 1, 2);
console.log(bindAdd(3));
