function deactive(obj,key, val) {
  var dep = {a:1}

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 这里会收集依赖,包括render watcher和user watcher,lazy watcher(计算属性)
    // lazy watcher属于间接收集,是执行计算属性的userDef的时候,执行了对应依赖的get,也就是这里了,所以会把lazy watcher
    // 收集到这个dep的subs中
    get: function reactiveGetter () {
      console.log(dep)
      return val
    },
    set: function reactiveSetter (newVal) {
      dep.a += 1
    }
  });

}
var obj = {'age': 20}
deactive(obj, 'age', obj.age)
setInterval(() => {
  obj.age++
  // console.log(obj.age)
}, 2000)