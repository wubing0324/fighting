// n=1 1
// n=2 11 2
// n=3 111 12 21
// n=4 1111 22 112 211 121 
// f(n) = f(n-1) + f(n-2)


function gen(n) {
  let arr = new Array(n).fill(0)
  arr[1] = 1
  arr[2] = 2
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n]
}
gen(4)