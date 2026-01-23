一、基础分包配置

```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // 第三方库分离
          vendor: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          // 公共代码分离
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
};
```

二、进阶优化策略

1. 按路由动态分包（推荐）

```javascript
module.exports = {
  chainWebpack: (config) => {
    config.plugin("prefetch").tap((options) => {
      options[0].fileBlacklist = options[0].fileBlacklist || [];
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
      return options;
    });

    // 按路由拆分
    config.optimization.splitChunks({
      chunks: "async",
      maxSize: 244 * 1024, // 每个包最大244KB
      minSize: 20 * 1024, // 最小20KB
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        components: {
          name: "chunk-components",
          test: /[\\/]src[\\/]components[\\/]/,
          priority: 30,
        },
        utils: {
          name: "chunk-utils",
          test: /[\\/]src[\\/]utils[\\/]/,
          priority: 20,
        },
      },
    });
  },
};
```

2. 单独提取大体积库

```javascript
module.exports = {
  configureWebpack: {
    externals: {
      // 通过CDN引入的大型库
      echarts: "echarts",
      monaco: "monaco-editor",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          echarts: {
            name: "chunk-echarts",
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: 40,
            enforce: true,
          },
          elementUI: {
            name: "chunk-elementui",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 30,
          },
        },
      },
    },
  },
};
```

三、配合懒加载使用

1. 路由懒加载配置

```javascript
// router.js
const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const About = () => import(/* webpackChunkName: "about" */ "./views/About.vue");
```

2. 组件级懒加载

```javascript
// 在组件中使用
export default {
  components: {
    "heavy-component": () =>
      import(/* webpackChunkName: "heavy" */ "./HeavyComponent.vue"),
  },
};
```

四、分析工具辅助

1. 添加打包分析插件

```javascript
module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
};
```

2. 查看分包效果
   运行构建命令后：

```javascript
npm run build --report
```

五、最佳实践建议
首屏关键资源应控制在 200KB 以内

分包数量建议不超过 10 个（HTTP/2 环境下可适当增加）

长期缓存策略：

```javascript
module.exports = {
  configureWebpack: {
    output: {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js",
    },
  },
};
```

预加载关键资源：

```javascript
// 在入口文件主动引入
import(/* webpackPreload: true */ "./core-polyfills.js");
```

六、完整配置示例

```javascript
// vue.config.js
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js",
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxSize: 244 * 1024,
        minSize: 20 * 1024,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: "~",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 20,
          },
          common: {
            name: "common",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
          styles: {
            name: "styles",
            test: /\.(css|less)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("prefetch").tap((options) => {
      options[0].fileBlacklist = [/\.map$/, /pdfMake\\.js$/];
      return options;
    });
  },
};
```
