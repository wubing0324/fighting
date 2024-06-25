function myPromiseResolve(value) {
    // 如果传入的是一个 Promise，直接返回该 Promise
    if (value instanceof Promise) {
      return value;
    }
  
    // 如果传入的是一个 thenable 对象，创建一个新的 Promise，并处理它的 then 方法
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      return new Promise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }
  
    // 如果传入的是一个普通值，返回一个立即解决的 Promise
    return new Promise(resolve => resolve(value));
  }
  
  // 示例使用
  const promise1 = myPromiseResolve(42);
  promise1.then(value => {
    console.log(value); // 输出: 42
  });
  
  const promise2 = myPromiseResolve(Promise.resolve('Hello'));
  promise2.then(value => {
    console.log(value); // 输出: Hello
  });
  
  const thenable = {
    then: function(resolve, reject) {
      resolve('Thenable resolved');
    }
  };
  
  const promise3 = myPromiseResolve(thenable);
  promise3.then(value => {
    console.log(value); // 输出: Thenable resolved
  });
  