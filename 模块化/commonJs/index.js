var counter = require('./moduleA').counter;
let {incCounter, getCounter, obj}  = require('./moduleA');

console.log(counter)
console.log(obj)
incCounter()
let c = getCounter()
console.log('c = ' + c)
console.log(counter)
console.log(obj)
