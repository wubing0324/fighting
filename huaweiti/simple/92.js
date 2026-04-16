// 题目描述
// 《平衡天使(Bamboleo)》是一款好玩的游戏，该游戏会在一根木柱上放置一个松木球，然后在松木球上放置一个圆盘，你需要将多个不同重量的木块放到圆盘上，若圆盘不倾倒，则游戏成功。

// 根据力学知识，若所有木块可以分为重量相同的多个堆，然后将多个堆均匀地排布在圆盘上，则圆盘就可以平衡，并且分的堆数越多，则平衡越稳定。

// 请你输出所有木块最多可以分为重量相同的几个堆。

// 输入描述
// 输入一个数组，数组元素是各个木块的重量。格式请见用例。数组长度最大30。

// 输出描述
// 输出所有木块最多可以平分几个重量相同的堆。
// ————————————————

//                             本文为博主原创文章，未经授权，不得转载搬运。
                        
// 原文链接：https://blog.csdn.net/qfc_128220/article/details/128228251

// 输入	[1, 1, 1, 1, 2, 2, 2, 2]
// 输出	6
// 说明	1+1、1+1、2、2、2、2

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const nums = JSON.parse(await readline());
 
  // 降序
  nums.sort((a, b) => b - a);
 
  // 总重量
  const sum = nums.reduce((a, b) => a + b);
 
  // 平分堆数k
  for (let k = nums.length; k >= 1; k--) {
    // 总重量可以平分为 k 份
    if (sum % k == 0) {
      const subSum = sum / k;
 
      // k个桶（每个桶记录每个堆中木块的重量之和，每个堆都是 subSum 重量，不能多也不能少
      const buckets = new Array(k).fill(0);
 
      // 若 nums 所有元素都可以放到 k 个桶，且每个桶都能装满
      if (partition(0, nums, subSum, buckets)) {
        return console.log(k);
      }
    }
  }
})();
 
function partition(index, nums, subSum, buckets) {
  if (index === nums.length) {
    return true;
  }
 
  const select = nums[index];
 
  for (let i = 0; i < buckets.length; i++) {
    if (i > 0 && buckets[i] === buckets[i - 1]) continue;
 
    if (buckets[i] + select <= subSum) {
      buckets[i] += select;
      if (partition(index + 1, nums, subSum, buckets)) return true;
      buckets[i] -= select;
    }
  }
 
  return false;
}