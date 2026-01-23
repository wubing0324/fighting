keyof 的作用：
keyof 运算符在 TypeScript 中非常有用，可以在很多场景下提高类型安全性和代码的灵活性。主要作用如下：

1.获取对象类型的所有键：将对象类型的所有键生成一个字符串字面量联合类型。 2.与泛型结合使用：使函数、类等更加通用和灵活。 3.限制参数类型：确保某些参数必须是特定对象类型的键，从而提高类型安全性。

```javascript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "Alice", age: 30, address: "123 Main St" };
const name = getProperty(person, "name");  // 类型为 string
const age = getProperty(person, "age");    // 类型为 number
```

typeof 的作用： 1.在值中使用，就是判断类型 2.在类型上下文中使用（type）中使用
在类型上下文中，typeof 操作符用于获取变量或属性的类型，以便在声明其他类型时复用已有类型。这在 TypeScript 中非常有用，因为它允许你基于现有变量或对象的类型定义新的类型。

> 用现有数据创建类型，可以用于定义接口返回的对象

```javascript
let user = {
  name: "Alice",
  age: 30,
};

// 使用 typeof 获取 user 的类型
type UserType = typeof user;

function greetUser(user: UserType) {
  console.log(`Hello, ${user.name}. You are ${user.age} years old.`);
}

let newUser: UserType = {
  name: "Bob",
  age: 25,
};

greetUser(newUser);
```

> 但是，在某些情况下，你可能只关心对象中的某些关键属性，而不需要对整个对象进行严格的类型定义。这时，你可以显式地定义关键属性，并使用索引签名来处理其他属性。这样可以保证你关心的关键属性类型正确，同时允许对象包含其他属性。

```javascript
interface PartialResponseType {
  id: number;
  name: string;
  [propName: string]: any;
}

const response: PartialResponseType = {
  id: 1,
  name: "Alice",
  age: 30, // 其他属性可以是任意类型
  address: "123 Main St",
};

const anotherResponse: PartialResponseType = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
};
```

typeof 和 keyof 可以配合使用

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

上面代码的含义是：创建一个和 LayoutSettings 一样的对象，但是约束的类型不一样，

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

type 和 interface 的区别
https://github.com/SunshowerC/blog/issues/7

##### InstanceType

当你有一个构造函数类型，并且你想要获取这个构造函数创建的实例的类型时，可以使用 InstanceType。

假设我们有一个类 Person，我们想要获取它的实例类型：

```javascript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 使用 InstanceType 获取 Person 的实例类型
type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person("Alice");
console.log(person.name); // 输出: Alice
```

> type PersonInstance = typeof Person,这么些是不对的，typeof Person 获取的是构造函数的类型，

```javascript
// 使用 typeof 获取构造函数的类型
type PersonConstructorType = typeof Person;

// 直接使用 typeof 不能获取实例的类型，只能获取构造函数的类型
const anotherPerson: PersonConstructorType = Person; // 这是正确的
// const invalidPerson: PersonConstructorType = new Person("Bob"); // 这是错误的
```

##### 为什么需要 InstanceType

使用 InstanceType 的主要原因是：

1. 类型推断：在某些情况下，我们可能只知道构造函数的类型，但需要推断出实例类型。这时，InstanceType 就派上了用场。
2. 类型安全：通过显式地使用 InstanceType，我们可以确保类型定义和实例类型一致，避免类型错误。
   总结来说，typeof 用于获取构造函数类型，而 InstanceType 用于从构造函数类型中获取实例类型。两者结合使用可以更好地进行类型推断和确保类型安全。

##### ReturnType

ReturnType 是 TypeScript 的一个内置工具类型，用于获取函数类型的返回值类型。它在类型推断和确保类型安全方面非常有用。

```javascript
function getUser() {
  return {
    id: 1,
    name: "Alice",
    age: 30,
  };
}

// 使用 ReturnType 获取 getUser 函数的返回值类型
type UserType = ReturnType<typeof getUser>;

const user: UserType = {
  id: 2,
  name: "Bob",
  age: 25,
};

console.log(user); // 输出: { id: 2, name: "Bob", age: 25 }
```

```javascript
// pinia定义store类型，modules[key].default报错类型“unknown”上不存在属性“default”
import { defineStore } from "pinia";
import yearInfo from "./yearInfo";
type ModuleType = {
  //interface、type都可以
  default: ReturnType<typeof defineStore>, // 表示每个模块的 default 是一个 Pinia store
};
// interface ModuleType {
//   default: ReturnType<typeof defineStore> // 表示每个模块的 default 是一个 Pinia store
// }

const modules = import.meta.glob < ModuleType > ("./*.ts", { eager: true }); // 使用泛型指定模块类型
const stores: ReturnType<typeof defineStore>[] = []; // 存储所有 store
console.log(modules);

Object.keys(modules).forEach((key) => {
  stores.push(modules[key].default);
});
export default defineStore("app", {
  state() {
    return {
      yearInfo: yearInfo(),
    };
  },
});
// 这个错误是因为 TypeScript 无法自动推断 modules[key] 的类型，所以默认是 unknown，而 unknown 类型不能直接访问 .default 属性。我们需要 明确告诉 TypeScript modules[key] 的类型。

// interface vs type 的选择
// 特性	interface	type
// 扩展性	可通过 extends 继承	可通过 & 交叉类型合并
// 合并声明	支持同名接口自动合并	不支持同名类型合并
// 适用场景	更适合对象结构（如 React Props）	更灵活（可定义联合类型、元组等）
// 类型运算	不能直接用于联合类型、条件类型等	支持所有高级类型运算
// 推荐选择
// 优先用 interface

// 如果只是描述一个对象的形状（比如这里的 ModuleType），interface 更符合语义。

// 如果需要扩展（例如 extends），interface 更直观。

// 用 type 的情况

// 需要定义联合类型（如 type = A | B）、元组或复杂类型运算时。
```

```javascript
interface DataItem {
  readonly id: string;
  [propName: string]: string;
}

interface Columns {
  dataKey: string;
  key: string;
  title: string;
  width?: number;
  [propName: string]: string | number;
}

const generateColumns = (length = 10, prefix = "column-", props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150
  }));
const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = "row-"
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 1000);

const exportExcel = (): void => {
  const res: string[][] = data.map((item: DataItem) => {
    const arr = [];
    columns.forEach((column: Columns) => {
      arr.push(item[column.dataKey]);
    });
    return arr;
  });
  const titleList: string[] = [];
  columns.forEach((column: Columns) => {
    titleList.push(column.title);
  });
  res.unshift(titleList);
  const workSheet = utils.aoa_to_sheet(res);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, "数据报表");
  writeFile(workBook, "tableV2.xlsx");
};
```

注意事项
ReturnType 只能用于获取函数类型的返回值类型，如果你传递的类型不是函数类型，则会产生编译错误。
ReturnType 对于复杂的函数返回类型（如嵌套对象或泛型）仍然适用，可以正确推断出返回类型。
