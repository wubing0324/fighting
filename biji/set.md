它类似于数组，但是成员的值都是唯一的，没有重复的值。
```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
```javascript
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

// 去除数组的重复成员
[...new Set(array)]

[...new Set('ababbc')].join('')
// "abc"

let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```
#### Set 实例的属性和方法
Set 结构的实例有以下属性。

  + Set.prototype.constructor：构造函数，默认就是Set函数。
  + Set.prototype.size：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

  + Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
  + Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  + Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
  + Set.prototype.clear()：清除所有成员，没有返回值。

上面这些属性和方法的实例如下。
```javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```