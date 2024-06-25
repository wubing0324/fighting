/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-02 14:18:41
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-02 14:53:20
 * @FilePath: \动态规划\sanjiao.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var minimumTotal = function(triangle) {
  let len = triangle.length
  var dp = Array.from(Array(len)).map(() => Array(len).fill(Infinity))
  dp[0][0] = triangle[0][0]
  for (let i = 1; i < len; i++) {
      for (let j = 0; j <= i; j++) {
          if (j - 1 < 0) {
              dp[i][j] = dp[i-1][j] + triangle[i][j]
          } else {
              dp[i][j] = Math.min(dp[i-1][j - 1], dp[i-1][j]) + triangle[i][j]
          }
      }
  }
  let min = Infinity
  for (let i = 0; i < dp[len - 1].length; i++) {
      min = Math.min(min, dp[len - 1][i])
  }
  return min
};
console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]))