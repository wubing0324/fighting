function concurRequest(urls, maxNum){
    if (urls.length === 0) return Promise.resolve([])
    return new Promise(resolve => {
        let result = []
        let index = 0
        let count = 0
        async function _retuest() {
            let url = urls[index]
            let i = index
            index++
            try {
                if (url && typeof url === 'function') {
                    const resp = await url()
                    result[i] = resp
                } else {
                    const resp = await fetch(url)
                    result[i] = resp
                }
            } catch (error) {
                result[i] = error
            }
            finally {
                count++
                if (count === urls.length) {
                    resolve(result)
                }
                if (index < urls.length) {
                    _retuest()
                }
            }
        }
        for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
            _retuest()
        }
    })
}

let genePromise = (name, time) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`start fun name = ${name}, time = ${time}`)
        setTimeout(() => {
            console.log(`done-------`)
            resolve(`fun name = ${name}, time = ${time}`)
        }, time)
    })
}

let promises = []
let randomTime = function (min, max) {
    return Math.random() * (max - min) + min;
}
  
for(let i = 1; i <= 20; i++) {
    promises.push(genePromise(`fn${i}`, randomTime(1, 5) * 1000))
}
concurRequest(promises, 3).then(res => {
    console.log('全部结束 = ', res)
})