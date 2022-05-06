function dateFormat(date,format) {
  const day = date.getDate();
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  format=format.replace(/yyyy/,year)
  format=format.replace(/MM/,month)
  format = format.replace(/dd/, day)
  console.log(format)
  return format
}
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日
