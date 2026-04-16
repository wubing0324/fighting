var merge = function (intervals) {
  intervals.sort((a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0])
  let stack = []
  let cur = intervals[0]
  for (let i = 1; i < intervals.length; i++) {
    let [s1, e1] = intervals[i]

    if (cur[1] < s1) {
      stack.push(cur)
      cur = [s1, e1]
    } else {
      cur[1] = Math.max(cur[1], e1)
    }

  }
  stack.push(cur)
  console.log(stack)
  return stack
};
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
merge(intervals)