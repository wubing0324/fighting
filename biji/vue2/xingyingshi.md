<!--
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2023-02-23 18:45:15
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-02-24 10:11:22
 * @FilePath: \biji\vue2\xingyingshi.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
props响应式原理：defineReactive$$1,同时使用defineproperty将props属性代理到this上

props更新原理：两种情况引用和直接赋值，如果props属性是一个对象，那么父子组件实际上引用的是同一个地址，子组件在读取这个props对象的属性的时候，会将子组件的渲染watcher存放在这个属性的deps中，当在父组件修改这个props对象中这个属性的值的时候，就会触发watcher的update。如果是直接赋值的属性，执行patch的时候，会递归patch子组件，执行子组件的prepatch，这时候就会更新子组件的props（updateChildComponent）
在父组件的render函数中，会有子组件的props数据，这些数据通过child.options传入子组件，在updateChildComponent中将options.props赋值给child.props，如果子组件读取了这个props属性，那么它的依赖中就会收集当前的渲染watcher，触发props修改的时候就会重新渲染子组件
initmethodes：将方法挂载到vm上，同时绑定this。vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);

initdata: 需要使用函数返回一个data对象，不能直接使用，因为会导致多个组件实例使用同一个data地址
，遍历data中的数据，定义defineproperty.set/get属性，
defineProperty.get/set：依赖收集和触发更新，其中对于数组的响应式请查看Observe.md

initcomputed:见vue.js4887行



