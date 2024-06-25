/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-11-03 19:28:18
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-11-07 09:40:58
 * @FilePath: \动态规划\jiema.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var isInterleave = function(s1, s2, s3) {
    function getnext(s1,s2,s3) {
        if ((s1 + s2) == s3) return true
        let m = s1.length
        let n = s2.length
        let len = s3.length
        if ((m+n) != len) return false
        var i=0,j=0,l=0
        while(i < m && j < n) {
        if (s1[i] != s3[l] && s2[j] != s3[l]) return false
        if (s1[i] == s3[l] && s2[j] == s3[l]) {
            return getnext(s1.slice(i+1), s2.slice(j), s3.slice(l+1)) || getnext(s2.slice(j+1), s1.slice(i), s3.slice(l+1))
        }
        if(s1[i] == s3[l]) {
            i++
            l++
        }
        if(s2[j] == s3[l]) {
            j++
            l++
        }
        }
        return l == len
    }
    return getnext(s1,s2,s3) || getnext(s2,s1,s3)
};
console.log(isInterleave("2101"))