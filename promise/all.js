function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('参数必须是一个数组'));
      }
  
      let results = [];
      let completedPromises = 0;
      let promisesCount = promises.length;
  
      if (promisesCount === 0) {
        return resolve([]);
      }
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => {
            results[index] = value;
            completedPromises += 1;
  
            if (completedPromises === promisesCount) {
              resolve(results);
            }
          })
          .catch(error => {
            resolve(error);
          });
      });
    });
  }
  
  // 示例使用:
//   const promise1 = Promise.resolve(3);
//   const promise2 = new Promise((resolve, reject) =>
//     setTimeout(resolve, 100, 'foo')
//   );
//   const promise3 = Promise.resolve(42);
  
//   myPromiseAll([promise1, promise2, promise3]).then(values => {
//     console.log(values); // [3, 'foo', 42]
//   }).catch(error => {
//     console.error(error);
//   });
  

let promise1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('time1')
            resolve('time1')
        }, 3000)
    })
}
let promise2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('time2')
            reject('time2')
        }, 1000)
    })
}
let p1 = promise1()
let p2 = promise2()
let result = Promise.all([p1, p2]).then(res => {
    console.log('res = ', res)
})