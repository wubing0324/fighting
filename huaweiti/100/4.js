var moveZeroes = function (nums) {
  let left = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[left] == 0 && nums[i] !== 0) {
      nums[left] = nums[i]
      nums[i] = 0
      left++
    }
    if (nums[left !== 0]) left++
  }
  console.log(nums)
};
let nums = [0, 1, 0, 3, 12]
moveZeroes(nums)