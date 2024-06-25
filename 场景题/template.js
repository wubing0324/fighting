// 通过正则解析字符串，利用索引reg.index切割字符串，将所有字符串包括插值表达式内的变量按顺序存入数组，最后拼接回去，再通过new Function生成render函数
// 目的：将插值表达式转为正确的值并插入字符串，也就是变量字符串转为值字符串
var str = '<p>hey there {{name}}  {{name}}</p><span>wow {{money}}</span>'

function template(str) {
    return function(obj) {
        let arr = []
        let reg = new RegExp(`{{\\s*(.+?)\\s*}}`);
        // 匹配{{}} 添加字符到arr中
        while (str.length) {
            let res = reg.exec(str)
            if (res) {
            let noMatch = str.slice(0, res.index)
            str = str.slice(res.index)
            // 前面没匹配的部分
            arr.push(`_s('${noMatch}')`)
            // 匹配到{{ key }} 获取key
            arr.push(`_getValue('${res[1]}')`)
            str = str.slice(res[0].length)
            } else {
            // 没有匹配了
            arr.push(`_s('${str}')`)
            str = ''
            }
        }
        // 获取obj的值
        obj._getValue = function(key) {
            return this[key]
        }
        // 字符串化
        obj._s = function(val) {
            if (typeof val === 'object') return JSON.stringify(val);
            return val
        }
        let code = arr.join('+')
        console.log('code = ', code)
        let render = new Function(`with(this){return _s(${code})}`)
        // 绑定this指向 并执行
        let template = render.call(obj)
        return template
    }
}
let render = template(str)
var data = {
    name: 'wubing',
    money: '100000000'
}
let t = render(data)
console.log('template = ', t)