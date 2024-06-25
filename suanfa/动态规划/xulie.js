var arr = [1,5,3,4,6,9,10,7,8]

function getMax(arr){
  let f = []
  for (let i = 0; i < arr.length - 1; i++) {
    f[i] = 1
  }
  for (let x = 0; x < arr.length - 1; x++) {
    for (let p = x; p > 0; p--) {
      if (arr[p] > arr[p - 1]) {
        f[x] = Math.max(f[p] + 1, f[x])
      } else {
        break
      }
    }
  }
  let result = {len: 0, index: 0}
  for (let j = 0; j < arr.length - 1; j++) {
    // console.log(j, f[j])
    if (f[j] > result.len) {
      result.index = j
    }
    result.len = Math.max(f[j], result.len)
  }
  console.log(result)
  return arr.slice(result.index - result.len + 1, result.index + 1)
}
console.log(getMax(arr))