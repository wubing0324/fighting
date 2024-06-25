var cost = [1,100,1,1,1,100,1,1,100,1]
// f[n] = Math.min(f[n-1],f[n-2]) + 1
// f[n-1] = Math.min(f(n-1-1), f(n-1-2))

// f[0] = 1
// f[1] = Math.min(cost[0], cost[1])
// f[2] = f[1] + Math.min(cost[2], cost[3])
// f[3] = f[2] + Math.min(cost[3], cost[4])

function gen(value) {
  let cost = [...value, 0]
  let n = cost.length - 1
  let arr = new Array(n).fill(Infinity)
  arr[0] = cost[0]
  arr[1] = cost[1]
  for (let i = 2; i <= n; i++) {
    arr[i] = Math.min(arr[i - 1], arr[i - 2]) + cost[i]
  }
  return arr
}
gen([10,15,20])