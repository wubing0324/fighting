;(function() {
var PENDING = 'pending'
var RESOLVED = 'resolved'
var REJECTED = 'rejected'
var UNDEFINED = undefined
function Promise(resolver){
  if(resolver && typeof resolver !== 'function'){ throw new Error('Promise resolver is not a function') }
  //当前promise对象的状态
  this.state = PENDING;
  //当前promise对象的数据（成功或失败）
  this.data = UNDEFINED;
  //当前promise对象注册的回调队列
  this.callbackQueue=[];
  //执行resove()或reject()方法
  if(resolver) executeResolver.call(this, resolver);
}
Promise.prototype.then = function(onResolved, onRejected) {
  if (typeof onResolved !== 'function' && this.state === RESOLVED ||
      typeof onRejected !== 'function' && this.state === REJECTED) {
      return this;
  }

  var promise = new this.constructor();

  if (this.state !== PENDING) {
      var callback = this.state === RESOLVED ? onResolved : onRejected;
      executeCallbackAsync.bind(promise)(callback, this.data);
  } else {
      this.callbackQueue.push(new CallbackItem(promise, onResolved, onRejected))
  }

  return promise;
}

function CallbackItem(promise, onResolved, onRejected){
  this.promise = promise;
  // 为了保证在promise链中，resolve或reject的结果可以一直向后传递，可以默认给then添加resolvedFn和rejectedFn
  this.onResolved = typeof onResolved === 'function' ? onResolved : function(v){return v};
  this.onRejected = typeof onRejected === 'function' ? onRejected : function(v){throw v};
}
CallbackItem.prototype.resolve = function(value){
//调用时异步调用 [标准 2.2.4]
  executeCallbackAsync.bind(this.promise)(this.onResolved, value);
}
CallbackItem.prototype.reject = function(value){
//调用时异步调用 [标准 2.2.4]
  executeCallbackAsync.bind(this.promise)(this.onRejected, value);
}

Promise.prototype.catch = function(onRejected){
  return this.then(null, onRejected);
}

// 用于异步执行 .then(onResolved, onRejected) 中注册的回调
function executeCallbackAsync(callback, value){
  var _this = this;
  setTimeout(function(){
    var res;
    try{
      res = callback(value);
    }catch(e){
      return executeCallback.bind(_this)('reject', e);
    }

    if(res !== _this){
      return executeCallback.bind(_this)('resolve', res);
    }else{
      return executeCallback.bind(_this)('reject', new TypeError('Cannot resolve promise with itself'));
    }
  }, 1)
}

// 用于执行 new Promise(function(resolve, reject){}) 中的resove或reject方法
function executeResolver(resolver){
  //[标准 2.3.3.3.3] 如果resove()方法多次调用，只响应第一次，后面的忽略
   var called = false, _this = this;
   function onError(value) {
     if (called) { return; }
     called = true;
     //[标准 2.3.3.3.2] 如果是错误 使用reject方法
     executeCallback.bind(_this)('reject', value);
   }
   function onSuccess(value) {
     if (called) { return; }
     called = true;
     //[标准 2.3.3.3.1] 如果是成功 使用resolve方法
     executeCallback.bind(_this)('resolve', value);
   }
 
   // 使用try...catch执行
   //[标准 2.3.3.3.4] 如果调用resolve()或reject()时发生错误，则将状态改成rejected，并将错误reject出去
   try{
     resolver(onSuccess, onError);
   }catch(e){
     onError(e);
   }
 }

 // 用于执行成功或失败的回调 new Promise((resolve, reject) => { resolve(1)或 reject(1) })
function executeCallback(type, x){
  var isResolve = type === 'resolve', thenable;

  // [标准 2.3.3] 如果x是一个对象或一个函数
  if(isResolve && (typeof x === 'object' || typeof x === 'function')){
  //[标准 2.3.3.2]
    try{
      thenable = getThen(x);
    }catch(e){
      return executeCallback.bind(this)('reject', e);
    }
  }
  if(isResolve && thenable){
    executeResolver.bind(this)(thenable);
  }else{
    debugger
    //[标准 2.3.4]
    this.state = isResolve ? RESOLVED : REJECTED;
    this.data = x;
    this.callbackQueue && this.callbackQueue.length && this.callbackQueue.forEach(v => v[type](x));
  }
  return this;
}

function getThen(obj){
  debugger
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
   return function appyThen() {
     then.apply(obj, arguments);
   };
  }
}
return promise
})()
// console.log(new Promise(function(resolve){ return resolve('ok')}))

function fn1(){
  var promise = new Promise(function(resolve){
    setTimeout(function(resolve){
      resolve(1)
    }, 1000)
  })
  return Promise
}
fn1().then(res=>console.log(++res))

