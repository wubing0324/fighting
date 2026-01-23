在 TypeScript 中，是否显式定义类型取决于多个因素，包括代码的可维护性、团队规范、项目规模以及个人偏好。以下是具体的使用场景和建议：

1. 应该显式使用 TypeScript 类型的场景

(1) 公共 API（函数参数、返回值、导出的变量/类）
✅ 显式定义类型，让调用者清晰了解输入和输出的结构。

```javascript
// 显式定义参数和返回值类型
function getUser(id: number): { name: string, age: number } | null {
  // ...
}
```

(2) 复杂数据结构（嵌套对象、联合类型、泛型等）
✅ 显式定义类型，避免隐式 any 导致类型不安全。

```javascript
type User = {
  id: number,
  name: string,
  address?: { city: string, country: string }, // 可选嵌套对象
};

const user: User = { id: 1, name: "Alice" };
```

(3) 团队协作项目
✅ 显式定义类型，提高代码可读性和可维护性，减少沟通成本。

(4) 需要严格类型检查的场景
✅ 显式定义类型，避免运行时错误。

```javascript
interface Config {
  apiUrl: string;
  timeout: number;
}

function initApp(config: Config) {
  // TS 会检查 config 是否符合结构
}
```

2. 可以省略 TypeScript 类型的场景

(1) 简单变量（类型可以自动推断）
❌ 可以省略类型，TS 会自动推断。

```javascript
const name = "Alice"; // TS 推断为 string
const age = 25; // TS 推断为 number
const isActive = true; // TS 推断为 boolean
```

(2) 简单的函数返回值（TS 能正确推断）
❌ 可以省略返回值类型（除非团队规范要求）。

```javascript
function add(a: number, b: number) {
  return a + b; // TS 推断返回值是 number
}
```

(3) 临时变量或局部作用域变量
❌ 可以省略类型，如果类型显而易见。

```javascript
function processUser(user: User) {
  const { id, name } = user; // TS 知道 id: number, name: string
  // ...
}
```

(4) 测试代码或快速原型开发
❌ 可以省略类型，快速迭代，后续再补充。

3. 最佳实践总结
   场景 是否推荐显式类型 示例
   公共函数/方法 ✅ 推荐 function getUser(id: number): User | null
   复杂对象/接口 ✅ 推荐 interface User { name: string; age: number }
   变量（简单类型，可推断） ❌ 可省略 const count = 10（自动推断 number）
   临时变量/局部作用域 ❌ 可省略 const { id } = user（解构已知类型）
   测试代码/快速原型 ❌ 可省略 快速开发时可不写，后续补充

4. 团队规范建议

严格模式（推荐）：tsconfig.json 开启 "strict": true，强制显式类型。

宽松模式（原型/小项目）：允许部分隐式 any，但核心逻辑仍建议显式类型。

总结：

核心逻辑、公共 API、复杂数据 → 显式类型（提高可维护性）。

简单变量、局部作用域、可推断场景 → 可省略类型（减少冗余）。

团队统一风格，避免部分代码有类型、部分没有，导致不一致。

这样可以在 开发效率 和 代码健壮性 之间取得平衡。 🚀

TypeScript 中的严格模式跟 JavaScript 中说的严格模式（即 use strict）不是一个概念，它表示是否开启下面一系列的类型检查规则：

```javascript
{
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
}
// noImplicitAny不允许变量或函数参数具有隐式any类型。
// noImplicitThis不允许this上下文隐式定义。
// strictNullChecks不允许出现null或undefined的可能性。strictPropertyInitialization验证构造函数内部初始化前后已定义的属性。strictBindCallApply对 bind, call, apply 更严格的类型检测。strictFunctionTypes对函数参数进行严格逆变比较

```

意思是说：

如果你设置 strict 为 true 的话，那么上面所有的配置默认全是 true
如果你设置 strict 为 false 的话，那么上面的所有配置默认全是 false
你如果既设置了 strict 又单独设置了其中的部分配置，那么以单独设置的配置为准

下述代码 nums 会自动推到为 number[],但是入参隐式的推导为 any：

```javascript
// 不允许隐式 any，会标红，false 则可以
const nums = [1, 2, 3];

const getN = (nums) => {
  return nums.map((item) => {
    return item % 2 == 0;
  });
};

console.log(getN(nums));
```

这样的代码是有 bug 的，例如：

isOddNumber('a') // true
isOddNumber(undefined) // true
"strict": true 的情况下：

<!-- https://juejin.cn/post/6896680181000634376 -->
