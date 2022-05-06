let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let sum = arr.reduce((total, i) => total += i);
console.log(sum);

// 非扁平数组
let arr1 = [1, 2, 3, [[4, 5], 6], 7, 8, 9]
let arr1Sum = arr1.toString().split(',').reduce((total, i) => total += Number(i),0);
console.log(arr1Sum);