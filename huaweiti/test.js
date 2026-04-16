// var arr = [23, 26, 36, 27]
// var target = 78

// var nextPermutation = function (nums, target) {
//   let dp = new Array(nums.length + 1).fill(0).map(() => new Array(target + 1).fill(0))

//   for (let i = 1; i <= nums.length; i++) {
//     let w = nums[i - 1]
//     for (let j = 1; j <= target; j++) {
//       if (w > j) {
//         dp[i][j] = dp[i - 1][j]
//       } else {
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + w)
//       }
//     }
//   }
//   console.log(dp)
// };

// nextPermutation(arr, target)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// var productExceptSelf = function(nums) {
//   let len= nums.length
//   let L = new Array(len).fill(1)
//   let R = new Array(len).fill(1)
//   let anwser = []

//   L[0] = 1
//   for (let i = 1; i < len; i++) {
//       L[i] = L[i-1] * nums[i - 1]
//   }
//   R[len - 1] = 1
//   for (let i = len - 2; i >= 0; i--) {
//       R[i] = R[i + 1] * nums[i + 1]
//   }
//   for (let i = 0; i < len; i++) {
//       anwser[i] = L[i] * R[i]
//   }
//   return anwser
// };

// var convert = function(s, numRows) {
//   let len = s.length
//   let matrix = []
//   for (let i = 0; i < len;  i += numRows) {
//       matrix.push(s.slice(i, i + numRows).split(''))
//       for (let j = 1; j < numRows - 1; j++) {
//           let tmp = new Array(numRows).fill('')
//           tmp[j] = s[i + numRows]
//           matrix.push(tmp.reverse())
//           i += 1
//       }
//   }
//   let path = []
//   for (let j = 0; j < matrix[0].length; j++) {
//       for (let i = 0; i< matrix.length; i++) {
//           path.push(matrix[i][j])
//       }
//   }
//   let result = path.filter(k => k).join('')
//   return result
// };

// var arr = [[1,3], [1,4],[2,5]]
// arr.sort((a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0])
// console.log(arr)

// var insert = function(intervals, newInterval) {
//   let res = []
//   if (intervals.length == 0) return [newInterval]
//   let first = intervals[0], last = intervals.at(-1)

//   if (first[0] > newInterval[1]) {
//       intervals.unshift(newInterval)
//       return intervals
//   }
//   if (last[1] < newInterval[0]) {
//       intervals.push(newInterval)
//       return intervals
//   }
//   for (let i = 0; i < intervals.length; i++) {
//       let [start, end] = intervals[i]
//       if (i > 0 && start > newInterval[1] && intervals[i - 1][1] < newInterval[0]) {
//           intervals.splice(i, 0, newInterval)
//           return intervals
//       }
//       if (start > newInterval[1] || end < newInterval[0]) {
//           res.push([start, end])
//           continue
//       }

//       start = Math.min(start, newInterval[0])
//       end = Math.max(end, newInterval[1])

//       if (res.length > 0) {
//           let top = res.at(-1)
//           if (top[1] >= start) {
//               top[1] = Math.max(top[1], end)
//           } else {
//               res.push([start, end])
//           }
//       } else {
//           res.push([start, end])
//       }
//   }
//   console.log(res)
//   return res
// };

function insert(intervals: number[][], newInterval: number[]): number[][] {
  const merge = (intervals: number[][]): number[][] => {
    intervals.sort((a, b) => a[0] - b[0]);
    const ans: number[][] = [intervals[0]];
    for (let i = 1; i < intervals.length; ++i) {
      if (ans.at(-1)[1] < intervals[i][0]) {
        ans.push(intervals[i]);
      } else {
        ans.at(-1)[1] = Math.max(ans.at(-1)[1], intervals[i][1]);
      }
    }
    return ans;
  };

  intervals.push(newInterval);
  return merge(intervals);
}


// 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// 输出：[[1,2],[3,10],[12,16]]
// 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

var intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
var insert = function (intervals, newInterval) {
  let [newStart, newEnd] = newInterval
  let res = []
  for (let i = 0; i < intervals.length; i++) {
    let [start, end] = intervals[i]
    if (newStart > end) {
      res.push(intervals[i])
    } else if (start > newEnd) {

    }
  }
}

insert(intervals, newInterval)

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let res = []
  if (intervals.length == 0) return [newInterval]
  let first = intervals[0], last = intervals.at(-1)

  if (first[0] > newInterval[1]) {
    intervals.unshift(newInterval)
    return intervals
  }
  if (last[1] < newInterval[0]) {
    intervals.push(newInterval)
    return intervals
  }
  for (let i = 0; i < intervals.length; i++) {
    let [start, end] = intervals[i]
    if (i > 0 && start > newInterval[1] && intervals[i - 1][1] < newInterval[0]) {
      intervals.splice(i, 0, newInterval)
      return intervals
    }
    if (start > newInterval[1] || end < newInterval[0]) {
      res.push([start, end])
      continue
    }

    start = Math.min(start, newInterval[0])
    end = Math.max(end, newInterval[1])

    if (res.length > 0) {
      let top = res.at(-1)
      if (top[1] >= start) {
        top[1] = Math.max(top[1], end)
      } else {
        res.push([start, end])
      }
    } else {
      res.push([start, end])
    }
  }
  console.log(res)
  return res
};