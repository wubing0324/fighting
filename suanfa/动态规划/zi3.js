/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-25 18:08:31
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-01-19 10:47:45
 * @FilePath: \动态规划\zi2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var lengthOfLIS = function(nums) {
  var len = nums.length
  if (len < 2) return len
  // dp数组有两个作用：存储目前最长上子序列的长度；贪心算法将更小的数存在数组中，
  // 数越小成为最长上升子序列的可能越大
  var dp = []
  dp[0] = 0
  let end = 0
  let preIndex = [undefined]
  for(let i = 1; i < len; i++) {
    // 如果原数组中索引是i的值大于dp中最后一个元素，就将nums[i]存入dp，
    if (nums[i] > nums[dp[end]]) {
      preIndex.push(dp[end])
      end++
      dp[end] = i
    } else {
      // dp是一个元素从小到大排列的数组，nums[i]小于dp的最后一个元素，用nums[i]替换dp中那个大于nums[i]的值，
      // 从dp[0]开始比较，这样 nums[dp[j]] - nums[i]的值最小，依旧能保证dp是一个元素从小到大排列的数组
      for (let j = 0; j <= end; j++) {
        if (nums[i] <= nums[dp[j]]) {
          dp[j] = i
          preIndex.push(dp[j-1])
          break
        }
      }
    }
  }
  console.log(dp)
  console.log(preIndex)
  // 利用前驱节点重新计算result
  let length = dp.length, //总长度
  prev = dp[length - 1] // 最后一项
  while (length-- > 0) {// 根据前驱节点一个个向前查找
    dp[length] = prev
    prev = preIndex[dp[length]]
  }

  console.log(dp)
  console.log(preIndex)

  return dp.length
};

lengthOfLIS([2,3,1,5,6,8,7,9,4])

// [2,3] [1,3,4,6,8,9]

// [undefined,5,3]



