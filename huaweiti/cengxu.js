// var rightSideView = function(root) {
//   let queue = [root]

//   let res = []

//   while(queue.length > 0) {
//     let len = queue.length
//     let level = []
//     res.push(level)
//     for (let i = 0; i < len; i++) {
//       let node = queue.shift()
//       level.push(node.val)
//       queue.push(node.left)
//       queue.push(node.right)
//     }
//   }
//   console.log(res)
// }

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var getMinimumDifference = function(root) {
//   let ans = Infinity
//   let pre = -1
//   const tree = (root) => {
//       if (!root) return
//       tree(root.left)
//       if (pre === -1) {
//           pre = root.val
//       } else {
//           ans = Math.min(ans, Math.abs(root.val - pre))
//           pre = root.val
//       }
//       tree(root.right)
//   }
//   tree(root)
//   return ans
// };

// var isValidBST = function(root) {
//   const dfs = (root, lower, upper) => {
//       if (root == null) return true
//       if (root.val <= lower || root.val >= upper) return false
//       return dfs(root.left, lower, root.val) && dfs(root.right, root.val, upper)
//   }
//   return dfs(root, -Infinity, Infinity)
// };

// 输入：grid = [
//   ['1','1','0','0','0'],
//   ['1','1','0','0','0'],
//   ['0','0','1','0','0'],
//   ['0','0','0','1','1']
// ]
// 输出：3

// function inArea(x, y, rows, cols) {
//   if (x >= 0 && x < rows && y >= 0 && y < cols) {
//     return true
//   }
//   return false
// }

// function dfs(x, y, rows, cols) {
//   let offsets = [
//     [-1, 0], [0, 1], [1, 0], [0, -1]
//   ]
//   if (!inArea(i, j, rows, cols)) return 0
//   if (grid[i][j] != 1) {
//     return 0
//   }
//   grid[i][j] = 2
//   return dfs(i + offsets[0][0], j + offsets[0][1]) + dfs(i + offsets[1][0], j + offsets[1][1]) + dfs(i + offsets[2][0], j + offsets[2][1]) + dfs(i + offsets[3][0], j + offsets[3][1])
// }

// var numIslands = function (grid) {
//   let rows = grid.length
//   let cols = grid[0].length
//   let res = 0

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (grid[i][j] == 1) {
//         dfs(i, j, rows, cols)
//         res += 1
//       }
//     }
//   }
//   return res
// }

const binary = () => {
  const dfs = (left, right) => {
    let mid = (left + right) >> 1
    let root = new TreeNode(nums[mid])
    let left = dfs(left, mid - 1)
    let right = dfs(mid + 1, right)
    root.left = left
    root.right = right
    return root
  }
}

var insertionSortList = function (head) {
  if (head === null) {
    return head;
  }
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let lastSorted = head, curr = head.next;
  while (curr !== null) {
    if (lastSorted.val <= curr.val) {
      lastSorted = lastSorted.next;
    } else {
      let prev = dummyHead;
      while (prev.next.val <= curr.val) {
        prev = prev.next;
      }
      lastSorted.next = curr.next;
      curr.next = prev.next;
      prev.next = curr;
    }
    curr = lastSorted.next;
  }
  return dummyHead.next;
};


const merge = (head1, head2) => {
  const dummyHead = new ListNode(0);
  let temp = dummyHead, temp1 = head1, temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
    if (temp1.val <= temp2.val) {
      temp.next = temp1;
      temp1 = temp1.next;
    } else {
      temp.next = temp2;
      temp2 = temp2.next;
    }
    temp = temp.next;
  }
  if (temp1 !== null) {
    temp.next = temp1;
  } else if (temp2 !== null) {
    temp.next = temp2;
  }
  return dummyHead.next;
}

const toSortList = (head, tail) => {
  if (head === null) {
    return head;
  }
  if (head.next === tail) {
    head.next = null;
    return head;
  }
  let slow = head, fast = head;
  while (fast !== tail) {
    slow = slow.next;
    fast = fast.next;
    if (fast !== tail) {
      fast = fast.next;
    }
  }
  const mid = slow;
  return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function (head) {
  return toSortList(head, null);
};
var insertionSortList = function (head) {
  if (head === null) {
    return head;
  }
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let lastSorted = head, curr = head.next;
  while (curr !== null) {
    if (lastSorted.val <= curr.val) {
      lastSorted = lastSorted.next;
    } else {
      let prev = dummyHead;
      while (prev.next.val <= curr.val) {
        prev = prev.next;
      }
      lastSorted.next = curr.next;
      curr.next = prev.next;
      prev.next = curr;
    }
    curr = lastSorted.next;
  }
  return dummyHead.next;
};

function merge(head1, head2) {
}
function toSortList(head, tail) {
  if (head == null) return head
  if (head == tail) {
    head.next = null
    return head
  }

  let slow = head, fast = head

  while (fast !== tail) {
    slow = slow.next
    fast = fast.next
    if (fast !== tail) {

    }
  }
}

var sortList = (head) => {
  return toSortList(head, null)
}











const merge = (head1, head2) => {
  let dummyHead = new ListNode(0)
  let temp = dummyHead.next, temp1 = head1, temp2 = head2

  while (temp1 !== null && temp2 !== null) {
    if (temp1.val <= temp2.val) {
      temp.val = temp1.val
      temp1 = temp.next
    } else {
      temp.val = temp2.val
      temp2 = temp2.next
    }
    temp = temp.next
  }
  if (temp1 !== null) {
    temp = temp1
  }
  if (temp2 !== null) {
    temp = temp2
  }
  return dummyHead.next
}


const toSortList = (head, tail) => {
  if (head == null) {
    return
  }
  if (head.next == tail) {
    head.next = null
    return head
  }

  let slow = head, fast = head
  while (head !== tail) {
    slow = slow.next
    fast = fast.next
    if (fast.next !== tail) {
      fast = fast.next
    }
  }
  let mid = slow

  return merge(toSortList(head, mid), toSortList(mid, tail))
}

const sortList = (head) => {
  return toSortList()
}

