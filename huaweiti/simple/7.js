

let arr = [
    [1, 0, 100],
    [2, 0, 199],
    [3, 0, 200],
    [4, 0, 200],
    [5, 0, 200],
]
function getResult(arr) {
    let result = 0
    let agent = {}
    arr.sort((a, b) => b[1] - a[1])
    let first = arr.at(-1)[1]
    arr.forEach(item => {
        let [id, preId, money] = item
        if (agent[id]) money += agent[id]
        if (!agent[preId]) agent[preId] = 0
        agent[preId] += Math.floor(money / 100) * 15

    })
    return `${first} ${agent[first]}`
}
console.log(getResult(arr))