function a(next) {
    console.log('woshi aaa')
    setTimeout(() => {
        next()
    }, 5000)
}
function b(next) {
    console.log('woshi bbb')
    next()
}
function c(next) {
    console.log('woshi ccc')
    next()
}

let arr = [a, b, c]

function start(fn, next) {
    fn(next)
}

function step(index) {
    if (arr[index]) {
        start(arr[index], () => step(index + 1))
    }
}
step(0)