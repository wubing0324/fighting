var value = '我的名字是${name},我的年龄是${age}'
var reg = /\$\{([^}]*)}/g

var obj = {name: '小美女', age: '20'}
function translate(key) {
  return obj[key]
}
function replaceVal(str) {
  return str.replace(reg, function(match, p1,offset, string) {
    reg1 = new RegExp('\\$\\{' + p1 + '\\}')
    return match.replace(reg1, translate(p1))
  })
}
console.log(replaceVal(value))