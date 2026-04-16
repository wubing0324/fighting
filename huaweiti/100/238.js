var productExceptSelf = function (nums) {
  let stack = []
  for (let i = 0; i < nums.length; i++) {
    if (stack.length > 1) return new Array(nums.length).fill(0)
    if (nums[i] == 0) {
      stack.push(i)
    }
  }
  if (stack.length == 1) {
    let idx = stack[0]
    nums.splice(idx, 1)
    let sum = nums.reduce((pre, next) => {
      return pre * next
    }, 1)
    let dp = new Array(nums.length + 1).fill(0)
    dp[idx] = sum
    console.log(dp)
    return dp
  } else {
    let sum = nums.reduce((pre, next) => {
      return pre * next
    }, 1)
    console.log(sum)
    let dp = new Array(nums.length)
    for (let i = 0; i < nums.length; i++) {
      dp[i] = nums[i] == 0 ? sum : sum / nums[i]
    }
    console.log(dp)
    return dp
  }

};
nums = [-1, 1, 0, -3, 3]
productExceptSelf(nums)