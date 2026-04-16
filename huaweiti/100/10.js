var subarraySum = function (nums, k) {

  let presum = new Array(nums.length + 1).fill(0)
  for (let i = 1; i <= nums.length; i++) {
    presum[i] = presum[i - 1] + nums[i - 1]
  }

  console.log(presum)
  let ans = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= nums.length; j++) {
      if (presum[j] - presum[i] == k) ans++
    }
  }
  console.log(ans)
};

let nums = [1, 1, 1], k = 2
subarraySum(nums, k)