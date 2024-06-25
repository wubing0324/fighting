/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-14 09:49:35
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-14 11:07:11
 * @FilePath: \动态规划\zixulie.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
s = "abc", 
t = "ahbgdc"

// function gen(s, t){
//   var i = 0,j = 0;
//   while (i < s.length && j < t.length) {
//     if (s[i] == s[j]) {
//       i++
//     }
//     j++
//   }
//   return i == s.length
// }

// console.log(gen(s, t))

function gen(s, t) {
  var m = t.length
  var n = s.length
  var ret = Array.from(Array(m+1)).map(() => Array(26).fill(0))
  for (let i = 0; i < 26; i++) {
    ret[m][i] = m;
  }
  for (let i = m - 1; i >= 0; i--) {
    for (let j = 0; j < 26; j++) {
      if (t.charAt(i) == j + 'a') {
        ret[i][j] = i;
      } else {
        ret[i][j] = ret[i + 1][j];
      }
    }
  }
  var add = 0;
  for (let i = 0; i < n; i++) {
      if (ret[add][s[i] - 'a'] == m) {
          return false;
      }
      add = ret[add][s[i] - 'a'] + 1;
  }
  console.log(ret)
  return true;
}

gen(s, t)
