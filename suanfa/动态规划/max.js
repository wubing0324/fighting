var arr = [-2,1,-3,4,-1,2,1,-5,4]

function getMax(arr) {
  let sum = 0
  let max = arr[0]
  let start = 0
  let end = 0
  var dp = Array.from(Array(9)).map(() => Array(9).fill(0))
  for (var i = 0; i < arr.length; i++) {
    sum = 0
    for (var j = i; j < arr.length; j++) {
      sum = sum + arr[j]
      dp[i][j] = sum
      if (max < sum) {
        start = i
        end = j
      }
      max = Math.max(sum, max)
    }
  }
  console.table(dp)
  return {max: max, start: start,end:end}
}
// console.log(getMax(arr))

function getMax2(nums) {
  let dp = [].concat(nums)
  let n = nums.length
  var arr = [-2,1,-3,4,-1,2,1,-5,4]
  for(let i = 1; i < n; i++) {
    // 通过找‘构成最优解的最小单位’得出规律列出转换方程，利用转换方程遍历出最优解并保存
    dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
  }
  console.log(dp)
  return Math.max(...dp)
}
// [-2,1]:dp[1] = [1]
// [-2,1,-3]:dp[2] = [1]
// [-2,1,-3,4]:dp[3] = [1,-3,4]
getMax2(arr)