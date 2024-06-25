/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-25 18:08:31
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-25 18:55:49
 * @FilePath: \动态规划\zi2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var lengthOfLIS = function(nums) {
  var len = nums.length
  if (len < 2) return len
  var dp = []
  dp[0] = nums[0]
  let end = 0
  let preIndex = [undefined]
  let map = {}
  for (let i=0; i < len; i++) {
    map[nums[i]] = i 
  }
  for(let i = 1; i < len; i++) {
    if (nums[i] > dp[end]) {
      let tmp = dp[end]
      preIndex.push(map[tmp])
      end++
      dp[end] = nums[i]
    } else {
      for (let j = 0; j <= end; j++) {
        if (nums[i] <= dp[j]) {
          dp[j] = nums[i]
          preIndex.push(map[dp[j-1]])
          break
        }
        
      }
    }
  }

  let last = dp[dp.length - 1]
  let maxIndex = map[last]
  let real = []
  let realIndex = []

  for (let i = 0; i <= maxIndex; i++) {
    if (preIndex[i] >= 0 && real.indexOf(nums[preIndex[i]]) == -1) {
      real.push(nums[preIndex[i]])
      realIndex.push(preIndex[i])
    }
  }
  real.push(last)
  realIndex.push(maxIndex)
  console.log(real)
  console.log(realIndex)

  return dp.length
};

lengthOfLIS([2,3,1,5,6,8,7,9,4])