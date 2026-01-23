TypeScript（TS）是 JavaScript 的超集，它在 JS 的基础上增加了 静态类型系统 和 更强大的工具支持，适用于中大型项目或需要更高代码质量的场景。以下是使用 TypeScript 的 核心优势 和 适用场景：

1. 静态类型检查：提前发现错误
   问题：JavaScript 是动态类型，运行时才能发现类型错误（如 undefined 不是函数）。

TS 解决方案：在编译阶段检查类型错误。

```
// JavaScript（运行时才报错）
const num = "123";
num.toFixed(2); // ❌ 运行时 TypeError: num.toFixed is not a function

// TypeScript（编码时直接报错）
const num: string = "123";
num.toFixed(2); // ❌ 编译时报错：Property 'toFixed' does not exist on type 'string'
```

优势：减少线上 bug，提高代码可靠性。

2. 代码可读性与维护性
   类型即文档：通过类型注解，代码的含义一目了然。

```
// JS：难以理解参数和返回值
function fetchData(url, callback) { /* ... */ }

// TS：明确参数和返回类型
function fetchData(url: string, callback: (data: ApiResponse) => void): void { /* ... */ }
```

优势：新人快速上手，团队协作更高效。

3. 智能提示（IDE 支持）
   TS 提供精准的代码补全和提示：

```
interface User {
  id: number;
  name: string;
  age?: number;
}

const user: User = { id: 1, name: "Alice" };
user. // IDE 自动提示：id, name, age
```

4. 重构更安全
   修改代码时，TS 会检查所有受影响的部分：

```
// 修改接口字段名时，所有使用该字段的地方会报错
interface Product {
  productName: string; // 旧字段名：title
}

const product: Product = { productName: "Laptop" };
console.log(product.title); // ❌ 编译时报错：Property 'title' does not exist
```

优势：避免因重构引入隐性 bug。

6. 适用于大型项目
   复杂数据结构的类型管理：

```
type ApiResponse<T> = {
  data: T;
  error?: string;
  status: "success" | "failure";
};

function handleResponse(response: ApiResponse<User[]>) {
  if (response.status === "success") {
    response.data[0].name; // ✅ 类型安全
  }
}
```

7. 生态兼容性
   完美支持现有 JS 库：

通过 .d.ts 类型声明文件（如 @types/react）为 JS 库提供类型支持。

主流框架（React、Vue、Angular）官方支持 TS。
何时应该用 TypeScript？
场景 推荐程度 原因
中大型项目 ⭐⭐⭐⭐⭐ 类型系统降低维护成本
团队协作 ⭐⭐⭐⭐⭐ 类型注解减少沟通成本
库/框架开发 ⭐⭐⭐⭐⭐ 提供类型定义，方便他人使用
小型脚本或原型 ⭐⭐ JS 更快速，TS 可能过度设计
已有大型 JS 项目迁移 ⭐⭐⭐⭐ 渐进式迁移可行
何时可能不需要 TS？
超小型项目或一次性脚本：TS 配置和类型编写可能增加开销。

对类型灵活性要求极高的场景（如快速原型开发）。

总结
使用 TypeScript 的核心价值：
✅ 更早发现错误（编译时 vs 运行时）
✅ 代码更易读、易维护（类型即文档）
✅ 更好的开发体验（智能提示、重构安全）
✅ 适合大型项目（管理复杂数据类型）

如果你的项目需要长期维护或多人协作，TypeScript 几乎是必选；如果是临时脚本，可以直接用 JS。

#### 面试：

##### 为什么要使用 ts?

ts 是 js 的超集，完全兼容

1.静态类型检查和代码修改安全：保持数据类型的一致性，保证按预期的输入输出，保证定义的变量使用的时候不会写错

```
// 修改接口字段名时，所有使用该字段的地方会报错
interface Product {
  productName: string; // 旧字段名：title
}

const product: Product = { productName: "Laptop" };
console.log(product.title); // ❌ 编译时报错：Property 'title' does not exist
```

