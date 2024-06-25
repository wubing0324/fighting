// 小红书一面
// 编码：
// 解析url为：
// {
//     "protocol": "http",
//     "hoshostname": "www.domain.com",
//     "path": "order",
//     "query": {
//       "user": "anonymous",
//       "id": "456",
//       "city": "北京",
//       "enabled": true
//     }
// }

// 需要解析的链接：
const url = 'http://www.domain.com/order?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
const url1 = 'https://www.domain.com/order?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&disable'
const url2 = 'http://localhost:8080/emergencyCommand/emergencyEvent/eventNode?id=157&pageType=emgc&readonly&editable=false'


const parseQuey = (query) => {
    let map = {
        enabled: true,
        disable: false
    }
    let result = {}
    let q = query.split('&')
    q.forEach(item => {
        let res = item.split('=')
        if (res.length > 1) {
            result[res[0]] = decodeURI(res[1])
        } else {
            result[res[0]] = Object.prototype.hasOwnProperty.call(map, res[0]) ? map[res[0]] : true
            
        }
    })
    return result
}
function parse(url) {
    var protocol = /(http[s]?):\/\/([^/]+?)(\/[^?]+)\?(.+)/
    let result = protocol.exec(url)
    let obj = {
        protocol: result[1],
        hoshostname: result[2],
        path: result[3],
    }
    if (result[4]) {
        let q = parseQuey(result[4])
        obj.query = q
    }
    console.log(obj)
}

parse(url)
parse(url1)
parse(url2)