function test(n){
  if (n > 2) {
    test(n / 2)
  }
  if(n % 2 === 0) return true
  return false
}
console.log(test(10))
console.log(test(8))
console.log(test(1))
console.log(test(2))

function power(x, n){
  if (n === 0) return 1
  return x * power(x, n - 1)
}
console.log(power(2, 3))

var arr = [1,2,3,4,5,6,7,8,9,10]
function search(seq, val, left, right){
  let middle = Math.ceil((left + right) / 2)
  if (seq[middle] === val) return middle
  if (seq[middle] > val) search(seq, val, left, middle - 1)
  if (seq[middle] < val) search(seq, val, middle + 1, right)
}
console.log(search(arr, 6, 0, arr.length - 1))