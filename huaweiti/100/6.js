var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  let res = []
  console.log(nums)
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复的 nums[i]

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        // 跳过重复的 nums[left] 和 nums[right]
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
  }
  console.log(res)
};
var nums = [0, 0, 0, 0]
threeSum(nums)