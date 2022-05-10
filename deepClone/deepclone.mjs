// 拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。
// 具体：
// 1.取不到值为 undefined 的 key
// 2.NaN 和 无穷大，无穷小转变为 null

let _deepClone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
let a = {
  name: 'Ken',
  age: 18,
  hobbit: ['dance', 'sing', { type: 'sports', value: 'run' }],
  schoolData: {
    grades: 'A',
  },
  run: function () {},
  walk: undefined,
  fly: NaN,
  cy: null,
};

let b = _deepClone(a);
console.log('b', b);

/**
{
  age: 18,
  cy: null,
  fly: null,
  hobbit: (3) ["dance", "sing", {…}],
  name: "Ken",
  schoolData: {grades: "A"},
}
 **/

// 3.取不到原型的内容
function Ken() {
  this.name = 'Ken';
}

Ken.prototype.walk = function () {
  console.log('walk');
};

let KenNaNa = function () {
  Ken.call(this, arguments);
  this.name = 'KenNaNa';
};

// 寄生式组合继承
KenNaNa.prototype = Object.create(Ken.prototype, {
  constructor: {
    value: KenNaNa,
    enumerable: false,
  },
});
KenNaNa.prototype.age = '18';
KenNaNa.prototype.run = function () {
  console.log('run');
};

let kenNaNa = new KenNaNa();
let copyKenNaNa = JSON.parse(JSON.stringify(kenNaNa));

/**
 Ken {age: "18", run: ƒ, contructor: ƒ}
 * */
console.log(copyKenNaNa.constructor); // ƒ Object() { [native code]}
console.log(copyKenNaNa.age); // undefined
console.log(copyKenNaNa.run()); // is not function
console.log(copyKenNaNa.walk()); // is not function
console.log(copyKenNaNa.toString()); // "[object Object]"

// 4.date 对象转变为 date 字符串
var date = new Date();
var copy = JSON.parse(JSON.stringify(date));

console.log('copy', copy); // "2021-01-14T06:47:12.337Z"

// let obj1 = {
//   a: 0,
//   b: {
//     c: 0
//   }
// };
// let obj2 = JSON.parse(JSON.stringify(obj1));
// obj1.a = 1;
// obj1.b.c = 1;
// console.log(obj1); // {a: 1, b: {c: 1}}
// console.log(obj2); // {a: 0, b: {c: 0}}

// var _ = require('lodash');
// var obj1 = {
//   a: 1,
//   b: { f: { g: 1 } },
//   c: [1, 2, 3]
// };
// var obj2 = _.cloneDeep(obj1);
// console.log(obj1.b.f === obj2.b.f);// false

// 深拷贝的实现
export function deepClone(object) {
  // 容错处理
  if (!object || typeof object !== 'object') return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    // for...in 会在对象原型链中查找继承的对象，这里实现的深拷贝只需要对象本身的属性，所以使用object.hasOwnProperty
    if (object.hasOwnProperty(key)) {
      // 若是引用类型则进行递归处理
      // 基础类型则直接赋值
      newObject[key] = typeof object[key] === 'object' ? _deepClone(object[key]) : object[key];
    }
  }

  return newObject;
}
