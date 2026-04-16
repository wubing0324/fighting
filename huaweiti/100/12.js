var minWindow = function (s, t) {
  if (s.length < t.length) return ''
  let total = t.length
  let count = {}
  let all = {}

  for (let i = 0; i < total; i++) {
    count[t[i]] = (count[t[i]] || 0) + 1
  }
  for (let i = 0; i < s.length; i++) {
    all[s[i]] = (all[s[i]] || 0) + 1
  }

  for (let [key, val] of Object.entries(count)) {
    console.log(key, val)
    if (!all[key] || all[key] < val) {
      console.log('meiyou')
      return ""
    }
  }


  let left = 0
  let right = 0
  let start = 0
  let minlen = s.length + 1

  while (right < s.length) {
    let rc = s[right]
    if (count[rc]-- > 0) {
      total--
    }
    while (total == 0) {
      let len = right - left + 1
      if (minlen > len) {
        minlen = len
        start = left
      }
      let lc = s[left]
      if (count[lc]++ == 0) {
        total++
      }
      left++
    }
    right++
  }
  console.log(start, minlen)
};

// let s = "ADOBECODEBANC", t = "ABC"
console.log(minWindow("abc", "Aa"))