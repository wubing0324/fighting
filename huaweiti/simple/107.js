// 题目描述
// 某城市片区有两个外卖站点，考虑到夜间也有外卖需求，但是需求不多，因此每个站点至多安排 5 个外卖员值夜班。

// 当有外卖订单产生时，哪个站点能抢单成功，取决于该站点的值班人数，具体规则如下：

// 当订单数量达到 1 个运力标准时，站点值班人数优先级为：5 > 2 > 4 > 3 > 1，即优先 5 人值班的站点抢单成功，次优 2 人值班的站点抢单成功，.....，依次类推
// 当订单数量达到 2 个运力标准时，站点值班人数优先级为：5 > 4 > 3 > 2
// 当订单数量达到 3 个运力标准时，站点值班人数优先级为：4 > 5 > 3
// 当订单数量达到 4 个运力标准时，站点值班人数优先级为：5 > 4
// 当订单数量达到 5 个运力标准时，此时只要站点有 5 人值班，那么就有机会抢单成功
// 当订单数量达到 10 个运力标准时，只有两个站点都有 5 人值班，才能抢单成功。
// 当站点抢单成功后，假设此站点有 m 个人值班，订单需要 n 个（人）运力，那么请输出 m 选 n 的所有跑单组合。

// 输入描述
// 第一行首先输入一个整数 x，表示站点 1 的值班人数，之后输入 x 个正整数，分别代表对应外卖员的工号，输入的数据之间以空格分隔。

// 第二行首先输入一个整数 y，表示站点 2 的值班人数，之后输入 y 个正整数，分别代表对应外卖员的工号，输入的数据之间以空格分隔。

// 第三行输入外卖订单到达的运力标准 n。

// 注意：

// 0 ≤ x,y ≤ 5
// 不会存在重复工号，工号取值 [1, 100]
// 运力标准 n 只会取值 1，2，3，4，5，10
// ————————————————

//                             本文为博主原创文章，未经授权，不得转载搬运。
                        
// 原文链接：https://blog.csdn.net/qfc_128220/article/details/128048132

// 输出描述
// 每个跑单组合输出一行，组合内元素之间以空格分隔。

// 注意：若没有站点符合抢单条件（即没有跑单组合），则输出 null。

// 用例
// 输入	3 1 2 3
// 4 4 5 6 7
// 2
// 输出	4 5
// 4 6
// 4 7
// 5 6
// 5 7
// 6 7
// 说明	
// 订单需要 2 个运力标准，因此站点值班人数优先级为：5 > 4 > 3 > 2。

// 其中站点1，有 3 人值班。站点2，有 4 人值班。

// 因此站点2抢单成功。

// 即从站点 2 的外卖员工号 [4, 5, 6, 7] 中挑选 2 人组合，有如下：

// 4 5

// 4 6

// 4 7

// 5 6

// 5 7

// 6 7


// ————————————————

//                             本文为博主原创文章，未经授权，不得转载搬运。
                        
// 原文链接：https://blog.csdn.net/qfc_128220/article/details/128048132

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const site1 = (await readline()).split(" ").map(Number);
  const x = site1.shift();
 
  const site2 = (await readline()).split(" ").map(Number);
  const y = site2.shift();
 
  const n = parseInt(await readline());
 
  // 记录本题结果
  const res = [];
 
  if (n == 10) {
    if (x == 5 && y == 5) {
      res.push([...site1, ...site2]);
    }
  } else {
    // 配置化，key是运力需求，val是站点值班人数优先级
    const dic = {
      1: [5, 2, 4, 3, 1],
      2: [5, 4, 3, 2],
      3: [4, 5, 3],
      4: [5, 4],
      5: [5],
    };
 
    for (let m of dic[n]) {
      if (x == m || y == m) {
        if (x == m) {
          dfs(site1, n, 0, [], res);
        }
 
        if (y == m) {
          dfs(site2, n, 0, [], res);
        }
 
        break; // 找到最优选择策略了，所以无需继续
      }
    }
  }
 
  if (res.length == 0) {
    console.log("null");
  }
 
  for (let lst of res) {
    console.log(lst.join(" "));
  }
})();
 
// 在site站点选取n个外卖员的组合
function dfs(site, n, index, path, res) {
  // path临时记录组合中元素，当path中元素数量达到level个，则形成一个目标组合
  if (path.length === n) {
    return res.push([...path]);
  }
 
  for (let m = index; m < site.length; m++) {
    path.push(site[m]);
    dfs(site, n, m + 1, path, res);
    path.pop();
  }
}