2.代码的可读性和维护行：好的 ts 定义就像注释一样，描述变量和函数的形状

```javascript
// JS：难以理解参数和返回值
function fetchData(url, callback) {
  /* ... */
}

// TS：明确参数和返回类型
function fetchData(url: string, callback: (data: ApiResponse) => void): void {
  /* ... */
}
```

3.代码提示：

```javascript
interface User {
  id: number;
  name: string;
  age?: number;
}

const user: User = { id: 1, name: "Alice" };
user. // IDE 自动提示：id, name, age
```

```javascript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

4.完美支持现有 JS 库：

通过 .d.ts 类型声明文件（如 @types/react）为 JS 库提供类型支持。

主流框架（React、Vue、Angular）官方支持 TS。vue2 通过安装 types/vue 即可支持

##### ts 相对于 js 有什么优点，ts 有哪些新增加的功能？

TypeScript (TS) 是 JavaScript (JS) 的超集，它在 JS 的基础上增加了 静态类型系统 和 更多面向对象编程特性，同时完全兼容 JS 代码。以下是 TS 相对于 JS 的核心优势和新增加的功能：

1. 类型注解（Type Annotations）
   显式声明变量、函数参数、返回值的类型：

```javascript
let count: number = 1;
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

2. 接口（Interfaces）
   定义对象的结构：

```javascript
interface User {
  id: number;
  name: string;
  age?: number; // 可选属性
}

const user: User = { id: 1, name: "Alice" };
```

3. 类型别名（Type Aliases）
   定义复杂类型的别名：

```javascript
type ID = number | string;
type Callback = (data: string) => void;
```

4. 泛型（Generics）
   编写可复用的类型安全代码：

```javascript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity < number > 42; // 类型为 number
```

5. 枚举（Enums）
   定义一组命名的常量：

```javascript
enum Direction {
  Up = "UP",
  Down = "DOWN",
}

const dir: Direction = Direction.Up;
```

6. 高级类型（Advanced Types）
   联合类型（Union Types）：

```javascript
type Result = "success" | "failure";
```

交叉类型（Intersection Types）：

```javascript
type Admin = User & { permissions: string[] };
```

三、TypeScript vs JavaScript 对比
特性 JavaScript TypeScript
类型系统 动态类型 静态类型（编译时检查）
错误检测 运行时 编译时
面向对象 基础支持 完整支持（接口、泛型、装饰器等）
工具支持 有限 强大的 IDE 智能提示和重构
适用场景 小型脚本、快速原型 中大型项目、长期维护、团队协作

##### 如何全局定义 xxx.d.ts?如何让 \*.d.ts 全局生效？

创建声明文件
在项目中任意位置（如 src/types 或根目录）新建一个 .d.ts 文件，例如：

```javascript
// src/types/global.d.ts
declare const APP_NAME: string; // 声明全局变量
interface CustomWindow extends Window {
  mySDK: any; // 扩展全局 Window 对象
}
```

确保 tsconfig.json 包含该文件
在 include 或 files 字段中添加声明文件的路径：

```javascript
{
  "compilerOptions": {
    // ...
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/types/**/*.d.ts" // 包含你的声明文件
  ]
}
```

##### 接口你一般是怎么使用的？

1.定义对象的结构、对象数组的结构、后端返回数据的结构,或者使用预定义好 interface，例如描述一个 dom 变量或者 vue 实例

##### keyof 关键字怎么用？

```javascript
function fn<T, K extends keyof T>(obj: T, key: K):T[K] {
   return obj[key]
}
```

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

##### ts 中的范型怎么用？

1. 泛型函数（Generic Functions）
   （1）基础用法：返回输入类型的值

```javascript
function identity<T>(arg: T): T {
  return arg;
}

// 自动推断类型
const str = identity("hello"); // str: string
const num = identity(42); // num: number
```

（2）约束泛型类型（extends）:相当于在 T 扩展了 length 属性，没有就会报错

