function isDef (v) {
  return v !== undefined && v !== null
}
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (typeof value === 'string') {
    return value
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  // if (typeof value === 'number') {
  //   return value
  // }
  
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}
function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}
var str = stringifyClass([1,2,3,'4','5',[{'a': 1}, 'b']])
console.log(str)