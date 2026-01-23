elementui tabs 组件的与原理：
用法：

```javascript
<el-tabs v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
</el-tabs>
```

el-tabs.vue:通过 this.$slots.default 拿到上面 4 个的 vnode，核心就是在这里拿到 vnode，然后生成 tab 按钮和下面的内容

```javascript
{
  default: [VNode, VNode, VNode, VNode] // 四个 el-tab-pane 的 VNode
}
```

```javascript
const header = (
  <div class={["el-tabs__header", `is-${tabPosition}`]}>
    {newButton}
    <tab-nav {...navData}></tab-nav>//然后拿到里面每一个的instance实例，渲染
  </div>
);
const panels = (
  <div class="el-tabs__content">
    //active高亮哪个渲染，其他隐藏
    {this.$slots.default}
  </div>
);

return (
  <div
    class={{
      "el-tabs": true,
      "el-tabs--card": type === "card",
      [`el-tabs--${tabPosition}`]: true,
      "el-tabs--border-card": type === "border-card",
    }}
  >
    {tabPosition !== "bottom" ? [header, panels] : [panels, header]}
  </div>
);
```
