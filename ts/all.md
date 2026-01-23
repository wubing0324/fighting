```javascript
let a: number[] = [1, 2, 3, 4];
const ro: ReadonlyArray<number> = a;
ro.push(432); // error!
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
// 但是你可以重写，之后就可以更改
a = ro as number[];
a[0] = 12;
```

当有多余不确定属性：
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}


函数签名
```javascript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
const mySearch: SearchFunc = function(a, b) {
  const result = a + b;
  return !!result
}
mySearch('1', '2')
```

类的接口
```javascript
interface ClockInterface {
	currentTime: Date;
	setTime(d: Date);
}

class Clock implements ClockInterface {
	currentTime: Date;
	constructor(h: number, m: number) {
		console.log(h, m)
	}
	setTime(d: Date) {
		this.currentTime = d
	}
}

const c = new Clock(1, 2)
console.log(c.currentTime)
```