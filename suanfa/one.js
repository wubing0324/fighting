function getM(price){
  if (parseFloat('0.' + price.toString().split('.')[1]) === 0) {
    console.log('1-10都可以')
    return 1
  }
  var arr = []
  var map = {}
  for (var i = 0; i < 10000; i ++) {
    var  m = i * price
    var float = parseFloat('0.' + m.toString().split('.')[1])
    map[float] = m
    arr.push(float)
  }
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var tmp
        tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
      }
    }
  }
  console.log(map[arr[1]])
}