/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-27 18:58:04
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-31 19:01:00
 * @FilePath: \动态规划\kuohao.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// function generateParenthesis(n) {
//   let combinations = []
//   let current = new Array(2 * n)
//   debugger
//   generateAll(current, 0, combinations);
//   return combinations.length;
// }

// function generateAll(current, pos, result) {
//   if (pos == current.length) {
//     if (valid(current)) {
//       result.push([...current]);
//     }
//   } else {
//       current[pos] = '(';
//       generateAll(current, pos + 1, result);
//       current[pos] = ')';
//       generateAll(current, pos + 1, result);
//   }
// }

// function valid(current) {
//   let balance = 0
//   let i = 0
//   while(i < current.length) {
//     if (current[i] == '(') {
//       ++balance
//     }
//     if (current[i] == ')') {
//       --balance
//     }
//     if (balance < 0) {
//       return false 
//     }
//     i++
//   }
//   return balance == 0
// }

// console.log(generateParenthesis(5))
// ((
// ()
// )(
// ))
// (((
// (()
// ()(     


function gen(n) {
  let dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  for(let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = dp[j] * dp[i - j - 1] + dp[i]
    }
  }
  return dp[n]
}
console.log(gen(4))

f(0) = 0

f(1) = 1

f(2)

()

()()  (())

()()()
()(())
(())()
(()())
((()))

始终把新增的那个括号[用中文括号表示]放在最左侧固定不动，其他括号则插入其中，插入的位置只有（）内或者（）右侧，不考虑左侧，因为
左侧相当于当前括号外有一个，剩下的都在括号内，例如（()）()或（(())）()，例子：
一个括号：（）

两个括号：
（）()
（()）

三个括号:
（）()()
两个括号现有一个括号，然后考虑另外一个括号可插入的位置，只有括号内和括号外,括号外我们只考虑在右侧，不考虑左侧，
因为在左侧相当于当前括号外有一个，剩下的都在括号内，例如(())()或((()))()
