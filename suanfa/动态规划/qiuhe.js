/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-03 11:07:16
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-03 12:06:24
 * @FilePath: \testapp3\qiuhe.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function getSum(nums) {
  let rows = nums.length
  let colmns = nums[0].length
  let dp = Array.from(Array(rows)).map(() => Array(colmns).fill(Infinity))

  for (let i = 0; i < rows; i++) {
    for(let j = 0; j < colmns; j++) {
      if (i - 1 < 0 && j - 1 < 0) {
        dp[i][j] = nums[i][j]
      } else if (j - 1 < 0) {
        dp[i][j] = dp[i - 1][j] + nums[i][j]
      } else if (i - 1 < 0) {
        dp[i][j] = dp[i][j - 1] + nums[i][j]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + nums[i][j]
      }
    }
  }
  return dp[rows - 1][colmns - 1]
}

var grid = [[1,3,1],[1,5,1],[4,2,1]]
grid = [[1,2,3],[4,5,6]]
getSum(grid)