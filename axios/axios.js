
class InterceptorsManage {
    constructor() {
      this.handlers = [];
    }
  
    use(fullfield, rejected) {
      this.handlers.push({
        fullfield,
        rejected
      })
    }
}

class Axios{
    constructor() {
        this.interceptors = {
            request: new InterceptorsManage,
            response: new InterceptorsManage
        }
    }
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
    sendAjax(config){
        return new Promise(resolve => {
            const {url = '', method = 'get', data = {}} = config;
            // 发送ajax请求
            console.log(config);
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function() {
                console.log(xhr.responseText)
                resolve(xhr.responseText);
            };
            xhr.send(data);
        })
    }
    create() {

    }
}

const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(met => {
    Axios.prototype[met] = function() {
        console.log('执行'+met+'方法');
        // 处理单个方法
        if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
            return this.request({
                method: met,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else { // 3个参数(url[,data[,config]])
            return this.request({
                method: met,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }

    }
})
const utils = {
    extend(a,b, context) {
        for(let key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }
        }
    }
}

function createAxios() {
    let axios = new Axios()
    let req = axios.request.bind(axios)
    // 混入方法， 处理axios的request方法，使之拥有get,post...方法
    utils.extend(req, Axios.prototype, axios)
    // 为什么要这样extends，因为req实际上是request方法，虽然内部的this是axios对象，但是request上没有interceptors对象，所以扩展上去
    utils.extend(req, axios)
    return req
}

let axios = createAxios()

console.log('axios = ==== ', axios.interceptors)






// axios(config) // 直接传入配置
// axios(url[, config]) // 传入url和配置
// axios[method](url[, option]) // 直接调用请求方式方法，传入url和配置
// axios[method](url[, data[, option]]) // 直接调用请求方式方法，传入data、url和配置
// axios.request(option) // 调用 request 方法
// const axiosInstance = axios.create(config)


// 箭头函数不能用来定义prototype方法，this的指向会变成window。因为箭头函数定义的时候就确定了window。
class Test{
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log('getName = ', this.name)
        return this.name
    }
}

Test.prototype.getName2 = function() {
    console.log('name2 = ', this.name)
}

let t1 = new Test('fuck')

t1.getName()
t1.getName2()


// let Fun = function() {console.log('i am fun')}
// methodsArr.forEach(met => {
//     Fun.prototype[met] = function() {
//         console.log('执行'+met+'方法');
//         // 处理单个方法
//         if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
//             return () => {console.log('met = ', met, arguments[0], arguments[1])}
//         } else { // 3个参数(url[,data[,config]])
//             return () => {console.log('met = ', met, arguments[0], arguments[1], ...arguments[2])}
//         }
//     }
// })
// let tar = {}
// let src = Fun.prototype

// const utils = (target, source, context) => {
//     Object.keys(source).forEach(key => {
//         if (Object.prototype.toString.call(source[key]) === '[object Function]') {
//             target[key] = source[key].bind(context);
//         } else {
//             target[key] = source[key]
//         }
//     })
// }
// utils(tar, src)
