let arr = [1,1,1,1,1,1,1,1]
let n = arr.length
const preSum = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
    preSum[i] = preSum[i - 1] + arr[i - 1];
}
console.log(preSum)

const preSum2 = new Array(n).fill(0);
preSum2[0] = arr[1]
for (let i = 1; i < n; i++) {
    preSum2[i] = preSum2[i - 1] + arr[i];
}
console.log(preSum2)

var art1 = [1,2,3,4]
console.log(art1.sort((a,b) => -1))

