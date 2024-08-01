```javascript
/** 滚动时触发 */
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  currentScrollLeft = scrollLeft
}
```
为什么不是
```javacript
const scroll = ({ scrollLeft: number }) => {
  currentScrollLeft = scrollLeft
}
```
如果你直接使用 ({ scrollLeft: number })，会导致语法错误，因为这种写法尝试将参数 scrollLeft 声明为 number 类型的同时进行解构，这是不合法的。
参数实际是个对象，只是解构了
##### 等效的非解构写法
为了帮助理解，这里是等效的非解构写法：

```javacript
/** 滚动时触发 */
const scroll = (param: { scrollLeft: number }) => {
  const scrollLeft = param.scrollLeft;
  currentScrollLeft = scrollLeft;
}
```

##### 关于解构

```javascript
interface WheelEvent {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WheelEvent/deltaMode) */
    readonly deltaMode: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WheelEvent/deltaX) */
    readonly deltaX: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WheelEvent/deltaY) */
    readonly deltaY: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WheelEvent/deltaZ) */
    readonly deltaZ: number;
    readonly DOM_DELTA_PIXEL: 0x00;
    readonly DOM_DELTA_LINE: 0x01;
    readonly DOM_DELTA_PAGE: 0x02;
}

const wheelScroll = ({ deltaY }: WheelEvent) => {
  if (/^-/.test(deltaY.toString())) {
    scrollTo("left");
  } else {
    scrollTo("right");
  }
}
```
为什么不会报错
当你在函数参数中使用对象解构并指定类型时，TypeScript 会检查解构出来的属性是否存在于指定的类型中，并且类型是否匹配。它并不会要求必须解构所有的属性。只要解构出来的部分在指定类型中存在，并且类型匹配，TypeScript 就认为这是合法的。
