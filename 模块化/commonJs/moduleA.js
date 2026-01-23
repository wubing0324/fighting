let count = 0;

setInterval(() => {
  console.log(count++);
}, 1000);
// 导出一个函数，返回动态变化的 count
module.exports = {
  getCount: () => count,
};
