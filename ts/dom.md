在 TypeScript 中，DOM 元素的类型已经由 内置类型声明（lib.dom.d.ts） 定义好了，我们可以直接使用这些类型，也可以基于它们扩展自定义类型。以下是常见的 DOM 元素类型定义方式：

1. 使用 TypeScript 内置的 DOM 类型
   TypeScript 提供了标准的 DOM 类型，可以直接使用：

(1) 基本 DOM 元素类型

```javascript
const div: HTMLDivElement = document.createElement("div");
const input: HTMLInputElement = document.querySelector("input")!;
const button: HTMLButtonElement = document.getElementById("btn") as HTMLButtonElement;
const anchor: HTMLAnchorElement = document.querySelector("a")!;
const img: HTMLImageElement = document.querySelector("img")!;
```

(2) 通用 HTMLElement
如果不知道具体类型，可以用 HTMLElement：

```javascript
const element: HTMLElement = document.getElementById("my-element")!;
```

(3) 事件类型

```javascript
button.addEventListener("click", (event: MouseEvent) => {
  console.log(event.clientX, event.clientY);
});

input.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement; // 类型断言
  console.log(target.value);
});
```

2. 自定义 DOM 元素的 Props / Attributes
   如果 DOM 元素有自定义属性（如 data-\* 或扩展属性），可以这样定义：

(1) 使用 HTMLElement + 自定义属性

```
interface MyCustomElement extends HTMLElement {
  dataset: {
    userId: string; // 定义 data-user-id
    role?: "admin" | "user"; // 可选 data-role
  };
  customProp: number; // 非标准属性（需运行时赋值）
}

const el = document.getElementById("my-el") as MyCustomElement;
console.log(el.dataset.userId); // 类型安全
```

(2) 使用泛型 + querySelector

```
const el = document.querySelector<HTMLInputElement>("#username")!;
console.log(el.value); // 类型安全
```

3. 定义 React/Vue 中的 DOM 类型
   (1) React 中的 DOM 类型

```
import { InputHTMLAttributes, ButtonHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} />;
};
```

(2) Vue 中的 DOM 类型

```
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);
    return { inputRef };
  },
});
```

4. 扩展浏览器原生 DOM 类型（高级）
   如果浏览器新增了 API 或属性，但 TS 尚未支持，可以扩展 Window 或 HTMLElement：

```
declare global {
  interface Window {
    myCustomAPI: () => void;
  }

  interface HTMLElement {
    fancyHighlight(): void;
  }
}

// 现在可以使用
window.myCustomAPI();
document.querySelector("div")!.fancyHighlight();
```

5. 总结
   场景 推荐类型 示例
   普通 DOM 元素 HTMLDivElement, HTMLInputElement 等 const div: HTMLDivElement = ...
   通用 DOM 元素 HTMLElement, Element const el: HTMLElement = ...
   自定义属性 扩展 HTMLElement interface MyEl extends HTMLElement { ... }
   React/Vue 组件 InputHTMLAttributes, Ref<HTMLInputElement> <input ref={inputRef} />
   DOM 事件 MouseEvent, KeyboardEvent (e: MouseEvent) => ...
   最佳实践：

尽量使用内置 DOM 类型（如 HTMLInputElement），避免 any。

自定义属性用 interface 扩展，而不是直接赋值 any。

React/Vue 组件明确泛型类型，提高类型安全。
