class Event {
    constructor() {
      this.events = {}
    }
  
    // 订阅
    on(type, fn) {
      // 参数检测
      if (!(fn instanceof Function)) {
        throw '回调必须是函数'
      }
      // 初始化容器
      if (!this.events[type]) {
        this.events[type] = []
      }
      // 添加监听
      if (!this.events[type].includes(fn)) {
        this.events[type].push(fn)
      }
    }
  
    /**
       * description: 事件触发 通知所有订阅者
       * param type [type] 事件类型
       * param eventData [type] 事件信息 订阅者的数据
       * param _this [type] 订阅者的this挂载
       * return [type]
       */
    emit(type, eventData, _this) {
      if (!this.events[type]) {
        throw '该事件未监听'
      }
      this.events[type].forEach((item) => {
        item.call(_this, eventData)
      })
    }
  
    // 取消订阅
    off(type, fn) {
      // 没有函数就清空
      if (!fn) {
        this.events[type] = []
        return
      }
      // 使用filter 不使用splice 因为splice删除当前元素会影响当前emit遍历 导致事件触发不完整
      this.events[type] = this.events[type].filter((item) => item !== fn)
    }
  
    // 订阅一次
    once(type, fn) {
      const self = this
      // 重写函数
      const reWriteFn = function (eventData) {
        fn.call(this, eventData)
        self.off(type, reWriteFn) // 执行后卸载
      }
      // 传入
      this.on(type, reWriteFn)
    }
  }
  
  // 测试代码
  const e = new Event()
  // 订阅
  e.on('click', (msg) => {
    console.log(1, msg, this)
  })
  function testOff(msg) {
    console.log(2, msg, this)
  }
  e.on('click', testOff)
  function fn3(msg) {
    console.log(3, msg, this)
  }
  // 订阅一次
  e.once('click', fn3)
  function fn4(msg) {
    console.log(4, msg, this)
  }
  e.once('click', fn4)
  console.log(e)
  // 通知事件更新
  const obj = {
    a: '传入的this对象',
  }
  e.emit('click', '事件数据', obj)
  console.log(e)
  e.off('click', testOff)
  console.log('off取消订阅', e)
