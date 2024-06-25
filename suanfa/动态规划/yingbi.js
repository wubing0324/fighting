//27 2 5 7
//递归
// function getCount(val) {
//   if (val === 0) return 0
//   let res = 9999
//   if (val >= 2) {
//     res = Math.min(getCount(val - 2) + 1, res)
//   }
//   if (val >= 5) {
//     res = Math.min(getCount(val - 5) + 1, res)
//   }
//   if (val >= 7) {
//     res = Math.min(getCount(val - 7) + 1, res)
//   }
//   return res
// }

function getCount(types, sum) {
  let arr = new Array(sum + 1);
  let len = arr.length
  // Infinity
  arr[0] = 0
  for(let i  = 1; i < len; i++) {
    arr[i] = Infinity
    for (let j = 0; j < types.length; j++) {
      if (i >= types[j] && arr[i - types[j]] !== Infinity) {
        arr[i] = Math.min(arr[i - types[j]] + 1,arr[i])
      }
    }
  }
  if (arr[sum] === Infinity) {
    arr[sum] = -1
  }
  return arr[sum]
}
console.log(getCount([2,5,7], 27))