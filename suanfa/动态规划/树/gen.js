class TreeNode {
  constructor(data) {
    this.val = data; //数据域
    this.left = null; //左孩子
    this.right = null; //右孩子
  }
}

let root1 = new TreeNode(1, null, null)
root1.left = new TreeNode(null, null, null)
root1.right = new TreeNode(1, null, null)
let root = new TreeNode(1, null, null)
root.left = new TreeNode(1, null, null)


var isSameTree = function(p, q) {
  if (!p && !q) return true
  if ((!p && q) || (p && !q)) return false
  let arr = []
  const fla = (root) => {
    if (!root) return
    arr.push(root.val)
      fla(root.left)
      fla(root.right)
  }
  fla(q)
  let q1 = arr
  arr = []
  fla(p)
  let p1 = arr
  // if (q1.length !== p1.length) return false
  let result = true
  console.log(q1)
  console.log(p1)
  for (let i = 0; i < q1.length; i++) {
      if (q1[i] != p1[i]) {
          result = false
          break
      }
  }
  return result
};
1，2，3，4，5，6
1，5，3，4，2，6
console.log(isSameTree(root, root1))



const inorder = (root, nums) => {
  if (root === null) {
      return;
  }
  inorder(root.left, nums);
  nums.push(root.val);
  inorder(root.right, nums);
}

const findTwoSwapped = (nums) => {
  const n = nums.length;
  let index1 = -1, index2 = -1;
  for (let i = 0; i < n - 1; ++i) {
      if (nums[i + 1] < nums[i]) {
          index2 = i + 1;
          if (index1 === -1) {
              index1 = i;
          } else {
              break;
          }
      }
  }
  let x = nums[index1], y = nums[index2];
  return [x, y];
}

const recover = (r, count, x, y) => {
  if (r !== null) {
      if (r.val === x || r.val === y) {
          r.val = r.val === x ? y : x;
          if (--count === 0) {
              return;
          }
      }
      recover(r.left, count, x, y);
      recover(r.right, count, x, y);
  }
}

var recoverTree = function(root) {
  const nums = [];
  inorder(root, nums);
  const [first, second] = findTwoSwapped(nums);
  recover(root, 2, first, second); 
};
