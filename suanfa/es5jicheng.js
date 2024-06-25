var Foo = function(){
  this.name = 'wo shi name'
  this.getName = function() {console.log(this.name)}
  this.setName = function(name){this.name = name}
}
Foo.prototype.pname = 'pname'

var Bar = function(){}

Bar.prototype = new Foo()
Bar.prototype.constructor = Bar

var bar = new Bar()

console.log(bar.name)
bar.getName()
bar.setName('989898989')
bar.getName('989898989')
console.log(bar.pname)
var Zoo ={name2 : 'zoo'}
bar.__proto__ = Zoo
console.log(bar.name2)
console.log(bar.pname)

