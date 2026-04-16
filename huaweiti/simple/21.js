class Node {
  constructor(val) {
    this.val = val;
    this.left = 0;
    this.right = 0;
    this.mid = 0;
    this.height = undefined
  }
}

class Tree {
  constructor() {
    this.root = null
    this.height = 0
  }

  add(val) {
    const node = new Node(val)
    if (this.root === null) {
      this.root = node
      this.height = 1
    } else {
        cur = this.root

        while (true) {
            node.height = cur.height + 1
            node.height = Math.min(node.height, this.height)

            if (val < cur.val - 500) {
                if (!cur.left) {
                    cur.left = node
                    break
                } else {
                    cur = cur.left
                }
            } else if (val > cur.val + 500) {
                if (!cur.right) {
                    cur.right = node
                    break
                } else {
                    cur = cur.right
                }
            } else {
                if (!cur.mid) {
                    cur.mid = node
                    break
                } else {
                    cur = cur.mid
                }
            }
        }
    }
  }
  
}