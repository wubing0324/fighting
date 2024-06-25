// var arr = [{
//   o: 1,
//   b:2
// },
// {
//   o: 2,
//   b:3
// },
// {
//   o: 3,
//   b:4
// }]

// var arr1 = arr.filter(function(a, index){
//   console.log('index = ' + index)
//   return a.o === 1
// })
// console.log(arr1)
const find = (cache, fn) => cache.filter(fn)[0]
function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }
debugger
  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
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


