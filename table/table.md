##### 总结

有两种方式来实现table，从用法上来区分：
1.在模板中定义渲染格式
```javascript
<my-table :data="tableData" style="width: 100%">
      <my-table-column prop="name" label="姓名"></my-table-column>
      <my-table-column prop="date" label="日期"></my-table-column>
      <my-table-column prop="address" label="地址"></my-table-column>
      <my-table-column prop="opreation" label="操作">
        <span slot-scope="scope">{{ scope.row.name }}</span>
      </my-table-column>
</my-table>
```
2.在render中定义渲染格式
```javascript
<table-list :columns="columns" :data="tableData" style="width: 100%"></table-list>
```

>方式一要用到slotScope来解析自定义模板为vnode生成render
方式二直接执行columns中传入的render，需要通过函数式组件来执行自定义render


原理是一样的，定义表头数据、表数据，遍历表数据是每一行，在每一行遍历表头的key，渲染每一个cell的字段，element-ui用自己的store来存储表头数据，
表头数据是通过table-column来定义的，解析每一个table-column组件，把prop和渲染表格数据的slotscope方法存储到store，再遍历表数据的时候用这里存储的rendercell方法来渲染cell数据。
渲染table-column生成的slotscope方法实际是和table组件对应的，这里只是生成，而执行slotscope.default(data)的上下文是table,
相当于这样：

```javascript
<my-table :data="tableData" style="width: 100%">
    <span slot-scope="scope">{{ scope.row.name }}</span>
</my-table>
```


-----------------------------
##### template的方式实现table组件
###### 1.用法
```javascript
// 用法
<my-table :data="tableData" style="width: 100%">
      <my-table-column prop="name" label="姓名"></my-table-column>
      <my-table-column prop="date" label="日期"></my-table-column>
      <my-table-column prop="address" label="地址"></my-table-column>
      <my-table-column prop="opreation" label="操作">
        <span slot-scope="scope">{{ scope.row.name }}</span>
      </my-table-column>
</my-table>
```

###### 2.实现

```javascript
// table-column.js
<script>
import { store } from "./index";
export default {
  props: ["prop", "label"],
  created() {
    // 设置表头信息
    let item = {
      prop: this.prop,
      label: this.label,
    };
    item.renderCell = (data) => {
      let children = null;
      // 表头是否有默认插槽内容
      if (this.$scopedSlots.default) {
        // 含有内容，使用作用域插槽的方式，将每一行的数据传到外面
        // 等效于<slot :row="data.row"></slot>
        children = this.$scopedSlots.default(data);
      } else {
        // 根据表头的属性，数组某一项的键对应的值
        const { row, column } = data;
        children = row[column.prop];
      }
      return <div>{children}</div>;
    };
    store.columns.push(item);
  },
  render(h) {
    return h("div", this.$slots.default);
    // return <td>12</td>;
  },
};
</script>
```

```javascript
// store.js
import Vue from 'vue'
// 非常粗暴的用一个vue实例，存储表头信息在全局中
const data = {
  columns: [],
}
const store = new Vue({
  data: data
})
export {
  store
}
```

```javascript
// table.js
<script>
import { store } from "./index";
export default {
  props: {
    // 传入的数据源
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  created() {
    store.columns.length = 0;
  },
  render() {
    // 使用jsx语法
    return (
      <div>
        {/* my-table-column默认插槽的内容，默认隐藏掉不显示 */}
        <div style={{ display: "none" }}>{this.$slots.default}</div>
        <table cellspacing="0" cellpadding="0">
          {/* 表头的渲染,遍历存储表头的数组渲染 */}
          <thead>
            <tr>
              {store.columns.map((item) => (
                <th>{item.label}</th>
              ))}
            </tr>
          </thead>
          {/* 表格内容渲染,
              1.首选遍历传入的data数据源,
              2.再根据表头中存储的方法，渲染每一个td的内容
              3.如果表头中插槽有定义，就渲染插槽的内容
          */}
          <tbody>
            {this.data.map((item) => {
              return (
                <tr>
                  {store.columns.map((column) => {
                    const columnData = { ...column };
                    const data = {
                      column: columnData,
                      row: item,
                    };
                    return <td>{column.renderCell(data)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};
</script>
```
