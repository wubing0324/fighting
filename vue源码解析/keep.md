
```javascript
let A = {
  template: '<div class="a">' +
  '<p>A Comp</p>' +
  '</div>',
  name: 'A'
}

let B = {
  template: '<div class="b">' +
  '<p>B Comp</p>' +
  '</div>',
  name: 'B'
}

let vm = new Vue({
  el: '#app',
  template: '<div>' +
  '<keep-alive>' +
  '<component :is="currentComp">' +
  '</component>' +
  '</keep-alive>' +
  '<button @click="change">switch</button>' +
  '</div>',
  data: {
    currentComp: 'A'
  },
  methods: {
    change() {
      this.currentComp = this.currentComp === 'A' ? 'B' : 'A'
    }
  },
  components: {
    A,
    B
  }
})
```
new Vue解析模板生成的根实例render是下面这样的：
```javascript
(function anonymous() {
  with(this){
    return _c(
      'div',
      [
        _c(
          'keep-alive',
          [_c(currentComp,{tag:"component"})],
          1
        ),
        _c('button',
          {on:{"click":change}},
          [_v("switch")]
        )
      ],
      1
    )
  }
})
```
_update(_render())：其中，执行_c生成vnode的顺序是从内向外的，因为这是传参形式的函数调用，所以生成vnode的顺序为（子元素-兄弟元素-父元素）：
currentComp -> keep-alive -> button -> div

new Vue开始发生的事情为：
initRender -> $mount -> _update(_render()) -> patch -> createElm() -> createChildren -> createComponent(keep-alive) -> return vnode(component:A)，在createComponent(keep-alive)的时候会执行
createComponentInstanceForVnode里面把vnode赋值给了options._parentVnode
initInternalComponent -> 将组件包裹的vnode赋值到_renderChildren 中
```
vnodeComponentOptions = options._parentVnode.componentOptions;
opts._renderChildren = vnodeComponentOptions.children;
```
 -> 
initRender中获取这个值并赋值给vm.$slots，

```vm.$slots = resolveSlots(options._renderChildren, renderContext);```

+ 首次渲染的逻辑：创建keep-alive组件，执行其render，返回slot内容的vnode，并创建对应的dom
>首次渲染不会走patch中的prepatch逻辑，因为第一次不存在patchvnode场景

+ 非首次渲染：每次切换组件，都会重新生成vnode，然后执行patch->patchVnode->prepatch->updateChildComponent()->vm.$slots = resolveSlots(renderChildren, parentVnode.context);vm.$forceUpdate();->keepalive的render

>在keepalive的render中，子组件是已经缓存过的，直接返回缓存命中的vnode，然后执行子组件的渲染逻辑。
子组件的渲染逻辑就是正常组件的渲染逻辑，走了其中非$mount的逻辑，也就是更新内容并插入到父级dom

数据变化keep-alive触发patch->prepatch，keep-alive组件被forceUpdate，执行keepalive的render

https://ustbhuangyi.github.io/vue-analysis/v2/extend/keep-alive.html#%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93


父组件更新生成新的 vnode 树
keep-alive 的 render 函数执行
根据组件名/key 在缓存中查找
如果找到缓存：
将缓存的组件实例赋值给新的 vnode
新 vnode 虽然是新生成的，但其 componentInstance 是从缓存取的
patch 过程中：
发现是 keep-alive 的 vnode
直接复用缓存的组件实例
不会重新创建组件实例
关键点在于：
新 vnode 确实是新生成的
但 keep-alive 通过缓存机制：
保存了旧的组件实例
将旧实例赋值给新的 vnode
这样就实现了组件的缓存复用：
DOM 结构可能更新
但组件的状态（data、生命周期等）被保留
这就是为什么你的例子中：
A 组件的计数器能继续运行
不会重新触发 mounted 等生命周期
组件的状态得以保持