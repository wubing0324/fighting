每个 block 存储自己的直接动态子节点，所以 dynamicChildren 是线性的，每次 patch 两个节点的时候，dynamicChildren 可以一一比较，然后总体是个递归 patch 的过程
Vue 是怎么做到自动收集的？

```javascript
// openBlock.ts
let currentBlock = null
const blockStack = []

export function openBlock() {
  blockStack.push((currentBlock = []))
}

export function createVNode(type, props, children, patchFlag) {
  const vnode = {
    type, props, children, patchFlag
    ...
  }

  if (currentBlock && patchFlag > 0) {
    currentBlock.push(vnode)
  }

  return vnode
}

export function createBlock(type, props, children) {
  const vnode = createVNode(type, props, children)
  vnode.dynamicChildren = currentBlock
  blockStack.pop()
  currentBlock = blockStack[blockStack.length - 1]
  return vnode
}

```

openBlock() → 初始化当前的 currentBlock

每次 createVNode() 时，如果 patchFlag > 0，自动推入 currentBlock

createBlock() → 把 currentBlock 收集为 dynamicChildren

个完整的例子：

```javascript
<div> <!-- Block 1 -->
  <span>{{ text1 }}</span>        <!-- 动态节点1 -->
  <div> <!-- Block 2 -->
    <span>{{ text2 }}</span>      <!-- 动态节点2 -->
    <div> <!-- Block 3 -->
      <span>{{ text3 }}</span>    <!-- 动态节点3 -->
    </div>
  </div>
</div>
```

更新过程：

```javascript
// Block 1的dynamicChildren
[
  vnode1, // text1的节点
  block2  // 整个第二层div
]

// Block 2的dynamicChildren
[
  vnode2, // text2的节点
  block3  // 整个第三层div
]

// Block 3的dynamicChildren
[
  vnode3  // text3的节点
]

// 更新过程
patch(oldBlock1, newBlock1) {
  // 1. 更新Block 1的动态节点
  patchBlockChildren(oldBlock1.dynamicChildren, newBlock1.dynamicChildren)
  // - 更新text1
  // - 递归更新block2

  patch(oldBlock2, newBlock2) {
    // 2. 更新Block 2的动态节点
    patchBlockChildren(oldBlock2.dynamicChildren, newBlock2.dynamicChildren)
    // - 更新text2
    // - 递归更新block3

    patch(oldBlock3, newBlock3) {
      // 3. 更新Block 3的动态节点
      patchBlockChildren(oldBlock3.dynamicChildren, newBlock3.dynamicChildren)
      // - 更新text3
    }
  }
}
```

优化效果：

```javascript
// 传统diff（需要遍历所有节点）
div
  ├── span (静态)
  ├── span (动态text1) ──────┐
  └── div                    │
      ├── span (静态)        │
      ├── span (动态text2) ──┼── 需要遍历
      └── div               │
          ├── span (静态)    │
          └── span (动态text3)┘

// Block优化（直接定位动态节点）
Block1.dynamicChildren
  ├── span (动态text1) ────┐
  └── Block2              │
      ├── span (动态text2) ─┼── 直接访问
      └── Block3          │
          └── span (动态text3)┘
```

主要优势：
扁平化处理：
每个 Block 的 dynamicChildren 是一个扁平数组
不需要深度遍历，直接对应更新
精确更新：
准确知道哪些节点需要更新
可以跳过所有静态内容
高效对比：
动态节点一一对应
不需要 key 比对和移动
递归可控：
只在必要的 Block 层级进行递归
避免了不必要的树遍历
这种设计让 Vue 3 的更新性能得到了显著提升，特别是在大型应用中，静态内容多、动态节点分散的情况下，优势更为明显
