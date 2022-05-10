// 拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。
/* 具体：
1.取不到值为 undefined 的 key
2.NaN 和 无穷大，无穷小转变为 null
3.取不到原型的内容
4.date 对象转变为 date 字符串 */

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
      newObject[key] = typeof object[key] === 'object' ? deepClone(object[key]) : object[key];
    }
  }

  return newObject;
}
