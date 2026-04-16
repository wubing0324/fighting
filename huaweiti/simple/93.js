var weights = [23,26,36,27];
var target = 78

weights.sort((a, b) => a - b)
let ans = -1
for (let i = 0; i < weights.length; i++) {
    
    let l = i + 1
    let r = weights.length - 1
    while (l < r) {
        let sum = weights[i] + weights[l] + weights[r]
        if (sum < target) {
            ans = Math.max(ans, sum)
            l++
            
        } else if (sum > target) {
            r--
        } else {
            return sum
        }
    }
    console.log('ans = ', ans)
    return ans
}