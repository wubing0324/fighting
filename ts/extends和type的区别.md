# TypeScript 中 interface 和 type 的区别

## 1. 核心区别

| 特性     | interface                         | type                                     |
| :------- | :-------------------------------- | :--------------------------------------- |
| 扩展性   | 可通过 extends 或 implements 扩展 | 通过 &（交叉类型）合并                   |
| 声明合并 | ✅ 支持（同名接口自动合并）       | ❌ 不支持                                |
| 适用场景 | 对象结构、类实现、继承体系        | 复杂类型（联合、交叉、元组、工具类型等） |
| 可读性   | 更适合面向对象编程（OOP）         | 更适合函数式编程（FP）或复杂类型操作     |
| 性能     | 大型项目中稍优（类型检查更快）    | 复杂类型可能稍慢                         |

## 2. 语法对比

### （1）定义对象形状

```
// interface
interface User {
  name: string;
  age: number;
}

// type
type User = {
  name: string;
  age: number;
};
```

此时功能几乎相同，但后续扩展方式不同。

### （2）扩展方式

```
// interface 扩展
interface Admin extends User {
  permissions: string[];
}

// type 扩展
type Admin = User & { permissions: string[] };
```

### （3）声明合并（仅 interface）

```
interface User { name: string; }
interface User { age: number; }
// 自动合并为 { name: string; age: number; }
```

3. 何时用 interface？
   （1）定义对象结构（尤其是类实现）

```
interface Animal {
  name: string;
  eat(): void;
}

class Dog implements Animal {
  name = "Buddy";
  eat() { console.log("Eating..."); }
}
```

（2）需要声明合并时

```
// 第三方库类型扩展
interface Window {
  myCustomAPI: () => void;
}
```

（3）面向对象编程（OOP）

```
interface Shape {
  draw(): void;
}

interface Circle extends Shape {
  radius: number;
}
```

4. 何时用 type？
   （1）定义联合类型

```
type Status = "success" | "error" | "pending";
```

（2）定义交叉类型

```
type Admin = User & { permissions: string[] };
```

（3）定义元组或复杂类型

```
type Point = [number, number];
type Callback<T> = (data: T) => void;
```

（4）使用工具类型

```
type PartialUser = Partial<User>;
type PickUser = Pick<User, "name">;
```

5. 实际场景推荐
   优先用 interface 的情况
   定义对象的形状（尤其是类或 React 组件的 props）。

需要被 implements 或 extends 时。

扩展第三方库类型（通过声明合并）。

优先用 type 的情况
需要联合类型、交叉类型或映射类型时。

定义函数类型或元组。

需要复用复杂类型逻辑时。

6.遍历方式：
联合类型：
[k in T]
接口：
[key in keyof T]

判断一个成员是否在类型中：
在 JS 中，我们通过判断 key 在 todo 中，才进行赋值操作。

而在 TS 类型中，我们可以把这种手段理解为约束。

在这道题里，我们就需要给第二个泛型参数加上约束：它们的 key 必须存在于 T 中。

我们自然而然就想到了 extends：

```javascript
type MyPick<T, K extends T> = {

}
```

然而这样写会报错，因为 T 是一个接口，而 K 是一个联合类型，我们其实只想要接口中的键组成的联合类型，所以应该再加上 keyof 关键字：

```javascript
type MyPick<T, K extends keyof T> = {

}
```

7. 注意事项
   不要混用：项目中应统一风格，避免同时大量混用 interface 和 type。

性能差异：超大型项目中，interface 的类型检查可能略快于复杂 type。

类型别名不能 implements：类只能实现 interface，不能直接实现 type。

总结
场景 推荐 原因
定义对象结构（尤其是类） interface 更符合 OOP 设计，支持 extends/implements
需要声明合并 interface 唯一支持合并的特性
联合类型、交叉类型、工具类型 type 语法更简洁直观
函数类型或元组 type 直接支持，无需额外语法
简单记忆：

interface → "是什么"（描述对象结构、类的关系）。

type → "是什么或怎么组合"（灵活的类型操作）。
