// function timeout(time){
//   return new Promise(resolve => setTimeout(resolve,time))
// }

// async function sleep(time) {
//   var i = await timeout(time)
//   console.log('67890')
//   return i
// }

// sleep(5000)


// function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve,time))
// }
// async function output() {
//   let out = await sleep(5000);
//   console.log(1);
//   return out;
// }
// output();

var arr = [3, 15, 8, 29, 102, 22]

arr.sort(function(a, b){return a - b})
console.log(arr)