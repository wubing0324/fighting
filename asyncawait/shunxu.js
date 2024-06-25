var fun1 = function(){
    return new Promise((r, rej) => {
        setTimeout(() => {
            console.log('fun1')
            r(1)
        }, 5000)
    })
    
}
var fun2 = function(){
    return new Promise((r, rej) => {
        setTimeout(() => {console.log('fun22222222222');r(2)}, 1000)
    })
    
}

var fun3 = async function(){
    console.log('start')
    await fun1()
    await fun2()
    console.log('end')
}

fun3()
consle.log('1234567890')