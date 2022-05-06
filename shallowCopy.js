let target = { a: 1 };
let object2 = { b: 2 };
let object3 = { c: 3 };
Object.assign(target, object2, object3);
console.log(target);  // {a: 1, b: 2, c: 3}


let obj1 = { a: 1, b: { c: 1 } }
let obj2 = { ...obj1 };
obj1.a = 2;
console.log(obj1); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj1.b.c = 2;
console.log(obj1); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}

let arr0 = [1, 2, 3, 4];
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.slice() === arr); //false

let arr1 = [1, 2, 3, 4];
console.log(arr.concat()); // [1,2,3,4]
console.log(arr.concat() === arr); //false

// 浅拷贝的实现;

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}
