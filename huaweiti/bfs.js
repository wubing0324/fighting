/* JavaScript Node ACM模式 控制台输入获取 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
 
void (async function () {
  const matrix = [];
 
  while ((line = await readline())) {
    // if (line == "") break; // 本地测试时打开此行注释，控制台多输入一个空行
    matrix.push([...line]);
  }
 
  let max = 0;
 
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] != "0") {
        max = Math.max(max, bfs(matrix, i, j));
      }
    }
  }
 
  console.log(max);
})();
 
function bfs(matrix, i, j) {
  let sum = parseInt(matrix[i][j]);
  matrix[i][j] = "0";
 
  const queue = [[i, j]];
 
  while (queue.length > 0) {
    const [x, y] = queue.shift();
 
    for (let offset of offsets) {
      const newX = x + offset[0];
      const newY = y + offset[1];
 
      if (
        newX >= 0 &&
        newX < matrix.length &&
        newY >= 0 &&
        newY < matrix[0].length &&
        matrix[newX][newY] != "0"
      ) {
        sum += parseInt(matrix[newX][newY]);
        matrix[newX][newY] = "0";
        queue.push([newX, newY]);
      }
    }
  }
 
  return sum;
}
// https://blog.csdn.net/qfc_128220/article/details/130774841