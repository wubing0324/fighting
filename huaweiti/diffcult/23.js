var cap = 6
var weights = [10, 20, 30, 40, 60]

function getres(cap, weights) {
    let n = weights.length
    let dp = new Array(n + 1).fill(0).map(() => new Array(cap + 1).fill(0))
    
    for (let i = 1; i <= n; i++) {
        for (let c = 1; c <= cap; c++) {
            if (i > c) {
                dp[i][c] = dp[i - 1][c]
            } else {
                dp[i][c] = Math.max(dp[i - 1][c], dp[i][c - i] + weights[i - 1])
            }
        }
    }
    console.table(dp)
}

var cap = 15
var weights = [10, 20, 30, 40, 60, 60, 70, 80, 90, 150]
getres(cap, weights)