// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
function mergeArray(arr, first, mid, last, temp) {
  let i = first; 
  let m = mid;
  let j = mid+1;
  let n = last;
  let k = 0;
  while(i<=m && j<=n) {
    if(arr[i] < arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  while(i<=m) {
    temp[k++] = arr[i++];
  }
  while(j<=n) {
    temp[k++] = arr[j++];
  }
  // 以上三个while循环，比较两个数组中元素大小，然后依次插入到temp，这里可以这样做，是因为数组都是有序的
  for(let l=0; l<k; l++) {
    arr[first+l] = temp[l];
  }
  return arr;
}
// 递归实现归并排序
function mergeSort(arr, first, last, temp) {
  if(first<last) {
    let mid = Math.floor((first+last)/2);
    mergeSort(arr, first, mid, temp);    // 左子数组有序
    mergeSort(arr, mid+1, last, temp);   // 右子数组有序
    arr = mergeArray(arr, first, mid, last, temp);  
  }
  return arr;
}

// example
let arr1 = [10, 3, 1, 5, 11, 2, 0, 6, 3];
let temp = new Array();
let SortedArr = mergeSort(arr1, 0 ,arr1.length-1, temp);
console.log(SortedArr);
console.log(arr1);

function mergeSort(arr, start, end, temp){
  if (start < end) {
    let mid = Math.floor((start + end) / 2)
    mergeSort(arr, start, mid, temp)
    mergeSort(arr, mid + 1, end, temp)
    arr = mergeArray(arr, start, mid, end, temp)
  }
  return arr
}

function mergeArray(arr, start, mid, end, temp){
  let s = start
  let m = mid
  let m1 = m + 1
  let n = end
  let l = 0
  while(s <= m && m1 <= n) {
    if (arr[s] < arr[m1]) {
      temp[l++] = arr[s++]
    } else {
      temp[l++] = arr[m1++]
    }
  }
  while(s <= m) {
    temp[l++] = arr[s++]
  }
  while(m1 <= end) {
    temp[l++] = arr[m1++]
  }

  for(let k = 0; k < l; k++) {
    arr[start + k] = temp[k]
  }
  return arr
}