/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-20 18:50:02
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-21 10:41:03
 * @FilePath: \动态规划\zi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function gen(nums) {
  let len = nums.length
  if (len == 0) return 0
  let dp = new Array(len).fill(1)
  let max = 0
  let map = {}

  for(let i = 1; i < len; i++) {
    dp[i] = 1
    map[i] = {}
    for(let j = 0; j < i;j++) {
      if (nums[i] > nums[j]) {
        if (dp[i] < dp[j] + 1) {
          map[i][j] = nums[j]
        }
        dp[i] = Math.max(dp[i],dp[j] + 1)
      }
    }
    map[i][i] = nums[i]
    max = Math.max(dp[i], max)
  }
  console.log(map)

  return max
}
console.log(gen([0,1,0,3,2,3]))