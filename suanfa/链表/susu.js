function trialDivision(number) {
  if (Object.prototype.toString.call(number) != '[object Number]') {
    console.warn('请输入正整数')
    return false
  }

  // 是小数，直接返回
  if (number % 1 !== 0) {
    return false
  }
  if (number <= 1) {
    return false
  }
  if (number <= 3) {
    return true
  }
  if (number % 2 == 0) {
    return false
  }
  let sqrtNum = Math.sqrt(number)
  for (let divide = 3; divide < sqrtNum; divide += 2) {
    if (number % divide == 0) {
      return false
    }
  }
  return true
}

console.log(trialDivision(160))