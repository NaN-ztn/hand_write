// 拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。

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
function deepCopy(object) {
  if (!object || typeof object !== "object") return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }

  return newObject;
}
