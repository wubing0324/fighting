var maxSubArray = function (nums) {
  let len = nums.length
  let dp = new Array(len)

  dp[0] = nums[0]
  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], 0) + nums[i]
  }
  return Math.max(...dp)
};
let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
maxSubArray(nums)