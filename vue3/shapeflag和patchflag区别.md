patchFlag 是优化 更新阶段（diff），
shapeFlag 是优化 初始渲染阶段（mount）。

🧱 shapeFlag 是什么？
它是一个整型值，每一位表示 vnode 的一个“形状”信息，定义在源码中 ShapeFlags：

```javascript
export const enum ShapeFlags {
  ELEMENT = 1,                  // 普通 DOM 元素
  FUNCTIONAL_COMPONENT = 1 << 1,// 函数式组件
  STATEFUL_COMPONENT = 1 << 2,  // 有状态组件（默认组件类型）
  TEXT_CHILDREN = 1 << 3,       // 子节点是文本
  ARRAY_CHILDREN = 1 << 4,      // 子节点是数组
  SLOTS_CHILDREN = 1 << 5,      // 子节点是插槽对象
  TELEPORT = 1 << 6,            // Teleport 组件
  SUSPENSE = 1 << 7,            // Suspense 组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // keep-alive 相关
  COMPONENT_KEPT_ALIVE = 1 << 9         // keep-alive 相关
}
```

📦 shapeFlag 的作用
主要体现在两个方面：

✅ 1. 区分 vnode 类型
比如你在 createVNode 的时候传入一个类型参数：

```
createVNode('div')            // shapeFlag |= ELEMENT
createVNode(MyComponent)      // shapeFlag |= STATEFUL_COMPONENT
createVNode(() => 'text')     // shapeFlag |= FUNCTIONAL_COMPONENT
```

Vue 就通过 shapeFlag 知道你这个 vnode 是个 DOM 还是组件，是不是 函数式组件，从而在 mount/render 时候走不同的流程。

✅ 2. 区分 children 类型
你传了什么子节点内容，Vue 也会通过 shapeFlag 记录下来：

```
createVNode('div', null, 'hello')
// shapeFlag |= TEXT_CHILDREN

createVNode('div', null, [h('span')])
// shapeFlag |= ARRAY_CHILDREN

createVNode('Comp', null, { default: () => h('div') })
// shapeFlag |= SLOTS_CHILDREN

```

🧠 举个完整的例子：

```
<MyComponent>
  <template #default>hello</template>
</MyComponent>
```

生成的 vnode 会有这些 shapeFlag：

STATEFUL_COMPONENT（有状态组件）

SLOTS_CHILDREN（子节点是插槽对象）

Vue 内部只要 if (vnode.shapeFlag & SLOTS_CHILDREN) 就知道这个组件有没有插槽了，不用多做判断。

🧮 总结：patchFlag vs shapeFlag 的区别
项目 shapeFlag patchFlag
什么时候生成 创建 vnode 时（runtime） 编译模板时（compile-time）
用来干嘛 判断 vnode 的类型、子节点类型 精确标记 vnode 哪些部分是动态的
性能意义 简化 vnode 解析流程，减少判断 加速 diff 阶段，跳过静态内容
用在哪 mount、update 初期判断 diff、patch 时使用
值结构 位掩码（bitmask） 位掩码（bitmask）
💬 一句话记忆法：
shapeFlag 是用来 识别形状（我是什么东西），
patchFlag 是用来 标记变化（我哪里变了）。
