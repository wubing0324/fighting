/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2023-01-17 09:33:43
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-01-17 10:57:38
 * @FilePath: \suanfa\zuichang.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// var nums = [10,9,2,5,3,7,101,18,1]
var nums = [4,10,4,3,8,9]
function test(nums) {
  let len = nums.length
  let arr = []
  arr[0] = nums[0]
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] >= nums[i]) {
        arr[j] = nums[i]
        break
      }
    }
    if (arr[arr.length - 1] < nums[i]) {
      arr.push(nums[i])
    }
  }
  console.log(arr)
}
test(nums)