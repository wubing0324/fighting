;(function(graph) {
  // 重写require函数
  function require(moduleId) {
    // 找到对应moduleId的依赖对象,调用require函数,eval执行,拿到exports对象
    function localRequire(relativePath) {
      debugger
      return require(graph[moduleId].dependecies[relativePath]) // {__esModule: true, say: ƒ say(name)}
    }
    // 定义exports对象
    var exports = {}
    ;(function(require, exports, code) {
      // commonjs语法使用module.exports暴露实现,我们传入的exports对象会捕获依赖对象(hello.js)暴露的实现(exports.say = say)并写入
      eval(code)
    })(localRequire, exports, graph[moduleId].code)
    // 暴露exports对象,即暴露依赖对象对应的实现
    return exports
  }
  // 从入口文件开始执行
  require('./src/index.js')
})({
  './src/index.js': {
    dependecies: { './hello.js': './src/hello.js' },
    code: '"use strict";\n\nvar _hello = require("./hello.js");\n\ndocument.write((0, _hello.say)("webpack"));'
  },
  './src/hello.js': {
    dependecies: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.say = say;\n\nfunction say(name) {\n  return "hello ".concat(name);\n}'
  }
})