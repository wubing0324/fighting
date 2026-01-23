# TypeScript 类型定义使用指南

## 1. 应该显式使用 TypeScript 类型的场景

### (1) 公共 API（函数参数、返回值、导出的变量/类）

✅ 显式定义类型，让调用者清晰了解输入和输出的结构。

```typescript
// 显式定义参数和返回值类型
function getUser(id: number): { name: string; age: number } | null {
  // ...
}
```

### (2) 复杂数据结构（嵌套对象、联合类型、泛型等）

✅ 显式定义类型，避免隐式 any 导致类型不安全。

```typescript
type User = {
  id: number;
  name: string;
  address?: { city: string; country: string }; // 可选嵌套对象
};

const user: User = { id: 1, name: "Alice" };
```

### (3) 团队协作项目

✅ 显式定义类型，提高代码可读性和可维护性，减少沟通成本。

### (4) 需要严格类型检查的场景

✅ 显式定义类型，避免运行时错误。

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
}

function initApp(config: Config) {
  // TS 会检查 config 是否符合结构
}
```

## 2. 可以省略 TypeScript 类型的场景

### (1) 简单变量（类型可以自动推断）

❌ 可以省略类型，TS 会自动推断。

```typescript
const name = "Alice"; // TS 推断为 string
const age = 25; // TS 推断为 number
const isActive = true; // TS 推断为 boolean
```

### (2) 简单的函数返回值（TS 能正确推断）

❌ 可以省略返回值类型（除非团队规范要求）。

```typescript
function add(a: number, b: number) {
  return a + b; // TS 推断返回值是 number
}
```

### (3) 临时变量或局部作用域变量

❌ 可以省略类型，如果类型显而易见。

```typescript
function processUser(user: User) {
  const { id, name } = user; // TS 知道 id: number, name: string
  // ...
}
```

### (4) 测试代码或快速原型开发

❌ 可以省略类型，快速迭代，后续再补充。

## 3. 最佳实践总结

| 场景                     | 是否推荐显式类型 | 示例                                           |
| ------------------------ | ---------------- | ---------------------------------------------- |
| 公共函数/方法            | ✅ 推荐          | `function getUser(id: number): User \| null`   |
| 复杂对象/接口            | ✅ 推荐          | `interface User { name: string; age: number }` |
| 变量（简单类型，可推断） | ❌ 可省略        | `const count = 10`（自动推断 number）          |
| 临时变量/局部作用域      | ❌ 可省略        | `const { id } = user`（解构已知类型）          |
| 测试代码/快速原型        | ❌ 可省略        | 快速开发时可不写，后续补充                     |

## 4. 团队规范建议

### 严格模式（推荐）

- tsconfig.json 开启 "strict": true，强制显式类型。

### 宽松模式（原型/小项目）

- 允许部分隐式 any，但核心逻辑仍建议显式类型。

## 总结

- 核心逻辑、公共 API、复杂数据 → 显式类型（提高可维护性）
- 简单变量、局部作用域、可推断场景 → 可省略类型（减少冗余）
- 团队统一风格，避免部分代码有类型、部分没有，导致不一致

这样可以在**开发效率**和**代码健壮性**之间取得平衡。 🚀
