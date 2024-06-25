function mergeArray(arr, start, end, temp) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2)
    mergeArray(arr, start, mid, temp)
    mergeArray(arr, mid + 1, end, temp)
    arr = sortArray(arr, start, mid, end, temp)
  }
  return arr
}

function sortArray(arr, start, mid, end, temp) {
  var s = start
  var e = end
  var mn = mid + 1
  t = 0
  while(s <= mid && mn <= e) {
    if (arr[s] < arr[mn]) {
      temp[t++] = arr[s++]
    } else {
      temp[t++] = arr[mn++]
    }
  }
  while (s <= mid) {
    temp[t++] = arr[s++]
  }
  while (mn <= e) {
    temp[t++] = arr[mn++]
  }
  console.log(t)
  for (let k = 0; k < t; k++) {
    arr[start + k] = temp[k]
  }
  return arr
}

arr = [5, 2, 3, 8, 12, 10 , 9]

mergeArray(arr, 0, arr.length - 1, [])

console.log(arr)