```javascript
function getLength<T extends { length: number }>(obj: T): number {
  return obj.length;
}

getLength("abc");    // ✅ 3（string 有 length）
getLength([1, 2, 3]); // ✅ 3（数组有 length）
getLength(123);       // ❌ 报错：number 没有 length
```

2. 泛型接口（Generic Interfaces）
   （1）通用 API 响应结构

```javascript
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

// 使用
const userResponse: ApiResponse<{ name: string }> = {
  data: { name: "Alice" },
  status: 200,
};
```

（2）键值对映射

```javascript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = {
  key: "age",
  value: 30,
};
```

3. 泛型类（Generic Classes）
   （1）通用容器类

```javascript
class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getValue(): T {
    return this.content;
  }
}

const stringBox = new Box("hello"); // Box<string>
const numberBox = new Box(42);      // Box<number>
```

（2）泛型约束在类中的应用

```javascript
class Logger<T extends { toString(): string }> {
  log(value: T) {
    console.log(value.toString());
  }
}

new Logger().log(123);       // ✅ "123"
new Logger().log({});        // ❌ 报错：对象没有 toString()
```

4. 泛型类型别名（Generic Type Aliases）
   （1）灵活的类型组合

```javascript
type Nullable<T> = T | null;

let username: Nullable<string> = "Alice";
username = null; // ✅ 允许
```

（2）递归泛型类型

```javascript
type Tree<T> = {
  value: T,
  left?: Tree<T>,
  right?: Tree<T>,
};

const tree: Tree<number> = {
  value: 1,
  left: { value: 2 },
  right: { value: 3 },
};
```

5. 泛型与默认类型
   （1）默认泛型参数

```javascript
function fetchData<T = string>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

// 默认推断为 string
fetchData("/api/user").then((data) => data.toUpperCase());

// 显式指定类型
fetchData < { name: string } > "/api/user".then((data) => data.name);
```

（2）接口中的默认类型

```javascript
interface Pagination<T = number> {
  current: T;
  total: T;
}

const page1: Pagination = { current: 1, total: 10 }; // Pagination<number>
const page2: Pagination<string> = { current: "1", total: "10" };
```

6. 泛型工具类型（Utility Types）
   TypeScript 内置了一些泛型工具类型，简化常见操作：

（1）Partial<T>：所有属性变为可选

```javascript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>; // { name?: string; age?: number }
```

（2）Pick<T, K>：选择部分属性

```javascript
type UserName = Pick<User, "name">; // { name: string }
```

（3）Record<K, T>：快速定义键值类型

```javascript
type UserMap = Record<string, User>; // { [key: string]: User }
```

总结
场景 示例
函数参数/返回值 function identity<T>(arg: T): T
接口定义 interface ApiResponse<T> { data: T }
类封装 class Box<T> { private content: T }
类型别名 type Nullable<T> = T | null
默认类型 function fetchData<T = string>(url: string): Promise<T>
工具类型 Partial<T>, Pick<T, K>, Record<K, T>
泛型的核心价值：
✅ 代码复用：一套逻辑适应多种类型。
✅ 类型安全：编译时检查，避免运行时错误。
✅ 智能提示：IDE 能准确推断具体类型。

##### type 和 interface 的区别

语法差异
声明时，interface 后面没有 =
声明时，type 后面没有 =

结构
interface 只能是对象结构，class 可以使用 implements 关键字来应用接口
type 可使任何类型的组合

可合并型
interface 有可合并性，重复定义，会合并
type 不可以合并，重复定义会报错

扩展性
interface 使用 extends 关键字进行扩展
type 使用 & 创建交叉文档类型
推荐使用 interface

```javascript
interface UserType {
  name: string
  age: string
  phone: string
}
// 如果还需要定一个类型 UserInfoType, 以 UserType 类型的 key 作为key，值是 string 类型，要求如果 UserType 类型增加了某个字段，新类型 UserInfoType 也增加。那么只能使用 type 来定义映射类型，如下：
// type UserInfoType = {
//  [P in keyof UserType]: string
// }

// 下面这种写法不对，大错特错，会报错的，不信你试试
interface UserInfoType {
  [P in keyof UserType]: string
}
const userInfo: UserInfoType = {
  name: '张三',
  age: '20',
  phone: '12345678901'
}
console.log(userInfo)

```

