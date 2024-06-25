console.log('main.js', require('./a.js').x)
console.log('main.js', require('./b.js').x)
setInterval(function(){
  console.log('main.js', require('./c.js').getC())
}, 1000)