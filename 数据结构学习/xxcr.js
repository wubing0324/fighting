function insert(arr, index, val){
  var len = arr.length
  if (index >= len) {
    arr[index] = val
    console.log(arr)
    return
  }
  for (let i = arr.length - 1; i >= index; i--) {
    arr[i + 1] = arr[i]
  }
  arr[index] = val
  console.log(arr)
}

var arr = [0,1,2]
insert(arr, 4, 8)