Dep.target = null;
function defineReactive(data, key, val){
  observe(val)
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log(val + '--------------get-------------')
      if (Dep.target) {
        dep.addSub(Dep.target); // 在这里添加一个订阅者
      }
      return val;
    },
    set: function(newVal) {
      val = newVal
      console.log('--------------set-------------')
      console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
      dep.notify();
    }
  })
}

function observe(data){
  if (typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function(k){
    defineReactive(data, k, data[k]);
  })
}

function Dep () {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
      this.subs.push(sub);
  },
  notify: function() {
      this.subs.forEach(function(sub) {
          sub.update();
      });
  }
};

function Watcher(vm, exp, cb){
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get();
}
Watcher.prototype = {
  update: function(){
    this.run();
  },
  run: function(){
    var value = this.vm.data[this.exp]
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get: function(){
    Dep.target = this;
    
    var value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}

// var library = {
//   book1: {
//     name: 123456
//   },
//   book2: ''
// };
// observe(library);

// setTimeout(function(){
//   console.log(library.book1.name);
//   library.book1.name = 456456456456;
//   console.log(library.book1.name);
//   library.book2 = '没有此书籍';
// }, 2000)

function SelfVue (data, el, exp) {
  this.data = data;
  observe(data);
  el.innerHTML = this.data[exp];  // 初始化模板数据的值
  new Watcher(this, exp, function (value) {
      el.innerHTML = value;
  });
  return this;
}
var ele = document.querySelector('#name');
var selfVue = new SelfVue({
    name: 'hello world'
}, ele, 'name');

window.setTimeout(function () {
    console.log('name值改变了');
    selfVue.data.name = 'canfoo';
}, 2000);