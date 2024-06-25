// for (var i = 0; i< 10; i++){
// 	setTimeout(() => {
// 		console.log(i);
//     }, 1000)
// }

for (let i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
for (var i = 0; i< 10; i++){
  (function(j){
    setTimeout(() => {
      console.log(j);
      }, 1000)
  }(i))
}

// 迭代的实现:
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))

// 递归的实现(ES6简写):
const flatten = array => array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])