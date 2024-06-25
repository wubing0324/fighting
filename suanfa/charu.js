var arr = [6,5,4,3,2,1,0]
// for (var i = 2; i < arr.length; i++) {
//   if (arr[i] < arr[i - 1]) {
//     arr[0] = arr[i]
//     for (var j = i - 1; arr[j] > arr[0]; j--) {
//       arr[j+1] = arr[j]
//     }
//     arr[j + 1] = arr[0]
//   }
// }
// console.log(arr)

// for (var i = 1; i < arr.length; i++) {
//   var tmp
//   if (arr[i] < arr[i - 1]) {
//     tmp = arr[i]
//     for (var j = i - 1; arr[j] > tmp; j--) {
//       arr[j+1] = arr[j]
//     }
//     arr[j + 1] = tmp
//   }
// }












for (var i = 1;  i < arr.length; i++) {
  if (arr[i] < arr[i - 1]) {
    let tmp = arr[i]
    for (var j = i - 1; arr[j] > tmp; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = tmp
  }
}
console.log(arr)








