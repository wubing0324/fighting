//  判断是不是二叉搜索树

const helper = (root, lower, upper) => {
  if (!root) {
    return true
  }
  if (root.val <= lower || root.val >= upper) {
    return false
  }
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
}