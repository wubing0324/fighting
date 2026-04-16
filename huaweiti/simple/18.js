// 增强的str
// abcd
// b[cd]
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const src = await readline();
  const tar = await readline();
 
  // 将tar字符串转化为levels多层结构，转化逻辑为：tar字符串中，每个[]包含的所有字符作为一层，未被[]包含的单个字符作为一层
  const levels = [];
  // level用于记录[]中的字符
  let level = new Set();
 
  let isOpen = false;
  for (let c of tar) {
    if (c == "[") {
      isOpen = true;
    } else if (c == "]") {
      isOpen = false;
      levels.push(level);
      level = new Set();
    } else if (isOpen) {
      level.add(c);
    } else {
      levels.push(new Set([c]));
    }
  }
 
  console.log(indexOf(src, levels));
})();
 
function indexOf(src, levels) {
  // 滑动匹配levels.length长度的子串
  for (let i = 0; i <= src.length - levels.length; i++) {
    let j = 0;
    for (; j < levels.length; j++) {
      if (!levels[j].has(src[i + j])) {
        break;
      }
    }
 
    if (j == levels.length) {
      return i;
    }
  }
 
  return -1;
}