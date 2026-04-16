// 题目描述
// 祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;
// 整体上常年光照良好，但是也有一些地区光照不太好。

// 某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，
// 其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。
// 我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。

// 输入描述
// 第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量
// 之后每行为调研区域每平方公里的发电量

// 输出描述
// 输出为这样的区域有多少个

// 示例1
// 输入

// 2 5 2 6
// 1 3 4 5 8
// 2 3 6 7 1
// 1
// 2
// 3
// 输出

// 4
// 1
// 说明

// 输入含义：
// 调研的区域大小为长2宽5的矩形，我们要建设的电站的边长为2，建设电站最低发电量为6.
// 输出含义：
// 长宽为2的正方形满足发电量大于等于6的区域有4个。

// 示例2
// 输入

// 5 1 6
// 1 3 4 5 8
// 2 3 6 7 1
// 1
// 2
// 3
// 输出

// 3
// 1

https://blog.csdn.net/qfc_128220/article/details/128976936?spm=1001.2014.3001.5501

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const [m, n] = (await readline()).split(" ").map(Number);
  const [h, w] = (await readline()).split(" ").map(Number);
 
  const matrix = [];
  for (let i = 0; i < m; i++) {
    matrix.push((await readline()).split(" ").map(Number));
  }
 
  const preSum = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
 
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        matrix[i - 1][j - 1];
    }
  }
 
  let maxVal = 0;
  let x1, y1, x2, y2;
 
  for (let i = h; i <= m; i++) {
    for (let j = w; j <= n; j++) {
      const val =
        preSum[i][j] -
        (preSum[i - h][j] + preSum[i][j - w]) +
        preSum[i - h][j - w];
 
      if (val > maxVal) {
        maxVal = val;
        x1 = i - h;
        y1 = j - w;
        x2 = i - 1;
        y2 = j - 1;
      }
    }
  }
 
  if (maxVal > 0) {
    console.log(`${x1} ${y1} ${x2} ${y2}`);
  } else {
    console.log(-1);
  }
})();