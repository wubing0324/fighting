var x = 0;
setInterval(function(){
  x = x + 1
}, 1000)
var getC = function(){
  return x
}
exports.getC = getC