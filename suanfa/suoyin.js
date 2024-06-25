var arr = [5,5,9,7,2,8,12,0]
arr1 = []
var arr2 = []
arr.forEach((val) => {
  arr1[val] = 1
})

arr1.forEach((val, index) => {
  if (val) {
    arr2.push(index)
  }
})
console.log(arr2)