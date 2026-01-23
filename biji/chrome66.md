<!-- 主应用修改 -->

```javascript
// .browserslistrc
Chrome >= 66

// babel.config.js
[
  '@vue/cli-plugin-babel/preset',
  {
    useBuiltIns: 'entry',
    corejs: 3,
  },
]

// main.js
// 引入 core-js polyfill 以支持 Chrome 66 等旧版浏览器
import 'core-js/stable'

// vue.config.js
// 确保转译 qiankun 以支持 Chrome 66
transpileDependencies: ['qiankun'],
```

<!-- 子应用修改 -->

```javascript
// .browserslistrc
Chrome >= 66;
Firefox >= 60;
Safari >= 11;
Edge >= 79;

// babel.config.js
plugins: [
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-proposal-nullish-coalescing-operator",
];
```
