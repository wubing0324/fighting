;(function(graph) {
  // 重写require函数
  function require(moduleId) {
    // 找到对应moduleId的依赖对象,调用require函数,eval执行,拿到exports对象
    function localRequire(relativePath) {
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



(function (modules) {
  // The module cache
  var installedModules = {};
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
         if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
         var ns = Object.create(null);
         __webpack_require__.r(ns);
         Object.defineProperty(ns, 'default', { enumerable: true, value: value });
         if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        return ns;
  };


  __webpack_require__.n = function (module) {
         var getter = module && module.__esModule ?
             function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
         __webpack_require__.d(getter, 'a', getter);
         return getter;
  };


  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };


  // __webpack_public_path__
  __webpack_require__.p = "";




  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
  /************************************************************************/
  ({


"./src/add-content.js":(function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(){\r\n    document.write(\"Hello world\")\r\n});\n\n//# sourceURL=webpack:///./src/add-content.js?");
    }),


"./src/main.js":(function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-content */ \"./src/add-content.js\");\n\r\n\r\ndocument.write(\"My first Webpack Demo!
\")\r\n\r\nObject(_add_content__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n//# sourceURL=webpack:///./src/main.js?");
      })
  });