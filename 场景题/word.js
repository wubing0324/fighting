/**
 * 根据表达式计算字母数
 * 说明：
 *   给定一个描述字母数量的表达式，计算表达式里的每个字母实际数量
 *   表达式格式：
 *     字母紧跟表示次数的数字，如 A2B3
 *     括号可将表达式局部分组后跟上数字，(A2)2B
 *     数字为1时可缺省，如 AB3。
 * 示例：
 *   countOfLetters('A2B3'); // { A: 2, B: 3 }
 *   countOfLetters('A(A3B)2'); // { A: 7, B: 2 }
 *   countOfLetters('C4(A(A3B)2)2'); // { A: 14, B: 4, C: 4 }
 */

function getres (str) {
    let nums = []
    let stack = []
    let ids = []
    let left = []
    let right = []
    const arrToStr = () => {
        if (right.length > 0) {
            let end = right.pop()
            let start = left.pop()
            let repeat = Number(nums.join(''))
            let letter = stack.splice(start, end - start)
            letter.shift()
            letter.pop()
            letter = letter.join('')
            stack.push(...new Array(repeat).fill(letter))
        } else {
            let repeat = Number(nums.join(''))
            let letters = stack.splice(ids.pop())
            let letter = letters.join('')
            stack.push(...new Array(repeat).fill(letter))
        }
        nums = []
    }
    for (const w of str) {
        if (/[A-Za-z]/.test(w) || w === '(') {
            if (nums.length > 0) {
                arrToStr()
            }
            if(w === '(') {
                left.push(stack.length)
            }
            ids.push(stack.length)
            stack.push(w)
        } else if (/\d/.test(w)) {
            nums.push(w)
        } else if (w === ')') {
            stack.push(w)
            right.push(stack.length)
        }
        if (nums.length > 0) {
            arrToStr()
        }
    }
    let result = stack.join('')
    let map = {}
    for (const w of result) {
        map[w] ? map[w]++ : map[w] = 1
    }
    console.log(map)
}
// var str = 'A2B3' // { A: 2, B: 3 }
// var str = 'A(A3B)2' // { A: 7, B: 2 }
var str = 'C4(A(A3B)2)2' // { A: 14, B: 4, C: 4 }
getres(str)
