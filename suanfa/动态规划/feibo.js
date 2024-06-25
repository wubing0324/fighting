/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-18 09:46:23
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-18 09:48:55
 * @FilePath: \动态规划\feibo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1

function gen(n) {
  let arr = new Array(n).fill(0)
  arr[0] = 0
  arr[1] = 1
  for(let i = 2;i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}
gen(3)