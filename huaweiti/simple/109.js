// 最长的顺子

// 34题：3 4 5 6 6 7 7 8 9 10

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const cards = (await readline()).split(" ");
  console.log(getResult(cards));
})();
 
function getResult(cards) {
  // 牌大小升序
  cards.sort((a, b) => card2Num(a) - card2Num(b));
 
  // 记录顺子
  let straights = [];
 
  // 遍历输入的牌
  for (let card of cards) {
    let i = 0;
    for (; i < straights.length; i++) {
      if (card2Num(card) - card2Num(straights[i].at(-1)) == 1) {
         // 如果card牌面比顺子最后一张牌面大1，则可以拼接到该顺子尾部
        straights[i].push(card);
        break;
      }
    }
 
    // 如果card无法拼接到已有顺子的尾部, 则重新建立一个顺子, 该顺子以card开头
    if (i == straights.length) {
      straights.push([card]);
    }
  }
 
  // 过滤出符合要求（牌数量>=5）的顺子
  straights = straights.filter((staight) => staight.length >= 5);
 
  if (straights.length == 0) {
    // 如果没有满足出牌规则的顺子，请输出No
    return "No";
  } else {
    return straights.map((staight) => staight.join(" ")).join("\n");
  }
}
 
// 将牌面映射为数字
function card2Num(card) {
  switch (card) {
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    case "2":
      return 16;
    default:
      return parseInt(card);
  }
}

// count每个索引值对应一个牌面值，count元素值就是对应牌面的数量
// 牌面值               3  4  5  6  7  8  9  10 J  Q  K  A     2  B  C
// 索引值               3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
// int[] count = {0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 1, 1};

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  const my = (await readline()).split("-");
  const used = (await readline()).split("-");
 
  // count每个索引值对应一个牌面值，count元素值就是对应牌面的数量
  // 牌面值               3  4  5  6  7  8  9  10 J  Q  K  A     2  B  C
  // 索引值               3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
  const count = [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 1, 1];
 
  // 总牌数 减去 自己手中牌数
  for (let k of my) {
    count[mapToV(k)] -= 1;
  }
 
  // 总牌数 减去 已打出去的牌数
  for (let k of used) {
    count[mapToV(k)] -= 1;
  }
 
  let maxLen = 0; // 最长连续牌的长度
  let maxL = -1; // 最长连续牌的起始位置
 
  // 顺子范围是 3~A, 对应索引范围是 3 ~ 14
  let l = 3;
  let r = 3;
 
  // 这里r探索到15，是因为15不是顺子有效范围，因此count[15]必然为0，可以作为收尾哨兵
  while (r <= 15) {
    if (count[r] > 0) {
      // 如果对应牌数量>0，则可以维持连续
      r++;
    } else {
      // 否则连续性打断，此时 [l, r) 左闭右开区间是连续牌
      // 注意这里是>=而不是>，因为题目说如果遇到长度相同的顺子，则取较大牌面的。而后出现的顺子肯定牌面更大，因此后出现的相同的顺子更大。
      if (r - l >= maxLen) {
        maxLen = r - l; // 记录更长的连续牌
        maxL = l;
      }
      l = ++r; // l,r 移动到 r+1 位置
    }
  }
 
  if (maxLen < 5) {
    // 如果最长连续牌长度不足5，那么就没有顺子
    console.log("NO-CHAIN");
  } else {
    // 否则就有最长顺子
    const cards = [];
    for (let i = 0; i < maxLen; i++) {
      cards.push(mapToK(maxL + i));
    }
    console.log(cards.join("-"));
  }
})();
 
// 牌面值 映射为 count列表索引值
function mapToV(key) {
  switch (key) {
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    case "2":
      return 16;
    case "B":
      return 17;
    case "C":
      return 18;
    default:
      return parseInt(key);
  }
}
 
// count列表索引值 隐射为 牌面值
function mapToK(val) {
  switch (val) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
    case 16:
      return "2";
    case 17:
      return "B";
    case 18:
      return "C";
    default:
      return val + "";
  }
}