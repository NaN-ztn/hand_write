// function flat(arr) {
//   let res = []
//   for (const item of arr) {
//     if (Array.isArray(item)) {
//       let f = flat(item)
//       res = res.concat(f)
//     } else {
//       res.push(item)
//     }
//   }
//   return res
// }

// function flat(arr) {
//   return arr.reduce(function (prev, next) {
//     return prev.concat(Array.isArray(next) ? flat(next) : next)
//   }, [])
// }

// function flat(arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// function flat(arr) {
//   return arr.toString().split(',');
// }

// function flat(arr) {
//   return arr.flat(Infinity);
// }

function flat(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str);
}


let arr = [1, [2, [3, 4, 5]]]
console.log(flat(arr))