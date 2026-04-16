/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [x, y] = line.split(" ").map(Number);

  console.log(Math.max(1, Math.ceil(Math.log10(x / Math.pow(26, y)))));
});