var longestConsecutive = function (nums) {
  nums.sort((a, b) => a - b)

  let ans = 1
  let tmp = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] == nums[i]) {
      continue
    } else if (nums[i] - nums[i - 1] == 1) {
      tmp++
      ans = Math.max(tmp, ans)
    } else {
      tmp = 1
    }
  }
  console.log(ans)
  return ans
};
var arr = [100, 4, 200, 1, 3, 2]
longestConsecutive(arr)