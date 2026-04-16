var firstMissingPositive = function (nums) {
  let dp = new Array(nums.length).fill(0)
  if (nums.length == 1) {
    let num = nums[0]
    if (nums <= 0) {
      return 1
    }
    if (num > 1) return 1
    return num + 1
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      if (!dp[nums[i]]) {
        dp[nums[i]] = 0
      }
      dp[nums[i]]++
    }
  }
  let i = 1
  for (; i < dp.length; i++) {
    if (!dp[i]) return i
  }
  console.log(i, dp, dp.length)
  return i
};
nums = [1, 10]
console.log(firstMissingPositive(nums))