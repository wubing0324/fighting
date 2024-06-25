axios拦截器的实现：先注册，然后调用request发起请求的时候，先处理拦截器数组中存储的函数，无论是request.handlers还是response.handlers他们的内容都是成对出现的
request.handlers = []
response.handlers = []
最后在request方法中，先生成promise链路，顺序为：
request.handlers的所有注册的函数，ajax请求，undefined，response.handlers的注册函数
['fulfilled1','reject1','fulfilled2','reject2','this.sendAjax','undefined','fulfilled2','reject2','fulfilled1','reject1']，
按顺序执行这个链路,每次拿到两个函数，刚好对应一个promise的成功和失败回调

```javascript
request.interceptors.request.use(
  cfg1 => {
    return cfg
  },
  (err1) => {
    Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res2) => {
    return res
  },
  (err2) => {
    const { response } = err
    return Promise.reject(err)
  }
)
```

```javascript
request(config) {
    // 拦截器和请求组装队列
    let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

    // 请求拦截
    this.interceptors.request.handlers.forEach(interceptor => {
        chain.unshift(interceptor.fullfield, interceptor.rejected)
    })

    // 响应拦截
    this.interceptors.response.handlers.forEach(interceptor => {
        chain.push(interceptor.fullfield, interceptor.rejected)
    })

    // 执行队列，每次执行一对，并给promise赋最新的值
    let promise = Promise.resolve(config);
    while(chain.length > 0) {
        promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
}
```

https://cloud.tencent.com/developer/article/1794288