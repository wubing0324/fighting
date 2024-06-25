<!--
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2023-02-24 14:55:00
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-02-24 15:01:23
 * @FilePath: \biji\vue2\ast.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
定义了一个currentParent全局属性，用于记录当前的父节点定义了一个stack=[]，用于记录当前的父子结点关系
解析开始标签的时候，创建一个ast对象，
```
function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}
element = createASTElement()
stack.push(element);
如果是非自闭和标签，则
currentParent = element，
解析到结束标签，拿出当前节点和他的父节点，建立层级关系
if (currentParent) {
    // 关联元素父子关系,使得每个标签解析的match对象有了父子关系
    currentParent.children.push(element);
    element.parent = currentParent;
  }
```
