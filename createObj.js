function create(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}

let obj = create({ name: '123' })
obj.age = 12
console.log(obj)