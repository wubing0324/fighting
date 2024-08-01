以下属性或方法在JavaScript中被请求或调用时，会触发浏览器同步计算样式和布局。这也被称为重排或布局颠簸，是常见的性能瓶颈。

通常，所有同步提供布局度量的API都会触发强制重排/布局。请继续阅读以了解更多情况和详细信息。

Element API
获取盒子度量

elem.offsetLeft, elem.offsetTop, elem.offsetWidth, elem.offsetHeight, elem.offsetParent
elem.clientLeft, elem.clientTop, elem.clientWidth, elem.clientHeight
elem.getClientRects(), elem.getBoundingClientRect()
滚动相关

elem.scrollBy(), elem.scrollTo()
elem.scrollIntoView(), elem.scrollIntoViewIfNeeded()
elem.scrollWidth, elem.scrollHeight
elem.scrollLeft, elem.scrollTop 以及设置这些属性
设置焦点

elem.focus() (来源)
其他…

elem.computedRole, elem.computedName
elem.innerText (来源)
获取窗口尺寸
window.scrollX, window.scrollY
window.innerHeight, window.innerWidth
window.visualViewport.height, window.visualViewport.width, window.visualViewport.offsetTop, window.visualViewport.offsetLeft (来源)
document
document.scrollingElement 仅强制样式重算
document.elementFromPoint
表单：设置选择和焦点
inputElem.focus()
inputElem.select(), textareaElem.select()
鼠标事件：读取偏移数据
mouseEvt.layerX, mouseEvt.layerY, mouseEvt.offsetX, mouseEvt.offsetY (来源)
调用 getComputedStyle()
window.getComputedStyle() 通常会强制样式重算。
window.getComputedStyle() 通常也会强制布局重算。
获取 Range 尺寸
range.getClientRects(), range.getBoundingClientRect()

创建新图层的最佳方法是使用 will-change CSS 属性。此方法适用于 Chrome、Opera 和 Firefox，并且值为 transform 时，会创建一个新的合成器层：
```javascript
.moving-element {
  will-change: transform;
}
```
对于不支持 will-change 但受益于图层创建的浏览器（例如 Safari 和 Mobile Safari），您需要（滥用）使用 3D 转换来强制创建新图层：
```javascript
.moving-element {
  transform: translateZ(0);
}
```
但必须注意不要创建太多层，因为每层都需要内存和管理开销。如需了解详情，请参阅坚持仅使用合成器的属性和管理层数部分。

如果您已将元素提升到新层，请使用开发者工具来确认这样做是否提高了性能。请勿在不分析的情况下提升元素。