## keep-alive 组件更新机制总结

### 1. keep-alive 的基本实现
```javascript
export default {
  name: 'keep-alive',
  abstract: true, // 抽象组件
  
  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    
    if (componentOptions) {
      // 生成缓存 key
      const key = vnode.key == null
        ? componentOptions.Ctor.cid + '::' + componentOptions.tag
        : vnode.key
      
      if (cache[key]) {
        // 关键点：将缓存的组件实例赋值给新的 vnode
        vnode.componentInstance = cache[key].componentInstance
      } else {
        cache[key] = vnode
      }
      
      vnode.data.keepAlive = true
    }
    
    return vnode || (slot && slot[0])
  }
}
```

### 2. 组件切换的更新流程
1. 触发更新：
   - `currentComp` 响应式数据变化
   - 父组件重新渲染
   - 生成新的 VNode 树
   - patch 过程中遇到 keep-alive 组件
   - 触发 keep-alive 的 prepatch 钩子

2. keep-alive 的处理：
   - keep-alive 的 render 函数执行
   - 根据组件名/key 在缓存中查找
   - 如果找到缓存：将缓存的组件实例赋值给新的 vnode
   - 新 vnode 虽然是新生成的，但其 componentInstance 是从缓存取的

3. patch 过程：
   - 发现是 keep-alive 的 vnode
   - 直接复用缓存的组件实例
   - 不会重新创建组件实例

### 3. 新旧 vnode 的处理
- 新 vnode 确实是新生成的
- keep-alive 通过缓存机制：
  - 保存了旧的组件实例
  - 将旧实例赋值给新的 vnode
- 实现组件的缓存复用：
  - DOM 结构可能更新
  - 但组件的状态（data、生命周期等）被保留

### 4. 实际效果
以 A/B 组件切换为例：
```javascript
// 1. 初始渲染 A
render() -> 生成 A 的 vnode -> 缓存 A

// 2. 切换到 B
this.currentComp = 'B'
-> 重新 render
-> 生成新的 B 的 vnode
-> A 的实例被缓存

// 3. 切回 A
this.currentComp = 'A'
-> 生成新的 A 的 vnode
-> 从缓存获取 A 的实例
-> 赋值给新 vnode
-> 复用缓存的组件实例
```

这就是为什么被 keep-alive 包裹的组件能够保持状态：
- 组件实例被缓存而不是销毁
- 切换回来时直接复用缓存的实例
- 组件的状态（如计数器、定时器等）得以保持
- 不会重新触发 mounted 等生命周期钩子
``` 