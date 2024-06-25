/**
 * @name wubing
 * @Date 2024-02-23 13:59:43
 * @description 将整数转为带千分位分隔符，的格式;
 * 利用先行断言和从结尾匹配从后往前找到只要一个整数后面跟着三个整数，那么在一个整数后面添加,
 * @param {参数类型} 参数 参数说明
 * @return {返回类型说明}
 */
export const toThousands = (num) => {
    var s = (num || 0).toString().split('.')
    var pre = s[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    if (s.length > 1) return pre + '.' + s[1]
    return pre
}
