
// 用replace
// function template(str) {
//     return function(obj) {
//       for (let key in obj) {
//         let reg = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
//         str = str.replace(reg, obj[key])
//       }
//       return str
//     }
//   }

//   // Vue的方式：拼字符串 使用 new Function + with 模板引擎编译
//   // 匹配 截取字符串 装进数组里面
//   function template(str) {
//     return function(obj) {
//       let arr = []
//       let reg = new RegExp(`{{\\s*(.+?)\\s*}}`);
//       // 匹配{{}} 添加字符到arr中
//       while (str.length) {
//         let res = reg.exec(str)
//         if (res) {
//           let noMatch = str.slice(0, res.index)
//           str = str.slice(res.index)
//           // 前面没匹配的部分
//           arr.push(`_s('${noMatch}')`)
//           // 匹配到{{ key }} 获取key
//           arr.push(`_getValue('${res[1]}')`)
//           str = str.slice(res[0].length)
//         } else {
//           // 没有匹配了
//           arr.push(`_s('${str}')`)
//           str = ''
//         }
//       }
//       // 获取obj的值
//       obj._getValue = function(key) {
//         return this[key]
//       }
//       // 字符串化
//       obj._s = function(val) {
//         if (typeof val === 'object') return JSON.stringify(val);
//         return val
//       }
//       // arr: ['<p>hey there ', 'name', ' ', 'name', '</p>']
//       let code = arr.join('+')
//       let render = new Function(`with(this){return _s(${code})}`)
//       // 绑定this指向 并执行
//       let template = render.call(obj)
//       return template
//     }
//   }

//   var tpl = template('<p>hey there {{ name }} {{ name }}</p>');
//   let res = tpl({ name: 'Neo' });

//   console.log('template', res)

// var str = '<p>hey there {{name}} {{name}}</p><span>wow {{money}}</span>'


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