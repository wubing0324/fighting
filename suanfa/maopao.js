var arr = [9,1,5,8,3,7,4,6,2]
var flag = true
for (var i = 0; i < arr.length && flag; i++) {
  flag = false
  for(var j = arr.length - 1; j >= i; j--) {
    if (arr[j] > arr[j + 1]) {
      var tmp
      tmp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = tmp
      flag = true
    }
  }
}
console.log(arr)