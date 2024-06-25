// 题目需求
// 实现compose函数, 类似于koa的中间件洋葱模型

let middleware = []
middleware.push((context, next) => {
  console.log(1)
  next()
  console.log(1.1)
})
middleware.push((context, next) => {
  console.log(2)
  next()
  console.log(2.1)
})
middleware.push((context, next) => {
  console.log(3)
  next()
  console.log(3.1)
})
function compose(middleware) {
    let index = 0

    const excute = () => {
        let cur = index
        index++
        if (index <= middleware.length) {
            middleware[cur](self, next)
        }
    }
    const next = () => {
        excute()
    }
    let self = this
    return excute
}

let fn = compose(middleware)
fn()

/*
1
2
3
3.1
2.1
1.1
*/


