1.基本使用
```javascript
export default {
  data() {
    return {
      user: { name: "Alice", age: 25 },
    };
  },
  render(h) {
    return h('div', [
      // 渲染作用域插槽，并传递数据
      this.$scopedSlots.default?.({
        user: this.user,
        age: this.user.age,
      }),
    ]);
  },
};
```
父组件使用（slot-scope 方式）：
```javascript
<Child>
  <template slot-scope="{ user, age }">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ age }}</p>
  </template>
</Child>
```


2.动态渲染列表（结合 v-for 逻辑）
```javascript
export default {
  data() {
    return {
      items: [
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Orange" },
      ],
    };
  },
  render(h) {
    return h('ul',
      this.items.map(item => 
        h('li', 
          // 调用作用域插槽，并传递当前 item
          this.$scopedSlots.default?.({ item })
        )
      )
    );
  },
};
```
父组件使用：
```javascript
<Child>
  <template slot-scope="{ item }">
    <span style="color: red">{{ item.name }}</span>
  </template>
</Child>
```

3.在 JSX 中使用 $slots 和 $scopedSlots
```javascript
export default {
  data() {
    return {
      user: { name: "Alice" },
    };
  },
  render() {
    return (
      <div>
        {/* 默认插槽 */}
        {this.$slots.default}
        
        {/* 作用域插槽 */}
        {this.$scopedSlots.default?.({ user: this.user })}
        
        {/* 具名插槽 */}
        {this.$slots.footer}
      </div>
    );
  },
};
```

```javascript

```