/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */
var input = {
    a: 1,
    b: [ 1, 2, { c: true }, [ 3 ] ],
    d: { e: 2, f: 3 },
    g: null,
    f: 0,
    g: undefined
}
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
}
function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

function getRes(source) {
    const dfs = (src, tar, path) => {
        if (typeof src !== 'object') {
            if (src !== 0 && !src) return
            target[path] = src
            return
        }
        if (isArray(src)) {
            for (let i = 0; i < src.length; i++) {
                dfs(src[i], tar, `${path}[${i}]`)
            }
        }
        if (isObject(src)) {
            let keys = Object.keys(src)
            for (let i = 0; i < keys.length; i++) {
                dfs(src[keys[i]], tar, path ? `${path}.${keys[i]}` : `${keys[i]}`)
            }
        }
    }
    const target = {}
    dfs(source, target, '')
    console.log(target)
}

getRes(input)
