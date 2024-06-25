// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

function gen(nums) {
  let len = nums.length
  let tmp = new Array(len - 1).fill(0)
  tmp[0] = nums[0]
  for(let i = 1; i < arr.length; i++) {
    tmp[i] = Math.max(tmp[i-1] + tmp[i], tmp[i])
  }
  return
}