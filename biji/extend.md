<!-- message.vue -->
```javascript
<template>
<transition name="fade">
    <div class="message" :class="type" v-show="show">
      <i class="icon"></i>
      <span class="text">{{text}}</span>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'message',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: val => ['info', 'success', 'warning', 'error'].includes(val)
//['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
      },
      text: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@/common/style/global.styl"
   // fade动画 <transition name="fade"> </transition>
   // 下面的样式可以自己改
  .fade-enter-active,
  .fade-leave-active 
     transition: opacity .3s
  .fade-enter,
  .fade-leave-to
     opacity: 0
  .message
    position fixed
    top 40px
    text-align center
    left 50%
    transform translateX(-50%)
    min-width 400px
    padding 10px 20px
    color $strong-text-color
    background #f5f5f5
    font-size 14px
    line-height 1.4
    border-radius 4px
    z-index 1000
    box-shadow 0 0 10px rgba(0, 0, 0, .3)
    &.info
      color $strong-text-color
    &.success
      color $success-color
    &.error
      color $danger-color
    &.warning
      color $warning-color
</style>
```

在componenets/Message目录准备一个index.js
```javascript
import Message from './Message.vue'

const MESSAGE = {
  duration: 3000, // 显示的时间 ms
  animateTime: 300, // 动画时间,表示这个组件切换show的动画时间
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Message', Message)

    function msg(type, text, callBack) {
      let msg
      let duration = MESSAGE.duration
      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        msg = text.text || ''
        if (text.duration) {
          duration = text.duration
        }
      }
      let VueMessage = Vue.extend({
        render(h) {
          let props = {
            type,
            text: msg,
            show: this.show
          }
          return h('message', {props})
        },
        data() {
          return {
            show: false
          }
        }
      })
      let newMessage = new VueMessage()
      let vm = newMessage.$mount()
      let el = vm.$el
      document.body.appendChild(el) // 把生成的提示的dom插入body中
      vm.show = true
      let t1 = setTimeout(() => {
        clearTimeout(t1)
        vm.show = false  //隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
        let t2 = setTimeout(() => {
          clearTimeout(t2)
          document.body.removeChild(el) //从body中移除dom
          newMessage.$destroy()
          vm = null // 设置为null，好让js垃圾回收算法回收，释放内存

          callBack && (typeof callBack === 'function') && callBack() 
      // 如果有回调函数就执行，没有就不执行，用&&操作符，
      // 只有&&左边 的代码为true才执行&&右边的代码，避免用面条代码：
      // if(true){
      //   ... 
      //   if(true){
      //   ...
      //   }
      // }
        }, MESSAGE.animateTime)
      }, duration)
    }

// 挂载到vue原型上，暴露四个方法
    Vue.prototype.$message = {
      info(text, callBack) {
        if (!text) return
        msg('info', text, callBack)
      },
      success(text, callBack) {
        if (!text) return
        msg('success', text, callBack)
      },
      error(text, callBack) {
        if (!text) return
        msg('error', text, callBack)
      },
      warning(text, callBack) {
        if (!text) return
        msg('warning', text, callBack)
      }
    }
  }
}
export default MESSAGE
```

在main.js中引入components/Message/index.js,以插件形式安装
```javascript
import Vue from 'vue'
import vMessage from './components/Message/index' 
Vue.use(vMessage)
```
最后，当你需要用的时候就直接，特别适合在ajax回调函数里面用来提示

```javascript
this.$message.info('普通消息') 
this.$message.error('错误消息') 
this.$message.warning('警告消息') 
this.$message.success('成功消息') 
```