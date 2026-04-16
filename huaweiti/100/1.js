var twoSum = function (nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let num = target - nums[i]
    if (map.has(num)) return [map.get(num), i]
    if (!map.has(nums[i])) {
      map.set(nums[i], i)
    }
  }
};
let arr = [2, 7, 11, 15]
console.log(twoSum(arr, 9))