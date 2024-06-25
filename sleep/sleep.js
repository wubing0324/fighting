// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food


// function LazyMan(name) {
//     this.name = name
//     console.log(`Hi I am ${name}`)
//     return this
// }
// LazyMan.prototype

class CreateLazyMan {
    constructor(name) {
        this.name = name
        this.taskList = []
        console.log(`Hi I am  ${name}`)
        setTimeout(() => {
            this.next();
        }, 0);
    }
    eat(type) {
        let that = this
        let fn = (function(t) {
            return function() {
                console.log(`I am eating ${t}`)
                that.next()
            }
        })(type)
        this.taskList.push(fn)
        return this
    }
    sleepFirst(time) {
        let that = this
        let fn = (function(t) {
            return function() {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next()
                }, t * 1000)
            }
        })(time)
        this.taskList.unshift(fn)
        return this
    }
    sleep(time) {
        let that = this
        let fn = (function(t) {
            return function() {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next()
                }, t * 1000)
            }
        })(time)
        this.taskList.push(fn)
        return this
    }
    next() {
        let cb = this.taskList.shift()
        cb && cb()
    }
}
function LazyMan(name) {
    let obj = new CreateLazyMan(name)
    return obj
}
// LazyMan('Tony').sleep(3).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');