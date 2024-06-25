首先说二者的实现原理：
#### computed：{key1: function(){return this.message + 1}}
> userDef就是这个方法：function(){return this.message + 1}

遍历computed对象，拿到每个key和对应的方法，为每个key创建一个watcher对象，最后把这些key挂载到当前的vue实例（vm）上，当执行this.key1的时候，执行userDef方法，会执行this.message的get方法->dep.depend()，此时Dep.Target是key1对应的watcher，所以将当前的watcher存入到了this.message的dep中,每次this.message的变化都会触发key1的更新,每次this.key1都会重新执行userDef。接下来是优化，
1.如何在只有key依赖的值发生变化的时候才更新计算属性的值，而不是每次调用this.key1都去执行userDef
2.如果计算属性通过v-if隐藏了，是不是就不该更新它
解答：
1.通过computedGetter将userDef包装一层，this.key1执行get的时候执行computedGetter，userDef被存储到watcher的getter中，computedGetter通过调用evaluate设置dirty属性来判断是否执行get->getter，当message变化的时候，改变dirty，这时执行this.key1，先会判断dirty的值，再去决定要不要进行重新计算
2.通过将userDef包装一层，每次执行this.key1的时候，都会重新做依赖收集，如果message有变化，就会触发this.key1的get->pushTarget(当前的计算属性watcher)，如果key1没有用到，就会解绑key1对应watcher和其依赖（message）dep的绑定
3.computed必须是同步不得，否则返回undefined，因为他并不是直接执行对应的函数
function () {
  getter() //所以异步不行
  return value
}
```javascript
var computedWatcherOptions = { lazy: true };
function initComputed (vm, computed) {
  // $flow-disable-line
  // 用于存储每个计算属性对应的watcher
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  sharedPropertyDefinition.get = createComputedGetter(key)
  // 将计算属性中的每个属性挂载到vm上，可以直接通过this.xxx获取计算属性
  // 当真正获取计算属性的值得时候，就会执行这个get（computedGetter）
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      // 第一次获取计算属性的值是在这里,最终调用了get,也就是计算属性userDef,此时Dep.target=当前的watcher(pushTarget(this);),
      // 然后执行计算属性依赖属性的getter,
      // 从而将当前的计算watcher存入到依赖属性得dep对象中,同时将dep存入watcher对象的deps中
      // 缓存也就是通过这个dirty实现的,再update中会将此属性置为true
      // var computedWatcherOptions = { lazy: true };初始化的时候lazy是true，dirty是true，
      // 在evaluate中dirty修改为false
      if (watcher.dirty) {
        watcher.evaluate();
      }
      // 执行顺序是：lazy watcher， user watcher， render watcher，
      // 原因：在flushquene中会用watcher.id去从小到大排序，然后依次执行，watcher的创建顺序是lazy，user，render
      // 之后每次取值所做的只是将依赖属性的dep和此watcher互相关联,
      // 在dep触发notify更新的时候,会遍历subs,拿到这个watcher,执行他的update更新方法
      // dep.depend的同时，也会将该dep收集到当前的watcher的deps中，每次watcher.deps中的dep都会更新，
      // 干掉那些此次不需要触发watcher.update的dep，所以每次都要重新收集watcher所包含的dep
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

Watcher.prototype.evaluate = function evaluate () {
  // this.get就是userDef
  this.value = this.get();
  this.dirty = false;
};
```

#### watch：{message: function(){return console.log('监听message的变化')}}
> userDef就是这个方法：function(){return console.log('监听message的变化')}

比computed简单，同样是通过为每个key创建watcher对象，但是没有缓存，通过读取this.message来将当前watcher和message的dep关联，对应的userDef实际上是watcher.cb, watcher.getter只是用来取值。
watch和computed不同，不会重新进行依赖收集，message只要变化，对应的watch一定执行。
+ immediate：定义watch的时候立即执行一次对应的userDef,即使message没有变化
+ sync:message变化后，就执行userDef，不会放到下一次tick中

watch是如何被依赖收集的？
new Watcher()的时候，先执行parsePath，返回的所依赖属性的读取也就是getter，在this.get中先将当前的watcher激活，燃火执行getter，也就进行了依赖收集
```javascript
var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.getter = parsePath(expOrFn);
    this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    value = this.getter.call(vm, vm);
    popTarget();
    this.cleanupDeps();
    return value
  };
  ```