function deepCopy(obj, cache = []){
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  var copy = Array.isArray(obj) ? [] : {}
  var hit = cache.filter(o => o.origin === obj)
  if (hit[0]) {
    return hit[0].copy
  }
  cache.push({
    origin: obj,
    copy: []
  })

  Object.keys(obj).forEach((k) => {
    copy[k] = deepCopy(obj[k], cache)
  })
  return copy
}
var obj1 = {
  a: 1,
  b: obj4
}
var obj2 = {
  c: 1,
  b: obj1,
  a: obj3
}
var obj3 = {
  c: 33,
  b: obj1
}
var obj4 = 888

obj1.b = obj4
obj2.b = obj1
obj2.a = obj3
var o = deepCopy(obj2, cache = [])
console.log(o)