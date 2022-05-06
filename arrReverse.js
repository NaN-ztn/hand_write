String.prototype._reverse = function (a) {
  return a.split("").reverse().join("");
}
var obj = new String();
var res = obj._reverse('hello');
console.log(res);    // olleh