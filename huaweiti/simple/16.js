// 4, 10
// 1 1
// 2 1
// 3 1
// 4 -2

let first = [4, 10]
let second = [[1, 1], [2, 1], [3, 1], [4, -2]]

function getResult(first, second) {

    let offsets = new Array(first[1] + 1).fill(0)
    second.forEach(item => {
        offsets[item[0]] = item[1]
    })
    let result = 0
    for (let i = 1; i < first[1]; i++) {
        offsets[i] = offsets[i - 1] + offsets[i]
        result += offsets[i]
    }
    return result
}
console.log(getResult(first, second))
