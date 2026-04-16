var groupAnagrams = function (strs) {
  let stack = []
  let map = {}

  for (let i = 0; i < strs.length; i++) {
    let c = strs[i]
    let newc = c.split('').sort().join('')
    map[newc] ? map[newc].push(c) : map[newc] = [c]
  }
  for ([k, v] of Object.entries(map)) {
    stack.push(v)
  }
  return stack
};

var arr = ["eat", "tea", "tan", "ate", "nat", "bat"]

groupAnagrams(arr)