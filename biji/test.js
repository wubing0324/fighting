/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2023-02-01 10:55:12
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-02-01 10:58:02
 * @FilePath: \biji\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function test(source) {
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(source)
  const name = match[0]

  console.log(name)
}
test('<div @click="clickme" v-model="fundid" :color="colorId">')
test('=')