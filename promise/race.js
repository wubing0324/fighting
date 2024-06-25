function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  }
  
  // 示例使用:
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });
  
  myPromiseRace([promise1, promise2]).then(value => {
    console.log(value); // 输出: 'two'
  }).catch(error => {
    console.error(error);
  });
  