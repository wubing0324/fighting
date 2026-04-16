// 题目描述
// x 名士兵押送 y 名俘虏的过程中，遇到了一座桥，已知桥上最多只能同时有 z 个人行走，多了的话，则桥会断。

// 当桥左岸或桥右岸上的士兵数量不大于俘虏数量时，俘虏就会逃跑。在桥上时，俘虏无法逃跑。

// 请你计算出至少需要几次，才能在俘虏不逃跑的前提下，让所有士兵和俘虏过桥。

// 输入描述
// 第一行输入士兵数量 x

// 第二行输入俘虏数量 y

// 第三行输入 z，表示桥上最多 z 人同时行走，超出了桥就会断。

// 输出描述
// 输出至少需要几次才能让所有士兵和俘虏过桥。

// 用例
// 输入	11 4 1
// 输出	15
// 说明	
// 1、一个士兵过去，桥左：10 4，桥右：1 0

// 2、一个士兵过去，桥左：9 4，桥右：2 0

// 3、一个俘虏过去，桥左：9 3，桥右：2 1

// 4、一个士兵过去，桥左：8 3，桥右：3 1

// 5、一个俘虏过去，桥左：8 2，桥右：3 2

// 6、一个士兵过去，桥左：7 2，桥右：4 2

// 7、一个俘虏过去，桥左：7 1，桥右：4 3

// 8、一个士兵过去，桥左：6 1，桥右：5 3

// 9、一个俘虏过去，桥左：6 0，桥右：5 4

// 10~15、桥左的士兵依次过桥

// 题目解析
// 本题没有什么好的解题思路，只能通过暴力枚举所有士兵、俘虏数量情况，只需要满足下面三个条件：

// 桥左岸士兵数量 > 桥左岸俘虏数量
// 桥右岸士兵数量 > 桥右岸俘虏数量
// 桥上士兵和俘虏数量之和不大于 z
// 本题非常类似于《算法乐趣》一书中的：妖怪和和尚过河问题，关于此问题算法，JS可以参考下面文章

// Java乘船_妖怪和和尚过河问题(javascript实现)_王元祺的博客-CSDN博客

// 也可以观看如下视频科普：

// S1E5 合作过河 River Crossing Riddle_哔哩哔哩_bilibili

// 但是，上面妖怪过河问题是基于暴力枚举法+状态搜索树实现的，我试了一下5 3 3的用例，发现时间复杂度贼高。

// 因此可能不适合本题，在这里将这个思路告知大家，看看大家有没有什么思路，欢迎大家将见解在评论中发出来。
// ————————————————

//                             本文为博主原创文章，未经授权，不得转载搬运。
                        
// 原文链接：https://blog.csdn.net/qfc_128220/article/details/128080927


const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const x = parseInt(await readline());
  const y = parseInt(await readline());
  const z = parseInt(await readline());
  console.log(solution(x, y, z));
})();
 
function solution(left_soldier, left_capture, bridge) {
  const ans = [];
  dfs(left_soldier, left_capture, bridge, 0, 0, 0, ans);
 
  if (ans.length) {
    return Math.min.apply(null, ans);
  } else {
    return 0;
  }
}
 
function dfs(left_soldier, left_capture, bridge, right_soldier, right_capture, count, ans) {
  if (left_soldier === 0 && left_capture === 0) {
    ans.push(count);
    return;
  }
 
  if (left_soldier + left_capture <= bridge) {
    ans.push(count + 1);
    return;
  }
 
  // i 代表桥上士兵数量，最多Math.min(bridge, left_soldier)
  for (let i = 0; i <= Math.min(bridge, left_soldier); i++) {
    // j 代表桥上俘虏数量，最多Math.min(bridge, left_capture)
    for (let j = 0; j <= Math.min(bridge, left_capture); j++) {
      // 空运
      if (i + j === 0) continue;
 
      // 超载
      if (i + j > bridge) break;
 
      // 左岸士兵 <= 左岸俘虏，说明俘虏运少了
      if (left_soldier - i <= left_capture - j && left_soldier - i !== 0) continue;
 
      // 右岸士兵 <= 右岸俘虏，说明俘虏运多了
      if (right_soldier + i <= right_capture + j && right_soldier + i !== 0) break;
 
      // 右岸没士兵，但是右岸俘虏已经超过船载量，即下次即使整船都运士兵，也无法保证右岸士兵 > 右岸俘虏
      if (right_soldier + i === 0 && right_capture + j >= bridge) break;
 
      dfs(
        left_soldier - i,
        left_capture - j,
        bridge,
        right_soldier + i,
        right_capture + j,
        count + 1,
        ans
      );
    }
  }
}