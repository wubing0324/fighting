keyof的作用：
keyof 运算符在 TypeScript 中非常有用，可以在很多场景下提高类型安全性和代码的灵活性。主要作用如下：

1.获取对象类型的所有键：将对象类型的所有键生成一个字符串字面量联合类型。
2.与泛型结合使用：使函数、类等更加通用和灵活。
3.限制参数类型：确保某些参数必须是特定对象类型的键，从而提高类型安全性。

```javascript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "Alice", age: 30, address: "123 Main St" };
const name = getProperty(person, "name");  // 类型为 string
const age = getProperty(person, "age");    // 类型为 number
```

typeof的作用：
1.在值中使用，就是判断类型
2.在类型上下文中使用（type）中使用
在类型上下文中，typeof 操作符用于获取变量或属性的类型，以便在声明其他类型时复用已有类型。这在 TypeScript 中非常有用，因为它允许你基于现有变量或对象的类型定义新的类型。
```javascript
let user = {
    name: "Alice",
    age: 30
};

// 使用 typeof 获取 user 的类型
type UserType = typeof user;

function greetUser(user: UserType) {
    console.log(`Hello, ${user.name}. You are ${user.age} years old.`);
}

let newUser: UserType = {
    name: "Bob",
    age: 25
};

greetUser(newUser);

```

typeof和keyof可以配合使用
```javascript
let car = {
  make: "Toyota",
  model: "Camry",
  year: 2021
};
type carType = typeof car

// carType = {
//   make: string,
//   model: string,
//   year: number
// }

type SettingsStore = {
  // 使用映射类型来遍历 layoutSettings 对象的键
  [Key in keyof carType]: string
}
// SettingsStore = {
//   make: string,
//   model: string,
//   year: string,
// }

type SettingsStoreKey = keyof SettingsStore
// SettingsStoreKey: 'make' | 'model' | 'year'


var obj: carType = {
  make: '1',
  model: '1',
  year: 1,
}

var obj1: SettingsStore = {
  make: '1',
  model: '1',
  year: '1',
}

var b: SettingsStoreKey = 'make'
```

```javascript
interface LayoutSettings {
    /** 是否显示 Settings Panel */
    showSettings: boolean
    /** 布局模式 */
    layoutMode: "left" | "top" | "left-top"
    /** 是否显示标签栏 */
    showTagsView: boolean
    /** 是否显示 Logo */
    showLogo: boolean
}
type SettingsStore = {
    // 使用映射类型来遍历 layoutSettings 对象的键
    [Key in keyof LayoutSettings]: string
}

type SettingsStoreKey = keyof SettingsStore
```

上面代码的含义是：创建一个和LayoutSettings一样的对象，但是约束的类型不一样，

```javascript
type SettingsStore = {
    [Key in keyof LayoutSettings]: string
}
```
这是一个使用了 TypeScript 的映射类型（Mapped Types）的类型定义。它会遍历 LayoutSettings 对象的所有键，并为每个键创建一个新的属性。每个属性的值类型是 LayoutSettings 中相应键的类型的引用类型。换句话说，SettingsStore 类型是基于 LayoutSettings 构建的，但它并不是 LayoutSettings 的子类型。
过程如下：

```javascript
interface LayoutSettings {
  theme: string;
  darkMode: boolean;
  fontSize: number;
}

type SettingsStore = {
  [Key in keyof LayoutSettings]: string
}

// 生成=》
type SettingsStore = {
  theme: string;
  darkMode: string;
  fontSize: string;
}

// 而以下代码只是生成了一个键的联合类型
type SettingsStoreKey = keyof LayoutSettings;
```

type和interface的区别
https://github.com/SunshowerC/blog/issues/7