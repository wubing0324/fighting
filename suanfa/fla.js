var input = { a: 1,b: [ 1, 2, { c: true }, [ 3 ] ], d: { e: 2, f: 3 },g: null,}

var output = { "a": 1,"b[0]": 1, "b[1]": 2, "b[2].c": true, "b[3][0]": 3, "d.e": 2, "d.f": 3, "g": null };

// function flatten(input, res, key){
//     if(typeof input !== "object" || input == null) {
//        res[key] = input;
//        return
//     }
//     if(Array.isArray(input)) {
//       input.forEach((item, index) => {
//         flatten(item, res, `${key}[${index}]`)
//       })
//     }else {
//       Object.keys(input).forEach(key1 => {
//         flatten(input[key1], res, key? `${key}.${key1}` : key1)
//       })
//     }
  
//     return res;
//   } 

function fla(input){
  var o = {}
  Object.keys(input).forEach(k => {
    get(input[k], o, k)
  })
 function get(input, o, key){
  if (Object.prototype.toString.call(input) === '[object Object]') {
    Object.keys(input).forEach(key1 => {
      get(input[key1], o, `${key}.${key1}`)
    })
  } else if (Object.prototype.toString.call(input) === '[object Array]') {
    input.forEach((item, index) => {
      get(item, o, `${key}[${index}]`)
    })
  } else {
    o[key] = input
  }
 }
 return o
}

console.log(fla(input))







// var i = {a:1, b:2, c: {d : 3}, e: [0, 1,3]}
// function fla(input) {
//   var o = {}
//   Object.keys(input).forEach(k => {
//     if (Object.prototype.toString.call(input[k]) === '[object Object]') {
//       o[k] = fla(input[k])
//     } else if (Object.prototype.toString.call(input[k]) === '[object Array]') {
//       o[k] = fla(input[k])
//     } else {
//       o[k] = input[k]
//     }
//   })
//   return o
// }

// console.log(fla(i))























// [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"];
// [123, [1, 2, 3], [1, "2", 3],"meili" ]

// function fla(input) {
//   debugger
//   if (Object.prototype.toString.call(input) === '[object Array]') {
//     var str = ''
//     input.forEach((val, index) => {
//       str += fla([])
//     })
//     return str
//   }
//   if (Object.prototype.toString.call(input) === '[object Object]') {
//     var str = ''
//     Object.keys(input).forEach(key => {
//       str +=  fla({key: input[key]})
//     })
//     return str
//   }
//   return input
// }
// console.log(fla(input))