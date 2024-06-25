var arr = [8,20,1,3,9,5,12,6,2,11,10,4,7,0,30]

function mergeArray(array, first, mid, last, temp) {
  var st = first
  var ed = mid + 1
  var i = 0
  while(st <= mid && ed <= last) {
    if (array[st] < array[ed]) {
      temp[i++] = array[st++]
    } else {
      temp[i++] = array[ed++]
    }
  }
  while(st <= mid) {
    temp[i++] = array[st++]
  }
  while(ed <= last) {
    temp[i++] = array[ed++]
  }
  for (var l = 0; l < i; l++) {
    array[first + l] = temp[l]
  }
  return array
}

function splitArray(array, first, last, temp) {
  if (first < last) {
    var mid = Math.floor((last + first) / 2)
    splitArray(array, first, mid, temp)
    splitArray(array, mid + 1, last, temp)
    console.log(first, mid, last)
    array = mergeArray(array, first, mid, last, temp)
  }
  return array
}
splitArray(arr, 0, arr.length - 1, [])
console.log(arr)