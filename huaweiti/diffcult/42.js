// 题目描述
// 为了提升数据传输的效率，会对传输的报文进行压缩处理。

// 输入一个压缩后的报文，请返回它解压后的原始报文。

// 压缩规则：n[str]，表示方括号内部的 str 正好重复 n 次。

// 注意 n 为正整数（0 < n <= 100），str只包含小写英文字母，不考虑异常情况。

// 输入描述
// 输入压缩后的报文：

// 1）不考虑无效的输入，报文没有额外的空格，方括号总是符合格式要求的；

// 2）原始报文不包含数字，所有的数字只表示重复的次数 n ，例如不会出现像 5b 或 3[8] 的输入；

// 输出描述
// 解压后的原始报文

// 注：原始报文长度不会超过1000，不考虑异常的情况

// 示例1
// 输入

// 3[k]2[mn]
// 1
// 输出

// kkkmnmn
// 1
// 说明

// k 重复3次，mn 重复2次，最终得到 kkkmnmn

// 示例2
// 输入

// 3[m2[c]]
// 1
// 输出

// mccmccmcc

var str = '3[m2[c]]'
// var str = '3[k]2[mn]'

function getRes(str) {
  let nums = []
  let num = []
  let stack = []
  let idxs = []
  for (let c of str) {
    if (/[a-z]/.test(c)) {
      stack.push(c)
      console.log(c)
    } else if (/[0-9]/.test(c)) {
      num.push(c)
    } else if (c == '[') {
      idxs.push(stack.length)
      nums.push(Number(num.join('')))
      num = []
    } else if (c == ']') {
      let idx = idxs.pop()
      let ss = stack.splice(idx).join('')
      let n = nums.pop()
      stack.push(new Array(n).fill(ss).join(''))
    }
  }
  console.log(stack)
}
getRes(str)