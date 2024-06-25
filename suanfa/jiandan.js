var arr = [9,1,5,8,3,7,4,6,2]
var min
for (var i = 0; i < arr.length; i++) {
  min = i
  for (var j = i + 1; j <= arr.length; j++) {
    if (arr[min] > arr[j]) {
      min = j
    }
  }
  if (i != min) {
    var tmp
    tmp = arr[i]
    arr[i] = arr[min]
    arr[min] = tmp
  }
}
console.log(arr)