BFC实际就是页面一个独立的容器，里面的子元素不影响外面的元素

###### margin折叠
1.垂直方向父子元素margin重叠（父级容器BFC解决）

2.垂直方向兄弟元素margin重叠（兄弟容器变为BFC解决）




BFC的概念、属性、用法
衍生：Formatting Context，Inline FC、Flex FC、Grid FC等
核心点：

Formatting Context：页面的一块渲染区域，定义元素的渲染规则
BFC全称为Block Formatting Context，它的特点有
包含所有的float，也就是子元素的float不会溢出
排除外部的float
组织外margin collapsing
如何成为BFC呢？
根元素
浮动元素：float值不为none
position为absolute或者fix
display为inline-block/table-cell/table-caption/flex/grid/flow-root等等
overflow: hidden;