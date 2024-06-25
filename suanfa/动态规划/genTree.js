class TreeNode {
  constructor(data) {
    this.data = data; //数据域
    this.left = null; //左孩子
    this.right = null; //右孩子
  }
}

// let node2 = new TreeNode(7, null, null)
// let node3 = new TreeNode(8, null, null)
// let node1 = new TreeNode(6, node2, node3)
// node1.left = node2
// node1.right = node3
// console.log(node1)

const createTreeNode = (index, arr) => {
  if (index > arr.length) {
    return null
  }
  if (arr[index] == null) {
    return null
  }
  let node = new TreeNode(arr[index], null, null)
  node.left = createTreeNode(2 * index + 1, arr)
  node.right = createTreeNode(2 * index + 2, arr)
  return node
}
let arr = [1,2,null,3,4,5,6]
let root = createTreeNode(0, arr)
// console.log(root)

// let root = new TreeNode(1, null, null)
// let left = new TreeNode(null, null, null)
// let right = new TreeNode(1, null, null)
// console.log(root)
