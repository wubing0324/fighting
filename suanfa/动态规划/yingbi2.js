//  1 5 11

//  f(27) = min{f(27 - 1) + 1, f(27 - 5) + 1, f(27 - 11) + 1}

function getCount(types, sum) {
  let arr = new Array(sum + 1);
  let len = arr.length
  // Infinity
  arr[0] = 0
  for (let i = 1; i < len; i++) {
    arr[i] = Infinity
    for (let j = 0; j < types.length; j++) {
      if (i >= types[j]) {
        arr[i] = Math.min(arr[i - types[j]] + 1, arr[i])
      }
    }
    console.log(i, arr[i])
  }
}
getCount([1,5,11], 15)

