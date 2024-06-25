// m = d * n
// m,n为整数，d为精确到14位小数的数字
// 0 < n < 10000
// 0 < d < 10
// 输入d，算出m和n，使得m/n的结果最为接近d

// 解：
// 0 < m < 10 * 10000
price = 3.11111111111111111
var arr = []
var map = {
  z : 0,
  t: 0
}
var c
for(var z = Math.ceil(price); z < Math.ceil(price) * 10000; z++){
  for (var t = 1; t < 10000; t++) {
    var p = z / t
    var tmp = price - p > 0 ? price - p : p - price
    if (c) {
      if (tmp < c) {
        map.z = z
        map.t = t
      }
    } else {
      c = tmp
      map.z = z
      map.t = t
    }
  }
}
console.log(map)
