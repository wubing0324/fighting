##### 为什么浏览器环境可以拿到process.env.NODE_ENV？

1. DefinePlugin 插件
DefinePlugin 插件是 Webpack 提供的一个内置插件，用于在编译时创建全局常量。这些常量在构建后的代码中会被替换为指定的值。这个插件的主要作用是注入环境变量或者其他配置参数，使得它们在运行时可以被访问。

2. 配置 DefinePlugin
首先，你需要在 Webpack 配置文件中引入并配置 DefinePlugin 插件。例如：
```javascript
const webpack = require('webpack');

module.exports = {
    // 其他配置项
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        })
    ]
};

```
在这个配置中，process.env.NODE_ENV 和 process.env.API_URL 被定义为全局常量。注意，我们使用 JSON.stringify 来确保这些值被正确地作为字符串注入。

3. 插件的工作原理
当 Webpack 构建项目时，DefinePlugin 插件会扫描你的源代码，寻找所有匹配的标识符，并将它们替换为你在配置中指定的值。
也即是在webpack编译后的代码中寻找process.env.xxx,然后替换为上述配置中的变量

例如，如果源代码中有以下内容：
```javascript
if ('production' === 'production') {
    console.log('Production mode');
} else {
    console.log('Development mode');
}

console.log('API URL:', 'https://api.example.com');

```

##### 那么又是如何读取项目中的.env.development、.env.xxx的呢？

1.首先在package.json中定义env.NODE_ENV的值

```javascript
{
    "scripts": {
        "build:development": "webpack --env NODE_ENV=development",
        "build:production": "webpack --env NODE_ENV=production"
    }
}
```
2.然后执行npm run build:development，那么当前env.NODE_ENV=development，接下来就要获取.env.development中定义的变量
通过dotenv 包，这个包可以解析 .env 文件并将其中的变量加载到 process.env 中。
```
npm install dotenv --save
```
3.使用DefinePlugin接收这些变量
```javascript
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

module.exports = (env) => {
    // 根据当前环境加载对应的 .env 文件
    const envPath = path.resolve(__dirname, `.env.${env.NODE_ENV}`);
    const fileEnv = dotenv.config({ path: envPath }).parsed;

    // 创建一个包含所有环境变量的对象
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        // 其他配置项
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ]
    };
};
```