
##### for in
+ 遍历数组、对象、字符串，会遍历原型链上的属性，遍历对象属性时，顺序不确定
+ 遍历对象及其原型链上可枚举的属性；
+ 如果用于遍历数组，处理遍历其元素外，还会遍历开发者对数组对象自定义的可枚举+ 属性及其原型链上的可枚举属性；
+ 遍历对象返回的属性名和遍历数组返回的索引都是 string 类型；
+ 某些情况下，可能按随机顺序遍历数组元素；
```javascript
function CreateObj(name, age) {
    this.name = name
    this.age = age
}

CreateObj.prototype.getName = function() {
    console.log('fuck all')
}

var obj = new CreateObj('www', 20)

Object.defineProperty(obj, 'money', {
    enumerable: true,
    value: 88888888,
    writable: true,
    configurable: true
});
for (let k in obj) {
    console.log(k)
}

var arr = [1,2,3,4,5]

for (let k in arr) {
    console.log(k)
}

var str = 'ewqewqew'
for (let k in str) {
    console.log(k)
}

```

##### Object.keys
+ 返回对象自身可枚举属性组成的数组
+ 不会遍历对象原型链上的属性以及 Symbol 属性
+ 对数组的遍历顺序和 for in 一致

```javascript
function Person() {
    this.name = 'June';
}
Person.prototype.getName = function() {
    return this.name;
}
var person = new Person();
Object.defineProperty(person, 'age', {
    enumerable: true,
    value: 17,
    writable: true,
    configurable: true
});
console.log(Object.keys(person));   // ['name', 'age']
```

##### for of

es6 中添加的循环遍历语法；
+ 支持遍历数组，类数组对象（DOM NodeList），字符串，Map 对象，Set 对象；
+ 不支持遍历普通对象；
+ 遍历后输出的结果为数组元素的值；
+ 可搭配实例方法 entries()，同时输出数组的内容和索引；

// 1. 不会遍历到对象属性及其原型属性
```javascript
Array.prototype.getLength = function() {
    return this.length;
};
var arr = ['a', 'b', 'c'];
arr.name = 'June';
Object.defineProperty(arr, 'age', {
    enumerable: true,
    value: 17,
    writable: true,
    configurable: true
});
for(let i of arr) {
    console.log(i); // a,b,c
}

// 2. 如果要遍历对象，可与 Object.keys 配合
var person = {
    name: 'June',
    age: 17,
    city: 'guangzhou'
}
for(var key of Object.keys(person)) {
    console.log(person[key]); // June, 17, guangzhou
}

// 3. 配合 entries 输出数组索引和值/对象的键值
var arr = ['a', 'b', 'c'];
for(let [index, value] of Object.entries(arr)) {
    console.log(index, ':', value);
    // 0:a, 1:b, 2:c
}
var obj = {name: 'June', age: 17, city: 'guangzhou'};
for(let [key, value] of Object.entries(obj)) {
    console.log(key, ':', value);
    // name:June,age:17,city:guangzhou
}

```