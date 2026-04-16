// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"
// 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

function minWindow(s, t) {
    let count = {}

    for (let i = 0; i < t.length; i++) {
        count[t[i]] = (count[t[i]] || 0) + 1
    }

    let left = 0, right = 0
    let len = t.length
    let minLen = s.length + 1
    let start = 0
    while (right < s.length) {
        let rc = s[right]

        if (count[rc]-- > 0) { // 注意：这里count[c]--必须写在if条件中，因为count[rc]可以是负数，但是len不能是负数
            len--
        }
        while (len == 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1
                start = left
            }
            let lc = s[left]

            if (count[lc]++ == 0) {
                len++
            }
            left++
        }
        right++
    }
    return s.slice(start, start + minLen)
}

console.log(minWindow("ADOBECODEBANC", "ABC"))
console.log(minWindow("a", "aa"))