因为 interface 不支持直接使用映射类型。如果你非得使用 interface 只能先按照上面的步骤使用 type 定义，然后再用 interface extends 来继承，但是何必多此一举呢

```javascript
interface UserType {
	name: string
	age: string
	phone: string
}

type UserInfoType = {
	[P in keyof UserType]: string
}
// 注意这个 extends 后面的语法，有一个 {}, 可以在里面扩展字段
interface NewUserInfoType extends UserInfoType {}
```

##### never 和 void 的区别

没有返回类型 vs 永远不会发生，二者都常用于声明函数的返回值。

never 表示永远不会发生，通常用于【抛出异常】或者【无限循环】，never 可以赋值给任意类型，但是要给一个 never 类型的变量赋值，只能使用函数返回值的形式。
void 代表没有返回任何类型，常用于函数没有返回值的情况，可以将 void 赋值给变量，但是这个变量只能接受 null 和 undefined 或者 any; 可以给 void 类型初始化赋值为 undefined

##### any 和 unknown 的区别

any 代表不做任何类型检查，类似写 js 代码，任何类型都可以赋值为 any，any 也可以给任何类型赋值.
unknown 代表未知类型， 任意类型都可以赋值为 unknown，但是 unknown 不能赋值给已知类型
答案：any 和 unknown 都代表 TypeScript 中的任何值。

但有一个关键的区别：any 绕过了编译器的类型检查，本质上关闭了 TypeScript 对该变量的好处。

另一方面，unknown 保持类型检查完整，确保在对变量执行操作之前断言或缩小变量的类型。

##### 在什么场景下你会使用自定义类型，它们在 TypeScript 中是如何定义的？

答案：当我们有复杂的结构或重复的模式时，使用 type 关键字或接口定义的自定义类型是有益的。

例如，如果我们经常处理用户数据，我们可以定义一次用户类型或接口，然后在整个代码库中使用它，而不是在函数或类中重复定义用户的形状。

##### TypeScript 中元组与常规数组的区别是什么？

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同，当访问一个已知索引的元素，会得到正确的类型，当访问一个越界的元素，会使用联合类型替代：
答案：TypeScript 中的元组是一个数组，其中元素的类型、顺序和数量已知。例如，[string, number] 元组类型期望第一个元素是字符串，第二个元素是数字。这与常规数组形成对比，常规数组只知道元素的类型，而不知道顺序或计数。

##### 可区分联合类型

可区分联合由以下两部分组成：

一组具有相同字段（判别字段）的类型，且该字段是字面量类型（如 "success"、"error"）。

联合这些类型，通过判别字段的值区分具体类型。

```javascript
type SuccessResponse = {
  status: "success", // 判别字段（字面量类型）
  data: string,
};

type ErrorResponse = {
  status: "error", // 判别字段（字面量类型）
  message: string,
};

type ApiResponse = SuccessResponse | ErrorResponse; // 联合类型

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // ✅ 这里 response 是 SuccessResponse
  } else {
    console.log(response.message); // ✅ 这里 response 是 ErrorResponse
  }
}
```

核心作用：通过共享字段自动缩小联合类型的范围，提升类型安全性。

适用场景：

处理一组结构不同但有关联的类型（如 API 响应、Redux Action）。

需要明确区分多种状态的组件 Props。
避免运行时错误
无需手动类型断言（as），编译器能确保访问的字段一定存在：

```javascript
interface Dog {
  name: string
  breed: string
}

interface Cat {
  name: string
  age: number
}

function isDog(pet: Dog | Cat): pet is Dog {
  return (pet as Dog).breed !== undefined
}
```

优势：

避免运行时错误。

减少手动类型断言。

代码更易读、易维护。
