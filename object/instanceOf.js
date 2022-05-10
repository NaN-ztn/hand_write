// 左为实例，右为构造函数
export function instanceOf(L, R) {
  let rproto = R.prototype;
  let lproto = L.__proto__;
  while (lproto) {
    if (lproto === rproto) return true;
    lproto = lproto.__proto__;
  }
  return false;
}


