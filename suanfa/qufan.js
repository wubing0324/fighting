var str = 'ABCdefJKLA'

function reverse(str){
  // var str1 = ''
  // for (let i = 0; i < str.length; i++) {
  //   if (/[a-z]/g.test(str[i])) {
  //     str1 += str[i].toUpperCase()
  //     console.log(str[i].toUpperCase())
  //   } else {
  //     str1 += str[i].toLowerCase();
  //   }
  // }
  var a = str.replace(/[a-zA-Z]/g,function(a){ return /[a-z]/.test(a)?a.toUpperCase():a.toLowerCase(); });
  return a
}

console.log(reverse(str))