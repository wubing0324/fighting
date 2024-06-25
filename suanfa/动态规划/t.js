/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-01 10:26:54
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-01 13:36:32
 * @FilePath: \动态规划\t.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function dynamic(arr) {
  let len = arr.length
  if (len < 2) return 1
  let i = 0
  let dp = []
  dp[0] = arr[0]
  while(i < len) {
    let max = 0
    let index = 0
    let tmp = 0
    for (let j = 1; j<=arr[i];j++) {
      if (arr[i + j] >= len - (i+j+1)) {
        dp.push(arr[i+j])
        index = len
        break
      }
      // i=4
      if (arr[i+j] != 0 && arr[i+j] >= max - tmp +1) {
        tmp = 1
        max = arr[i+j]
        index = i+j
      } else {
        tmp = tmp + 1
      }
    }
    if (arr[index]) {
      dp.push(arr[index])
    }
    i = index
  }
  return dp
}
console.log(dynamic([2,1,9,5,9, 7,6,4,8,3,2,2,2,1, 9,1,7,9,7,0,7,5,8,2,1,3,2,4,1,9,5,4,0,6,1,1]))