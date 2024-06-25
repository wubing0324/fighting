/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-10 10:11:06
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-10 10:41:42
 * @FilePath: \动态规划\zi4.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var nums = [10,9,2,5,3,7,101,18]
nums = [4,10,4,3,8,9]

function gen(nums) {
  let len = nums.length

  let dp = []

  dp[0] = nums[0]
  for(let i = 1; i < len; i++) {
    for(let j = 0; j < dp.length; j++) {
      if (nums[i] == dp[j]) {
        break
      }
      if(nums[i] < dp[j]) {
        dp[j] = nums[i]
        break
      }
    }
    if (dp[dp.length - 1] < nums[i]) {
      dp.push(nums[i])
    }
  }
  console.log(dp)
  return dp.length
}
gen(nums)