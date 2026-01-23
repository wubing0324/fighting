在 TypeScript 中，extends 和 implements 都用于实现类型的复用和扩展，但它们的用途和行为有本质区别。以下是详细对比：

1. 核心区别
   特性 extends implements
   适用目标 类继承类、接口继承接口/类型 类实现接口
   作用 继承父类的实现（属性和方法） 强制类满足接口的类型契约（不包含实现）
   是否继承实现 ✅ 继承父类的具体代码 ❌ 仅检查类型匹配，不提供实现
   多继承支持 ❌ 单继承（类）或可多继承（接口） ✅ 可同时实现多个接口
   关键字位置 class Child extends Parent class ClassA implements InterfaceA
2. extends（继承）
   （1）类继承类
   子类获得父类的所有属性和方法（包括实现）。

单继承：一个类只能继承一个父类。

```
class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.move(); // ✅ 继承父类方法
dog.bark(); // ✅ 子类自有方法
```

（2）接口继承接口
可多继承：一个接口可以继承多个接口或类型。

```
interface Shape {
  color: string;
}

interface Circle extends Shape {
  radius: number;
}

const circle: Circle = {
  color: "red",
  radius: 10,
};
```

（3）接口继承类型（type）

```
type Person = {
  name: string;
};

interface Student extends Person {
  grade: number;
}

const student: Student = {
  name: "Alice",
  grade: 3,
};
```

3. implements（实现）
   （1）类实现接口
   强制类满足接口的类型定义，但不提供具体实现。

可多实现：一个类可以实现多个接口。

```
interface Animal {
  name: string;
  eat(): void;
}

interface Runnable {
  run(): void;
}

class Dog implements Animal, Runnable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat() {
    console.log("Eating...");
  }

  run() {
    console.log("Running...");
  }
}

const dog = new Dog("Buddy");
dog.eat(); // ✅ 必须实现接口方法
dog.run(); // ✅ 必须实现接口方法
```

（2）类实现类型（type）

```
type Person = {
  name: string;
  sayHello(): void;
};

class Student implements Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}
```

4. 关键差异总结
   | 场景 | extends | implements |
   |:-----|:---------|:------------|
   | 类继承类 | ✅ 获得父类实现 | ❌ 不能使用 |
   | 类实现接口 | ❌ 不能使用 | ✅ 强制满足接口类型 |
   | 接口继承接口/类型 | ✅ 可多继承 | ❌ 不能使用 |
   | 多继承支持 | 类：❌ 单继承<br>接口：✅ 多继承 | 类：✅ 可多实现多个接口 |
   | 运行时影响 | 父类代码会被子类实例继承 | 仅编译时类型检查，不影响运行时 |

5. 如何选择？
   用 extends 当：
   需要复用父类的具体实现代码（如方法逻辑）。

构建类继承体系（如 Animal → Dog）。

用 implements 当：
需要强制类符合某个类型契约（如接口定义）。

实现多个接口的组合功能（如 Animal + Runnable）。

组合使用示例

```
// 接口定义能力
interface Eatable {
  eat(): void;
}

interface Swimmable {
  swim(): void;
}

// 父类提供部分实现
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 子类继承实现 + 实现额外接口
class Duck extends Animal implements Eatable, Swimmable {
  eat() {
    console.log(`${this.name} is eating.`);
  }
  swim() {
    console.log(`${this.name} is swimming.`);
  }
}

const duck = new Duck("Donald");
duck.eat();  // ✅ 来自 Eatable
duck.swim(); // ✅ 来自 Swimmable
```

6. 常见问题
   Q1: 可以同时 extends 和 implements 吗？
   ✅ 可以：

```
class Child extends Parent implements InterfaceA, InterfaceB { /* ... */ }
```

Q2: 为什么 implements 不提供实现？
implements 是 TypeScript 的类型检查工具，仅确保类符合接口类型，具体逻辑需开发者编写。

Q3: 接口能 extends 类吗？
✅ 可以（但通常不推荐）：

```
class Point {
  x: number;
  y: number;
}

interface Point3D extends Point {
  z: number;
}
```

总结
extends：用于继承实现（"是一个"关系，如 Dog 是一种 Animal）。

implements：用于遵守契约（"具有某种能力"关系，如 Duck 能 Swim）。
