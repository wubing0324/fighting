
function move(arr, k){
  for (var i = 0;i < k; i++) {
    var t = arr.pop()
    arr.unshift(t)
  }
  return arr
}

move([1,2,3,4,5], 1)