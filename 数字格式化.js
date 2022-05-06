let format = n => {
  let num = n.toString();
  let decimals = num.indexOf('.') ? num.split('.')[1] : ''
  let len = num.length
  if (len < 3) return num
  else {
    let t = decimals ? temp = '.' + decimals : temp
    let remain = len % 3
    if (remain > 0) { // 不是3的整数倍
      return num.slice(0, remain) + ',' + num.slice(remain, len).match(/\d{3}/g).join(',') + temp
    } else { // 是3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp
    }
  }
}

console.log(format(1232932323.33))