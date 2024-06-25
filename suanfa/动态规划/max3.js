var arr = [1,3,2,-1,-2,2,1,-5,4]

var getMax = function(nums) {
  let len = nums.length
  let max = nums[0]
  let start = 0
  let end = 0
  var dp = Array.from(Array(9)).map(() => Array(9).fill(0))
  for (var i = 0; i < len; i++) {
    let sum = nums[i]
    for (var j = i + 1; j < len; j++) {
      sum = sum * nums[j]
      dp[i][j] = sum
      if (sum > max) {
        start = i
        end = j
      }
      max = Math.max(max, sum)
    }
  }
  console.table(dp)
  console.log(max)
  console.log(start)
  console.log(end)
}
getMax(arr)