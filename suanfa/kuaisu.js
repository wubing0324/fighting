function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var left = []
  var right = []
  var middle = []
  var mid = arr.length / 2
  var pivot = arr.splice(mid, 1)[0]
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else if (arr[i] > pivot){
      right.push(arr[i])
    } else {
      middle.push(arr[i])
    }
  }
  middle.push(pivot)
  return quickSort(left).concat(middle, quickSort(right))
}

var arr = [9,1,6,5,8,3,7,4,6,2]
var a = quickSort(arr)
console.log(a)
