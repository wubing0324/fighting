function test () {
    console.log('start')
    setImmediate(() => {
        console.log('setImmediate')
        Promise.resolve().then(() => {console.log('setImmediate-children')})
     }, 0)
     setTimeout(() => {
         console.log('children2')
         Promise.resolve().then(() => {console.log('children2-1')})
     }, 0)
     setTimeout(() => {
         console.log('children3')
         Promise.resolve().then(() => {console.log('children3-1')})
     }, 0)
     Promise.resolve().then(() => {console.log('children1')})
     process.nextTick(() => {
        console.log('nextTick')
        Promise.resolve().then(() => {console.log('nextTick-children')})
    })
     console.log('end') 
}

// test()

// 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
// start
// end
// children1
// children2
// children3
// children2-1
// children3-1

// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
// start
// end
// children1
// children2
// children2-1
// children3
// children3-1

// 同步代码 -> nexttick -> 微任务(promise.then) -> setTimeout -> setImmediate

// 在文件读写中，setImmediate优先于setTimeout
let fs = require('fs')

fs.readFile('./env.md', 'utf-8', (err, data) => {
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)
    setImmediate(() => {
        console.log('setImmediate')
        Promise.resolve().then(() => {console.log('setImmediate-children')})
    }, 0)
})

// 顺序不固定，所i最好放在io中
setTimeout(() => {
    console.log('setTimeout')
}, 0)
setImmediate(() => {
    console.log('setImmediate')
})