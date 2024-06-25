```javascript

var P1 = new promise(function(resolve, reject) {
  settimeout(() => {
    resolve('321)
  }, 2000)
})
P1.then(val => {
  return new promise() / val
})
```


1.首先定义状态
status：pending/resolved/rejected

then实际上是在注册函数并存储，resolvedcallbacks/rejectdcallbacks中，当执行了resolve（）的时候在遍历执行里面的函数

then可以返回一个普通值，也可以返回一个promise，如是实现的呢
```javascript
then = function(cb){

var promise2 = new Promise((resolve, reject) => {
  let x = cb()
  if (x.then) {
    x.then((value) => {
      resolve(value)
    })
  } else {
    resolve(x)
  }
})
}
```
也就是通过返回一个promise，来处理拿到的返回值，如果返回值也是一个promise，那就需要在返回的这个promise的成功回调中执行promise2的resolve，这样就保证了时序性