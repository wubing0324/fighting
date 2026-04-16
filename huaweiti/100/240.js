var searchMatrix = function (matrix, target) {
  let rows = matrix.length

  for (let i = 0; i < rows; i++) {
    let idx = binarySearch(matrix[i], target)
    if (idx >= 0) {
      return true
    }
  }
  return false
}
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    let mid = (left + right) >> 1
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -left - 1
}

// matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// searchMatrix(matrix, target)
let arr = [1, 2, 3, 4, 5, 7]
let idx = binarySearch(arr, 1)
console.log(idx, -idx - 1)