```javascript
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const nums = (await readline()).split(",").map(Number);
  console.log(getResult(nums));
})();
 
function getResult(nums) {
  // 题目说会输入n*n个值
  const n = Math.sqrt(nums.length);
 
  // 将一维arr输入转为二维矩阵matrix
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
 
  // 将矩阵中所有感染区域位置记录到queue中,这里选择queue先进先出的原因是保证当天的感染区域并发扩散
  let queue = [];
 
  // 还原矩阵, 并记录感染区位置到queue中
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = nums[i * n + j];
 
      if (matrix[i][j] == 1) {
        queue.push([i, j]);
      }
    }
  }
 
  // 全是感染区，或全是健康区
  if (queue.length == 0 || queue.length == nums.length) {
    return -1;
  }
 
  // 健康区个数
  let healthy = nums.length - queue.length;
 
  // 上下左右位置偏移量
  const offsets = [
    [-1, 0], // 上
    [1, 0], // 下
    [0, -1], // 左
    [0, 1], // 右
  ];
 
  // day用于统计感染全部花费的时间
  let day = 0;
 
  // 如果健康区个数为0，说明感染完了
  while (queue.length > 0 && healthy > 0) {
    // size 表示当前层感染区数量
    const size = queue.length;
 
    // 遍历当前层的感染区位置, 并进行扩散
    for (let i = 0; i < size; i++) {
      // 当前层感染区位置
      const [x, y] = queue.shift();
 
      // 四个方向进行扩散
      for (let [offsetX, offsetY] of offsets) {
        const newX = x + offsetX;
        const newY = y + offsetY;
 
        if (
          newX >= 0 &&
          newX < n &&
          newY >= 0 &&
          newY < n &&
          matrix[newX][newY] === 0
        ) {
          // 标记(newX, newY)已被感染
          matrix[newX][newY] = 1; // 在入队前标记
          // 健康区数量-1
          healthy--;
          // 新增感染区属于新层
          queue.push([newX, newY]);
        }
      }
    }
 
    // 一层遍历完就是一天
    day++;
  }
 
  return day;
}
```