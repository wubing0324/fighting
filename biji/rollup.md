纯组件库 → 选择 Rollup（更小的体积、更好的 Tree Shaking）

关于组件库依赖 ElementUI 的打包问题
当你的组件库中包含类似 import ElSelect from 'element-ui/lib/select' 的代码时，默认情况下 Rollup/Webpack 不会将 ElementUI 打包进你的最终产物，但需要正确配置外部依赖（externals）。以下是具体分析和解决方案：

🔍 关键问题分析
默认行为
如果不做特殊配置，打包工具会：

将 element-ui 视为普通依赖

错误地将 ElementUI 代码打包进你的组件库 → 导致体积暴增

正确做法
需要显式声明 element-ui 为 外部依赖（external），这样：

打包时会保留 import 语句

实际使用你的库时，由最终用户的项目安装 ElementUI

🛠 配置方案（Rollup 示例）

```javascript
// rollup.config.js
export default {
  // 标记 element-ui 及其子路径为外部依赖
  external: [
    "element-ui",
    /^element-ui\/lib\/.+$/, // 匹配所有 element-ui/lib/xxx 的导入
  ],
  output: {
    globals: {
      "element-ui": "ELEMENT", // 告知 UMD 打包时使用全局变量 ELEMENT
      vue: "Vue",
    },
  },
  plugins: [
    /*...*/
  ],
};
```

📦 配套的 package.json 配置

```javascript
{
  "peerDependencies": {
    "element-ui": "^2.15.0",
    "vue": "^2.6.0"
  },
  "dependencies": {
    // 你的其他真实依赖...
  }
}
```

🌟 为什么这样做？
避免重复打包

你的库声明 ElementUI 为 peerDependencies

用户的项目需要自行安装 element-ui

最终项目中 ElementUI 只会存在一份
