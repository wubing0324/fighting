var arr = [2,3,4,5,6,7,11,15]
var tmp = []
var map = {}
var k = 9
for (let i=1;i < arr.length; i++) {
  if (arr[0] + arr[i] <= k) {
    tmp.push(arr[i])
  }
}
var len = tmp.length
for (let j = 0;j < len; j++) {
  for (let i = len; i > j; i--) {
    if (arr[i] + arr[j] === 9) {
      map[i + ',' + j] = [i, j]
    }
  }
}
console.log(map)