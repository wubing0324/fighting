const arr = ['c', 'f','a','b','a','a','b']
         // [ 0 , 1 , 2 , 3 , 4 , 5 , 6 ]
        // dp[i+1][j-1]
        //     0 ,   1 ,   2 ,   3 ,   4 ,   5 ,   6

        // 0  true  false false false false false false

        // 1        true  false false false false false

        // 2              true  false false false false

        // 3                    true  false false true

        // 4                          true  true  false

        // 5                                true  false

        // 6                                      true
const str = arr.join('')

function longestPalindrome(s) {
  let len = s.length;
  if (len < 2) {
      return s;
  }

  let maxLen = 1;
  let begin = 0;
  // dp[i][j] 表示 s[i..j] 是否是回文串
  var dp = new Array(len); //表格有10行
  for(var i = 0;i < dp.length; i++){
    dp[i] = new Array(len); //每行有10列
  }
  // 初始化：所有长度为 1 的子串都是回文串
  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
  }

  let charArray = Array.from(s)
  // 递推开始
  // 先枚举子串长度
  for (let j = 1; j <= len; j++) {
    // 枚举左边界，左边界的上限设置可以宽松一些
    for (let i = 0; i < j; i++) {
      if (charArray[i] != charArray[j]) {
          dp[i][j] = false;
      } else {
          if (j - i < 3) {
              dp[i][j] = true;
          } else {
              dp[i][j] = dp[i + 1][j - 1];
          }
        }
        // console.log(i,j, dp[i][j])
      // 只要 dp[i][L] == true 成立，就表示子串 s[i..L] 是回文，此时记录回文长度和起始位置
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        begin = i;
      }
    }
  }
      
  return s.substring(begin, begin + maxLen);
}

console.log(longestPalindrome('bb'))





// let g = []
// let len = arr.length
// for (let j = 0; j < len; j++) {
//   g[j] = 1
// }

// for (let i = 0;i < len; i++) {
//   for(let p = 0; p <= i; p++) {
//     if (i == 0) {
//       g[i] = 1
//       break
//     }
//     if (i == 1) {
//       if (arr[0] == arr[1]) {
//         g[i] = 2
//         break
//       }
//     }
//     if (arr[p] != arr[i + p - 1]) {
//       break
//     }
//     else {
//       g[i] = Math.max(g[p] + 1, g[i])
//     }
//   }
// }
// console.log(g)