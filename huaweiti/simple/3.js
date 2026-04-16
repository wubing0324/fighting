
// 如果遇到4跳过，那么：

let n = 15
// 12345 % 10 = 5
// Math.floor(12345 / 10) = 1234

// 遇到4跳过 0 - 9十种可能 10 - 1 = 9种可能
function get4Result(n) {
    let power = 1
    let result = 0
    while (n > 0) {
        let last = n % 10
        if (last > 4) {
            last -= 1
        }
        n = Math.floor(n / 10)
        result += last * power
        power *= 9
    }
    return result
}
let n2 = 2005
// 遇到3和8跳过：那么0 - 9有十种可能，10 - 2 = 8种可能，所以：类似8进制
function get38Result(n) {
    let power = 1
    let result = 0
    while (n > 0) {
        let last = n % 10
        if (last > 8) {
            last -= 2
        } else if (last > 3) {
            last -= 1
        }
        n = Math.floor(n / 10)
        result += last * power
        power *= 8
    }
    return result
}

console.log(get38Result(n2))



