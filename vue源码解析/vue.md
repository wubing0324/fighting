1.new Vue(options)
2.mergeOptions()
3.Vue.prototype._init()
// 组件中emit绑定的事件在这里执行
initEvents(vm); -> 
createComponentInstanceForVnode中给_parentVnode赋值
var listeners = vm.$options._parentListeners;拿到父组件传递的自定义事件,通过$on定义该事件
// 定义vm._c函数
initRender(vm); ->
解析模板，生成ast，将ast转化为render函数，通过递归不断生成子节点的render，然后生成父节点的render，组合成最终的render
callHook(vm, 'beforeCreate');
initInjections(vm); // resolve injections before data/props
// 监听data中的数据，为每个数据定义get和set方法，通过defineproperty将每个值挂在vm上
initState(vm);
initProvide(vm); // resolve provide after data/props
callHook(vm, 'created');
vm.$mount(vm.$options.el);


如何区分元素绑定的是自定义事件还是原生事件？
new Vue实例有两种情况。
1.根实例，执行_init,_isComponent是false，执行创建dom元素（createElm）-> cbs.update() -> updateDOMListeners -> addEventListener
2.子组件，执行componentVNodeHooks.init -> createComponentInstanceForVnode (_isComponent=true)同时返回子组件实例 -> Sub._init -> initInternalComponent -> opts._parentListeners = vnodeComponentOptions.listeners -> initEvents -> updateComponentListeners -> vm._events[key] = listeners[key]
createElm创建子组件-> createComponent -> vnode.init -> createComponentInstanceForVnode,这时候才有

依赖收集：
watcher
dep
patch

dep.set->watcher.update
watcher.update->patch
patch->dep.get
dep.get->dep.depend
三者构成一个循环，可以简单的理解为每个render watcher对应一个组件，每个组件有自己的patch，每次patch都会使watcher重新收集依赖（dep），这个组件内用到的响应式数据都有对应的dep对象，它的watcher收集了当前组件的所有dep，当其中某个dep变化时，就会通知对应的watcher更新
如果某个属性是v-if="false"的，那么在这一次的依赖收集中就收集不到这个dep，意味着watcher已经不关心这个dep的变化，于是找到这个dep，删除dep中存储的这个watcher

为什么dep中会收集多个watcher？
因为watcher有三种，computed对应的lazy watcher，watch对应的user watcher，和render watcher
lazy watcher就是把它自己放在了所依赖的dep.subs中存储，然后被依赖的dep更新时，这个computed就得到了更新
user watcher是类似的，例如：watch:{'message': function(){}}。
创建一个watcher，会拿到vm.message,触发message的get方法,所以会将当前的watcher收集到vm.message的deps中，一旦message变化，就会执行watcher对应的回调函数