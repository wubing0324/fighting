function rever(val){
  num = val / 10
  num1 = val % 10
  if (num < 1) {
    return val
  } else {
    var n = Math.floor(num)
    return `${num1}${rever(n)}`
  }
}
var a = rever(12345)
console.log(a)