var arr = [1,3,2,-1,-2,2,1,-5,4]

var maxProduct = function(nums) {
  let n = nums.length
  let imax = nums[0]
  let imin = nums[0]
  let res = nums[0]
  let minStart
  let maxStart
  let indexEnd
  for (let i = 1;i < n;i++){
    let mi = Math.min(nums[i] * imax, nums[i] * imin)

    let mx = Math.max(nums[i] * imax, nums[i] * imin)
    if (mi > nums[i]) {
      minStart = i
      console.log('小重来')
    }
    if (mx < nums[i]) {
      maxStart = i
      console.log('大重来')
    }
    imin = Math.min(mi, nums[i])
    imax = Math.max(mx, nums[i])
    console.log('-----------------')
    console.log('index = ' + i)
    console.log('imin = ' + imin)
    console.log('imax = ' + imax)
    console.log('minStart = ' + minStart)
    console.log('maxStart = ' + maxStart)
    if (imax >= res) {
      indexEnd = i
    }
    res = Math.max(res, imax)
  }
  console.log('indexEnd = ' + indexEnd)
  let data = res
  for (var j = indexEnd; j >= 0; j--) {
    data = data / nums[j]
    console.log('data = ' + data)
  }
  return res
}

console.log(maxProduct(arr))