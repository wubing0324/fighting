var arr = [8,20,1,3,9,5,12,6,2,11,10,4,7,0,30]

// var len = arr.length
// var temp
// var gap = 1

// while(gap < len / 3) {
//   gap = gap * 3 + 1
// }
// for (gap; gap > 0; gap = Math.floor(gap / 3)) {
//   for (var i = gap; i < len; i++) {
//     temp = arr[i]
//     for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
//       arr[j + gap] = arr[j]
//     }
//     arr[j + gap] = temp
//   }
// }
// console.log(arr)
// [8,20,1,3,9,5,12,6,2,11,10,4,7,0,30]
var tmp
var len = arr.length
var gap = 1

while(gap < len / 3) {
  gap = gap * 3 + 1
}
for (gap; gap > 0; gap = Math.floor(gap / 3)) {
  for (var i = gap; i < len; i++) {
    tmp = arr[i]
    for (var j = i - gap; j >= 0 && arr[j] > tmp; j -= gap) {
      arr[j + gap] = arr[j]
    }
    arr[j + gap] = tmp
  }
}
console.log(arr)

//希尔排序是插入排序的升级版，插入排序的间隔是1，所以是拿一个值和这个值前面的所有元素比较，希尔动态控制了间隔，也就是把j变成了gap，
// gap是1和插入排序是一摸一样的，gap是2，那么数组被划分为两个子序列，两个子序列分别执行插入排序。
// 在数据很大的时候，gap也就很大，gap会越来越小，数据变得越来越有序，第三个for循环执行的也就越来越少。