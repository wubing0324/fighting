/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-19 11:06:48
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-19 13:51:14
 * @FilePath: \动态规划\tu\zhaobian.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// var numWays = function(n, relation, k) {
//   let ways = 0;
//   const edges = new Array(n).fill(0).map(() => new Array());

//   for (const [src, dst] of relation) {
//       edges[src].push(dst);
//   }
//   var map = {}
//   for(var i = 0; i < n; i++) {
//     map[i] = edges[i]
//   }
//   console.log(map)

// }
n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3

var numWays = function(n, relation, k) {
  const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < k; i++) {
      for (const [src, dst] of relation) {
          dp[i + 1][dst] += dp[i][src];
      }
  }
  console.log(dp)
  return dp[k][n - 1];
};

numWays(n, relation,k)
