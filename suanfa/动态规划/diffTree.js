// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
// 返回满足题意的二叉搜索树的种数。1 <= n <= 19  g(i-1)*g(n-i)

function getCount(num) {
  let g = new Array(num + 1).fill(0)
  let len = g.length
  g[0] = 1
  g[1] = 1
  for (let i = 2; i < len; i++) {
    for (let j = 1;j <= i;j++) {
      g[i] += g[j-1]*g[i-j]
    }
  }
  console.log(g)
}
console.log(getCount(3))