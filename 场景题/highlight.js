const data = ["上海野生动物园", "上饶野生动物园", "北京巷子", "上海中心", "上海黄埔江", "迪士尼上海", "陆家嘴上海中心"]
function handleInput(value) {
    const reg = new RegExp(`\(${value}\)`);
    console.log('reg= ', reg)
    const search = data.reduce((res, cur) => {
      if (reg.test(cur)) {
        const match = RegExp.$1;
        res.push(`<li>${cur.replace(match, '<bdi>$&</bdi>')}</li>`);
      }
      return res;
    }, []);
    return search;
}

// let  result = handleInput('上海')

// console.log(result)

function handleInput2(value) {
    const reg = /【[^【】]+】/
    const search = value.replace(reg, '<bdi>$&</bdi>')
    return search;
}
var str = '好看好看户籍科户籍科户籍科户籍科【浙A123456】会尽快汇款和客户回款'
console.log(handleInput2(str))