// 在一个数组中，只有一个数出现了奇数次，求这个数，时间复杂度必须是o(n)

function getOdd(arr) {
  let len = arr.length
  let val = 0
  for (let i = 0; i < len; i++) {
    val = val ^ arr[i]
  }
  return val
}
// console.log(getOdd([0,0,6,1,2,2,1,6,6,9,9]))

// 在一个数组中，有2个数出现了奇数次，求这2个数，时间复杂度必须是o(n)
// 解：两个奇数个数的数字（a,b），所以第一次getOdd结果为 a ^ b,a ^ b != 0,异或相同位相等则为0，
// 所以a ^ b中为1的位置一定是a和b不相同的地方，通过这个不同来求出a或者b，已知a ^ b，已知a或者b
// a ^ b ^ b = a, a ^ b ^ a = b
function getodd2(arr) {
  let len = arr.length
  let eor = 0
  for (let i = 0; i < len; i++) {
    eor = eor ^ arr[i]
  }
  // 获取一个二进制数的左右侧的第一个1，
  // ~10110011 -> 01001100 + 1 -> 01001101 & 10110011 -> 00000001
  let rightOne = eor & (~eor + 1)
  let eor1 = 0
  for (let j = 0; j < len; j++) {
    if ((arr[j] & rightOne) == 0) {
      console.log(arr[j])
      eor1 = eor1 ^ arr[j]
    }
  }
  console.log(eor1, eor1 ^ eor)
}
getodd2([0,0,6,1,2,2,1,6,6,9,9,9])