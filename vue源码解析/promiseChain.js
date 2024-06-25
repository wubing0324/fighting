var promise1 = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise1 2s');
      resolve('promise1 2s')
    }, 2000)
  })
}
var promise2 = function() {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise2 1s');
      resolve('promise2 1s')
    }, 1000)
  })
}
var promise3 = function() {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise3 5s');
      resolve('promise3 5s')
    }, 5000)
  })
}
var promise4 = function() {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise4 4s');
      resolve('promise4 4s')
    }, 4000)
  })
}

let arr = [promise1, promise2, promise3, promise4]

arr.reduce((prePromise, nextPromise) => {
  return prePromise.then(nextPromise)
}, Promise.resolve('开始'))