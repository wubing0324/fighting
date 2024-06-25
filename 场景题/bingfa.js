function concurRequest(urls, maxNum){
    if (urls.length === 0) return Promise.resolve([])
    return new Promise((resolve) => {
        let index = 0 // 指向下一次请求的url对应的下标
        const result = []
        let count = 0
        async function _request() {
            const i = index
            const url = urls[index]
            index++
            try {
                if (url && typeof url === 'function') {
                    const resp = await url()
                    result[i] = resp
                } else {
                    const resp = await fetch(url)
                    result[i] = resp
                }
            } catch (err) {
                result[i] = err
            }
            finally{
                count++
                if (count === urls.length) {
                    resolve(result)
                }
                if (index < urls.length) {
                    _request()
                }
            }
        }
        for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
            _request()
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
concurRequest(promises, 3)