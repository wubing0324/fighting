function getres () {
    let promise1 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise1')
            }, 3000)
        })
    }
    let promise2 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise2')
            }, 1000)
        })
    }
    let promise3 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise3')
            }, 4000)
        })
    }
    let arr = [promise1, promise2, promise3, promise3]

    arr.reduce((cur, next, index, all) => {
        return cur.then((res) => {
            console.log('res = ', res)
            if (index === all.length - 1) { // 最后一个 Promise
                return next().then(result => {
                    console.log('result =', result); // 打印最后一个 Promise 的结果
                });
            } else {
                return next(); // 非最后一个 Promise
            }
        })
    }, Promise.resolve())
}
getres()

// 在reduce内部，最后一个then是不会执行的