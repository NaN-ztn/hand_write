export function VeryfyCode(params = {}) {
  let o = Object.assign({
    lineWidth: 0.5,
    lineNum: 2,
    dotNum: 2,
    dotR: 1,
    foregroundColor: [10, 80],
    backgroundColor: [150, 250],
    fontSize: 20,
    fontFamily: 'Georgia',
    fontStyle: 'fill',
    content: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
    len: 4
  }, params);
  Object.keys(o).forEach(key => {
    this[key] = o[key];
  })
  this.canvas = null
  this.paint = null
}

// 在原型上添加绘制方法
VeryfyCode.prototype.draw = function (dom, cb = function () { }) {
  // 获取 canvas dom
  if (!this.paint) {
    // 没有 2D对象，进行初始化
    this.canvas = dom;
    if (!this.canvas) {
      return
    }

    this.paint = this.canvas.getContext('2d');
    if (!this.paint) {
      return
    }

    this.callback = cb;
    // 绑定点击事件
    this.canvas.onclick = () => {
      this.drawAgain()
    }
  }

  // 随机画布颜色,使用背景色
  const colors = this.getColors(this.backgroundColor);
  this.paint.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`
  // 绘制画布
  this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height)
  // 绘图
  this.arc()
  this.line()
  this.font()
}

// 随机颜色
// arr 为生成随机数的范围，即为颜色的强度值
VeryfyCode.prototype.getColors = function (arr) {
  // 对应 rgb
  let colors = new Array(3).fill('');
  colors = colors.map(v => this.getRandom(...arr))
  return colors
}

// 生成随机数
VeryfyCode.prototype.getRandom = function (...arr) {
  arr.sort((a, b) => a - b)
  return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0])
}

// 绘制线条
VeryfyCode.prototype.line = function () {
  for (let i = 0; i < this.lineNum; i++) {
    // 随机获取线条起止点
    const x = this.getRandom(0, this.canvas.width), endx = this.getRandom(0, this.canvas.width)
    const y = this.getRandom(0, this.canvas.height), endy = this.getRandom(0, this.canvas.height)
    // 开始绘制
    this.paint.beginPath();
    // 线宽
    this.paint.lineWidth = this.lineWidth
    // 随机获取线条颜色
    const colors = this.getColors(this.foregroundColor)
    this.paint.strokeStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`
    // 绘制
    this.paint.moveTo(x, y)
    this.paint.lineTo(endx, endy)
    this.paint.closePath()
    this.paint.stroke()
  }
}

// 绘制圆点
VeryfyCode.prototype.arc = function () {
  for (let i = 0; i < this.dotNum; i++) {
    // 随机获取圆心
    const x = this.getRandom(0, this.canvas.width)
    const y = this.getRandom(0, this.canvas.height)
    // 开始绘制
    this.paint.beginPath();
    // 圆弧
    this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false)
    // 闭合路径
    this.paint.closePath()
    // 随机获取填充颜色
    const colors = this.getColors(this.foregroundColor)
    this.paint.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`
    // 绘制
    this.paint.fill()
  }
}

// 获取验证码内容
VeryfyCode.prototype.getText = function () {
  // 验证码可能内容
  const len = this.content.length
  let str = ''
  // this.len 为验证码长度
  for (let i = 0; i < this.len; i++) {
    str += this.content[this.getRandom(0, len)]
  }
  return str
}

// 绘制文字
// 1.通过回调函数将当前绘制的文字输出
// 2.需要指定文字的旋转角度、字体、颜色、绘制风格（是否填充）
// 3.需要确定文字的实际宽度，来确定单个文字实际活动范围
VeryfyCode.prototype.font = function () {
  // 获取验证码内容
  const str = this.getText()
  // 通过回调进行输出用于进行比对
  this.callback(str)
  // 指定文字风格
  this.paint.font = `${this.fontSize}px ${this.fontFamily}`
  // 文字基线
  this.paint.textBaseline = 'middle'
  // 指定文字绘制风格
  // this.fontStyle: stroke | fill
  const fontStyle = `${this.fontStyle}Text`
  const colorStyle = `${this.fontStyle}Style`
  // 循环绘制每个字
  for (let i = 0; i < this.len; i++) {
    // 获取文字绘制的实际宽度
    const realw = this.paint.measureText((str[i])).width
    // 获取每个字的允许范围，用来确定绘制单个文字的横坐标
    const x = this.getRandom((this.canvas.width / this.len) * i, (this.canvas.width / this.len) * i + realw / 2)
    // 获取旋转角度
    const deg = this.getRandom(-6, 6)
    // 随机文字颜色
    const colors = this.getColors(this.foregroundColor)
    this.paint[colorStyle] = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`
    // 开始绘制
    // 保存状态
    this.paint.save()
    this.paint.rotate(deg * Math.PI / 180)
    this.paint[fontStyle](str[i], x, this.canvas.height / 2)
    // 还原上次状态
    this.paint.restore()
  }
}

// 清空画布
VeryfyCode.prototype.clear = function () {
  this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

// 更新画布
VeryfyCode.prototype.drawAgain = function () {
  this.clear()
  this.draw(this.callback)
}