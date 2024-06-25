function deepCopy(obj) {
  let obj1;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
      obj1 = [];
  } else {
      obj1 = {};
  }
  for (var i in obj) {
      if (obj[i] && obj[i] instanceof Object) {
          obj1[i] = deepCopy(obj[i]);
      } else {
          obj1[i] = obj[i];
      }
  }
  return obj1;
}