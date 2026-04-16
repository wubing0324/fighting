
/* 构建二叉树：分治 */
function dfs(preorder, inorderMap, i, l, r) {
  // 子树区间为空时终止
  if (r - l < 0) return null;
  // 初始化根节点
  const root = new TreeNode(preorder[i]);
  // 查询 m ，从而划分左右子树
  const m = inorderMap.get(preorder[i]);
  // 子问题：构建左子树
  root.left = dfs(preorder, inorderMap, i + 1, l, m - 1);
  // 子问题：构建右子树
  root.right = dfs(preorder, inorderMap, i + 1 + m - l, m + 1, r);
  // 返回根节点
  return root;
}

/* 构建二叉树 */
function buildTree(preorder, inorder) {
  // 初始化哈希表，存储 inorder 元素到索引的映射
  let inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }
  const root = dfs(preorder, inorderMap, 0, 0, inorder.length - 1);
  return root;
}