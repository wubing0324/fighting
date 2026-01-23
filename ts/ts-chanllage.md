```javascript
// your answers
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

```javascript
// 元组转换为对象
type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P
}
// 类型参数约束 T extends readonly string[]

// 表示 T 必须是一个只读的字符串数组/元组类型

// 例如：["a", "b", "c"] 或 readonly string[]

// T[number]

// 这是索引访问类型，表示获取数组所有元素的联合类型

// 例如：["a", "b", "c"][number] → "a" | "b" | "c"

// 映射类型 [P in T[number]]: P

// 遍历联合类型 T[number] 中的每个成员 P

// 为每个 P 创建一个属性，键和值都是 P

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

```javascript
type First<T extends readonly string[] | readonly number[]> = T extends [] ? never : T[0]

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
const a: head1 = 'a'
const b: head2 = 3
console.log(a, b)
```

```javascript
// 获取元组长度
type Length<T extends readonly any[]> = T['length']

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

T extends U ? X : Y - 条件类型
extends 除了用在继承类时会使用，还可以用于判断一个类型是否比另一个类型的父类型，并根据判断结果执行不同的类型分支，其使得 TS 类型具备了一定的编程能力。

extends 条件判断规则如下：如果 T 可以赋值给 U 返回 X，否则 Y，如果 TS 无法确定 T 是否可以赋值给 U，则返回 X | Y。

```javascript
type isString<T> = T extends string ? true : false

type T1 = isString<number>  // false
type T2 = isString<string>  // true
```

```javascript

```

```javascript

```
