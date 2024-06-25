// 接口定义函数
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// let mySearch1: SearchFunc;

// mySearch = function(source: string, subString: string): boolean {
//   let result = source.search(subString);
//   return result > -1;
// }
// mySearch1 = function(src, sub) {
//     let result = src.search(sub);
//     return result > -1;
// }
// mySearch('1', '2')




// 接口定义索引（数组）
// interface StringArray {
//   [index: number]: string;
// }

// let myArray: StringArray;
// myArray = ["Bob", "Fred"];

// let myStr: string = myArray[3];
// console.log(myStr)



// const numbers1 = [1, 2, 3];
// numbers1.forEach((_, index) => {
//     console.log(index); // 输出: 0, 1, 2
// });



// abstract class Control {
//   private state: any;
// }

// interface SelectableControl extends Control {
//   select(): void;
// }

// class Image1 extends Control implements SelectableControl {
//   select() { }
// }

// const img = new Image1();
// img.select();


// class Control {
//   private state: any;
// }

// interface SelectableControl {
//   select(): void;
// }

// class Image1 implements SelectableControl {
//   private control = new Control();

//   select() { }
// }

// const img = new Image1();
// img.select();

// interface Cat {
//   name: string;
//   run(): void;
// }
// interface Fish {
//   name: string;
//   swim(): void;
// }

// function isFish(animal: Cat | Fish) {
//   if (typeof (animal as Fish).swim === 'function') {
//       return true;
//   }
//   return false;
// }


// function copyFields<T extends U, U>(target: T, source: U): T {
//   for (let id in source) {
//       target[id] = (<T>source)[id];
//   }
//   return target;
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// copyFields(x, { b: 10, d: 20 });

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