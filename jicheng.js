function Parent(name, age){
  this.name = name
  this.age = age
}

Parent.prototype.getname = function(){
  console.log(this.name)
  return this.name
}

function Child(name, age){
  Parent.call(this, name, age)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
var c = new Child('wubing', 18)

c.getname()