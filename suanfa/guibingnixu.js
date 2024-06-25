/**
 * @param {number[]} nums
 * @return {number}
 */
 var reversePairs = function(nums) {
  let nixu = 0
  let temp = new Array();
  nixu = mergeSort(nums, 0, nums.length, temp, nixu)
  return nixu
};
function mergeSort(arr, start, end, temp, nixu) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2)
    nixu = mergeSort(arr, start, mid, temp, nixu)
    nixu = mergeSort(arr, mid + 1, end, temp, nixu)
    nixu = mergeArray(arr, start, mid, end, temp, nixu)
  }
  return nixu
}

function mergeArray(arr, start, mid, end, temp, nixu) {
  let st = start
  let m = mid + 1
  let i = 0
  while(st <= mid && m <= end) {
    if (arr[st] > arr[m]) {
      nixu = nixu + mid - st + 1
      temp[i++] = arr[m++]
    } else {
      temp[i++] = arr[st++]
    }
  }
  while(st <= mid) {
    temp[i++] = arr[st++]
  }
  while(m <= end) {
    temp[i++] = arr[m++]
  }
  for (let k = 0; k < i; k++) {
    arr[start + k] = temp[k]
  }
  return nixu
}

arr = [5, 2, 3, 8, 12, 10 , 9]
console.log(reversePairs(arr))
console.log(arr)