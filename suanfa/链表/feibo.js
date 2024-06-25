function feibo(n) {
  let arr = [1]
  if (n < 1) {
    return arr
  }
  let pre = 0
  let cur = 1
  let iterator = n - 1
  while(n > 0) {
    cur += pre
    pre = cur - pre
    arr.push(cur)
    --n
  }
  return arr
}
let arr = feibo(10)
console.log(arr)