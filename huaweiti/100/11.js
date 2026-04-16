var maxSlidingWindow = function (nums, k) {
  let queue = []
  let ans = []
  for (let i = 0; i < k; i++) {
    while (queue.length > 0 && queue.at(-1) < nums[i]) {
      queue.pop()
    }
    queue.push(nums[i])
  }
  ans.push(queue[0])
  for (let i = k; i <= nums.length - 1; i++) {
    if (nums[i - k] == queue[0]) {
      queue.shift()
    }
    while (queue.length > 0 && queue.at(-1) < nums[i]) {
      queue.pop()
    }
    queue.push(nums[i])

    ans.push(queue[0])
  }
  console.log(ans)
};
// let nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
let nums = [1, -1], k = 1
maxSlidingWindow(nums, k)



// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7