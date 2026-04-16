

// 2XXX年，人类通过对火星的大气进行宜居改造分析，使得火星已在理论上具备人类宜居的条件；

// 由于技术原因，无法一次性将火星大气全部改造，只能通过局部处理形式；

// 假设将火星待改造的区域为row *
// column的网格，每个网格有3个值，宜居区、可改造区、死亡区，使用YES、NO、NA代替，YES表示该网格已经完成大气改造，NO表示该网格未进行改造，后期可进行改造，NA表示死亡区，不作为判断是否改造完的宜居，无法穿过；

// 初始化下，该区域可能存在多个宜居区，并目每个宜居区能同时在每个大阳日单位向上下左右四个方向的相邻格子进行扩散，自动将4个方向相邻的真空区改造成宜居区；

// 请计算这个待改造区域的网格中，可改造区是否能全部成宜居区，如果可以，则返回改造的大阳日天教，不可以则返回-1

// 输入描述
// 输入row * column个网格数据，每个网格值枚举值如下: YES，NO，NA；

// 样例:、

// YES YES NO
// NO NO NO
// NA NO YES
// 1
// 2
// 3
// 备注
// grid[i][j]只有3种情况，YES、NO、NA

// row == grid.length
// column == grid[i].length
// 1 ≤ row, column ≤ 8
// 输出描述
// 可改造区是否能全部变成宜居区，如果可以，则返回改造的太阳日天数，不可以则返回-1。

// 示例1
// 输入

// YES YES NO
// NO NO NO
// YES NO NO
// 1
// 2
// 3
// 输出

// 2
// 1
// 说明

// 经过 2 个太阳日，完成宜居改造。

// 示例2
// 输入

// YES NO NO NO
// NO NO NO NO
// NO NO NO NO
// NO NO NO NO
// 1
// 2
// 3
// 4
// 输出

// 6
// 1
// 说明

// 经过 6 个太阳日，可完成改造

// 示例3
// 输入

// NO NA
// 1
// 输出

// -1
// 1
// 说明

// 无改造初始条件，无法进行改造

// 示例4
// 输入

// YES NO NO YES
// NO NO YES NO
// NO YES NA NA
// YES NO NA NO
// 1
// 2
// 3
// 4
// 输出

// -1
// 1
// 说明

// -1 ，右下角的区域，被周边三个死亡区挡住，无法实现改造

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const matrix = [];

  while ((line = await readline())) {
    matrix.push(line.split(" "));
  }

  console.log(bfs(matrix));
})();

function bfs(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  // 记录宜居取坐标位置
  let queue = [];
  // 记录可改造区数量
  let need = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      switch (matrix[i][j]) {
        case "YES":
          queue.push([i, j]);
          break;
        case "NO":
          need++;
          break;
      }
    }
  }

  // 如果没有宜居区，则无法改造，直接返回-1
  if (queue.length == 0) return -1;
  // 如果全是宜居区，则无需改造，直接返回0
  if (queue.length == row * col) return 0;

  // 记录花费的天数
  let day = 0;
  // 上，下，左，右四个方向的偏移量
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 图的多源BFS模板
  while (queue.length > 0 && need > 0) {
    // 当前层坐标数量
    const size = queue.length;

    // 按层扩散
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (let offset of offsets) {
        // 上，下，左，右四个方向扩散
        const newX = x + offset[0];
        const newY = y + offset[1];

        // 如果新位置没有越界，且为NO，则可以被改造
        if (
          newX >= 0 &&
          newX < row &&
          newY >= 0 &&
          newY < col &&
          "NO" == matrix[newX][newY]
        ) {
          matrix[newX][newY] = "YES";
          queue.push([newX, newY]);
          need--;
        }
      }
    }

    day++;
  }

  if (need == 0) {
    return day;
  } else {
    return -1;
  }
}