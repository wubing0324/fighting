let input = [3, 2, 6, 1, 4]
let output = [3, 4, 2, 6, 1]
// LRLLL
// 给出放入和取出顺序，输出拿出的顺序

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const inputs = (await readline()).split(",").map(Number);
  const outputs = (await readline()).split(",").map(Number);

  // 利用队列结构模拟圆桶
  const queue = [];
  // outputs[index]是要被取出的篮球的编号
  let index = 0;

  // 记录题解
  const res = [];

  for (let input of inputs) {
    // 按照放入顺序，从圆桶右边放入
    queue.push(input);

    // 然后开始尝试取出
    while (queue.length > 0 && index < outputs.length) {
      // 圆桶左边的篮球的编号
      const left = queue[0];
      // 圆桶右边的篮球的编号
      const right = queue.at(-1);

      if (left == outputs[index]) {
        // 优先比较圆桶左边的篮球是不是当前要取出的篮球，优先左边的原因是：当桶只有一个篮球的情况下，必须从左边取出
        res.push("L");
        queue.shift();
        index++;
      } else if (right == outputs[index]) {
        // 比较圆桶右边的篮球是不是当前要取出的篮球
        res.push("R");
        queue.pop();
        index++;
      } else {
        // 如果圆桶左右两边都不是要取出的球，则本轮取出流程结束
        break;
      }
    }
  }

  // 最终如果圆桶空了，则说明所有球都取出了，否则按照给定要求无法取出所有球
  // 注意本题可能放入的球数量 > 取出球的数量，因此此处不能判断queue为空
  if (index != outputs.length) {
    console.log("NO");
  } else {
    console.log(res.join(""));
  }
})();