/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-26 11:03:15
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-28 10:56:17
 * @FilePath: \动态规划\danci.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// var wordBreak = function(s, wordDict) {
//   const workSet = new Set(wordDict)
//   const memory = new Array(s.length)
//   const canBreak = (start) => {
//     if (start == s.length) {
//       return true
//     }
//     if (memory[start] !== undefined) return memory[start]
//     for (let i = start+1; i <= s.length; i++) {
//       const prefix = s.slice(start, i);
//       if (workSet.has(prefix) && canBreak(i)) {
//         memory[i] = true
//         return true
//       }
//     }
//     memory[start] = false
//     return false
//   }
//   let r = canBreak(0)
//   return r
// };

var wordBreak = function(s, wordDict) {
  var len = s.length
  var dp = new Array(len).fill(false)
  dp[0] = true
  var wordSet = new Set(wordDict)
    for(let i=1;i<=len;i++) {
      for(let j=0;j<i;j++) {
          if (dp[j] && wordSet.has(s.substring(j,i))) {
              dp[i] = true
              break 
          }
      }
    }
  return dp[len]
};
console.log(wordBreak("leetcode", ["leet","code"]))

var s =
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
var wordDict =
["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]

// console.log(wordBreak(s, wordDict))
