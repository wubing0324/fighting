
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1

  while (left < right) {
    let mid = (left + right) >> 1

    if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -left - 1
}

var arr = [1, 2, 3, 4, 6, 7, 8, 9]

let indx = binarySearch(arr, 5)
if (indx < 0) {
  console.log(-indx - 1)
} else {
  console.log(indx)
}