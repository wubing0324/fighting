import parse from './p.js'
console.log(parse)
// var template1 = `<div id="app" :testDyncAttr="testDyncAttr">
// <!-- <div v-if="flag" ref='message'>{{ message }}</div> -->
// <!-- <div v-else>{{ randomNum }}</div> -->
// <button @click="change">change</button>
// <button @click="toggle">toggle</button>
// <!-- <button-counter></button-counter> -->
// <ul>
//   <li v-for="(item, index) in datalist">{{item}}</li>
// </ul>
// </div>`
// var template2 = `<div id="app">
// <div class="class1 class2">
//   <p></p>
//   <br/>
// </div>
// <input/>
// </div>`
// let root = parse(template.trim(), {shouldKeepComment: true})
// console.log(root)