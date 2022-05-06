

function instanceOf(L, R) {
  let rproto = R.prototype
  let lproto = L.__proto__
  while (lproto) {
    if (lproto === rproto) return true
    lproto = lproto.__proto__
  }
  return false
}

function People() { }
let p1 = new People()
console.log(instanceOf(p1, People))