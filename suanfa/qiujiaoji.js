// function intersection(arr, arr1){
//   var map = {}
//   var arr2 = []
//   arr.forEach((val, index) => {
//     if(!map[val]) {
//       map[val] = 1
//     } else {
//       map[val] = map[val] + 1
//     }
//   })
//   arr1.forEach((val, index) => {
//     if (map[val] && map[val] > 0) {
//       map[val] = map[val] - 1
//       arr2.push(val)
//     }
//   })
//   return arr2
// }
var arr = [1, 1, 1]
var arr1 = [1, 1]
// console.log(intersection(arr, arr1))
var arr3 = []
function union(arr1,arr2) {
  arr1.forEach(val => {
    if (arr2.includes(val)) {
      arr3.push(val)
      var ind = arr2.indexOf(val)
      arr2.splice(ind, 1)
    }
  })
  return arr3
}
console.log(union(arr,arr1))
