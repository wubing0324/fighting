/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-02 19:52:04
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-02 19:56:22
 * @FilePath: \动态规划\tiaoyue1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var canJump = function(nums) {
  let len = nums.length
  
  // let dp = new Array(len)
  
  let result = true
  for (let i = 0; i < len; i++) {
      let j = 0
      while(nums[j] + j < i && j < i) {
          j++
      }
      if (j >= i && nums[j] == 0) {
         console.log(i, j)
          result = false
          break
      }
  }
  return result
  
};
canJump([2,3,1,1,4])