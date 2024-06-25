

function findIdxs(S, T) {
  if (S.length < T.length) return []
  var reg = new RegExp(T, 'g')
  var arr = []
  do {
    var str = reg.exec(S)
    if (str && str.index > 0) {
      arr.push(str.index)
    }
  } while (str && str.index > 0);

  return arr
}
var S = 'hkjhkabclkkabcjk'
var T = 'abc'
console.log(findIdxs(S, T))