index.js
```javascript
import 'style-loader!./index.less'
console.log('我是测试')
```
index.less
```javascript
.parent{
  color: red;
  .child{
    color: green;
  }
}
```

webpack.config.js
```javascript
const path = require('path')
module.exports={
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader', options: {
          strictMath: true,
          noIeCompat: true
        }
      }]
    }]
  }
}
```

当执行webpack打包的时候发生了什么？
先说创建module的过程：
module是什么？module和文件是对应的，例如index.js会有一个module对象，index.less也会有一个
根据文件路径创建module，在创建module之前会先准备好解析这个文件的loader，解析对应loader和创建module的过程在 NormalModuleFactory.js中：
关键的两个方法：factory和resolver，
+ resolver负责解析该文件需要使用的loader。详情：根据文件路径，先解析出其中的内联loader的绝对路径和文件信息，然后创建ruleset对象result，遍历result根据文件后缀匹配出对应的loader，并根据enforce对loader进行分类并存储到相应的数组中,最后解析出loader的绝对路径，并按[post,inline,normal,pre]的顺序拼接loaders = results[0].concat(loaders, results[1], results[2]);拿到最终的loader数组。
>整体过程是：解析index.js，生成index.js对应的loader，其中根据'./index.js'路径解析出来的inline-loader为空，生成loaders,然后创建module，执行run-loader，用解析出来的loader翻译index.js，翻译完成后，将结果通过ast翻译生成ast树，查找其中的require节点，找出index.js的依赖（index.less），递归创建module的过程。执行index.less的module创建过程。直到这一过程，会去解析'style-loader!./index.less'，找到他的内联loader和其他loader。

+ factory：拿到解析后的loader创建module，对于上述文件：
loaderResolver:用于解析loader路径
normalResolver：用于解析文件信息
解析'style-loader!./index.less'内容如下：
```javascript
0:
loader: "F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js"
options: undefined
length: 1
1:
resource: "F:\\webpackLearn\\src\\index.less"
resourceResolveData:
context:
compiler: undefined
issuer: "F:\\webpackLearn\\src\\index.js"
[[Prototype]]: Object
descriptionFileData:
author: ""
dependencies: {css-loader: '^3.6.0', file-loader: '^3.0.1', less: '^3.9.0', less-loader: '^4.1.0', style-loader: '^1.3.0', …}
description: ""
keywords: []
license: "ISC"
main: "index.js"
name: "webpacklearn"
scripts: {test: 'echo "Error: no test specified" && exit 1'}
version: "1.0.0"
[[Prototype]]: Object
descriptionFilePath: "F:\\webpackLearn\\package.json"
descriptionFileRoot: "F:\\webpackLearn"
file: false
module: false
path: "F:\\webpackLearn\\src\\index.less"
query: ""
relativePath: "./src/index.less"
request: undefined
__innerRequest: "./src/index.less"
```

```javascript
    this.ruleSet = new RuleSet(options.defaultRules.concat(options.rules));

    this.hooks.factory.tap("NormalModuleFactory", () => (result, callback) => {
			let resolver = this.hooks.resolver.call(null);

			resolver(result, (err, data) => {
				this.hooks.afterResolve.callAsync(data, (err, result) => {
					let createdModule = this.hooks.createModule.call(result);
					createdModule = this.hooks.module.call(createdModule, result);
					return callback(null, createdModule);
				});
			});
		});
		this.hooks.resolver.tap("NormalModuleFactory", () => (data, callback) => {
			const contextInfo = data.contextInfo;
			const context = data.context;
			const request = data.request;

			const loaderResolver = this.getResolver("loader");
			const normalResolver = this.getResolver("normal", data.resolveOptions);

			let matchResource = undefined;
			let requestWithoutMatchResource = request;
			const matchResourceMatch = MATCH_RESOURCE_REGEX.exec(request);
			if (matchResourceMatch) {
				matchResource = matchResourceMatch[1];
				if (/^\.\.?\//.test(matchResource)) {
					matchResource = path.join(context, matchResource);
				}
				requestWithoutMatchResource = request.substr(
					matchResourceMatch[0].length
				);
			}

			const noPreAutoLoaders = requestWithoutMatchResource.startsWith("-!");
			const noAutoLoaders =
				noPreAutoLoaders || requestWithoutMatchResource.startsWith("!");
			const noPrePostAutoLoaders = requestWithoutMatchResource.startsWith("!!");
			let elements = requestWithoutMatchResource
				.replace(/^-?!+/, "")
				.replace(/!!+/g, "!")
				.split("!");
			let resource = elements.pop();
			elements = elements.map(identToLoaderRequest);

			asyncLib.parallel(
				[
					callback =>
						this.resolveRequestArray(
							contextInfo,
							context,
							elements,
							loaderResolver,
							callback
						),
					callback => {
						if (resource === "" || resource[0] === "?") {
							return callback(null, {
								resource
							});
						}

						normalResolver.resolve(
							contextInfo,
							context,
							resource,
							{},
							(err, resource, resourceResolveData) => {
								if (err) return callback(err);
								callback(null, {
									resourceResolveData,
									resource
								});
							}
						);
					}
				],
				(err, results) => {
					if (err) return callback(err);
					let loaders = results[0];
					const resourceResolveData = results[1].resourceResolveData;
					resource = results[1].resource;

					// translate option idents
					try {
						for (const item of loaders) {
							if (typeof item.options === "string" && item.options[0] === "?") {
								const ident = item.options.substr(1);
								item.options = this.ruleSet.findOptionsByIdent(ident);
								item.ident = ident;
							}
						}
					} catch (e) {
						return callback(e);
					}

					if (resource === false) {
						// ignored
						return callback(
							null,
							new RawModule(
								"/* (ignored) */",
								`ignored ${context} ${request}`,
								`${request} (ignored)`
							)
						);
					}

					const userRequest =
						(matchResource !== undefined ? `${matchResource}!=!` : "") +
						loaders
							.map(loaderToIdent)
							.concat([resource])
							.join("!");

					let resourcePath =
						matchResource !== undefined ? matchResource : resource;
					let resourceQuery = "";
					const queryIndex = resourcePath.indexOf("?");
					if (queryIndex >= 0) {
						resourceQuery = resourcePath.substr(queryIndex);
						resourcePath = resourcePath.substr(0, queryIndex);
					}

					const result = this.ruleSet.exec({
						resource: resourcePath,
						realResource:
							matchResource !== undefined
								? resource.replace(/\?.*/, "")
								: resourcePath,
						resourceQuery,
						issuer: contextInfo.issuer,
						compiler: contextInfo.compiler
					});
					const settings = {};
					const useLoadersPost = [];
					const useLoaders = [];
					const useLoadersPre = [];
					for (const r of result) {
						if (r.type === "use") {
							if (r.enforce === "post" && !noPrePostAutoLoaders) {
								useLoadersPost.push(r.value);
							} else if (
								r.enforce === "pre" &&
								!noPreAutoLoaders &&
								!noPrePostAutoLoaders
							) {
								useLoadersPre.push(r.value);
							} else if (
								!r.enforce &&
								!noAutoLoaders &&
								!noPrePostAutoLoaders
							) {
								useLoaders.push(r.value);
							}
						} else if (
							typeof r.value === "object" &&
							r.value !== null &&
							typeof settings[r.type] === "object" &&
							settings[r.type] !== null
						) {
							settings[r.type] = cachedCleverMerge(settings[r.type], r.value);
						} else {
							settings[r.type] = r.value;
						}
					}
					asyncLib.parallel(
						[
							this.resolveRequestArray.bind(
								this,
								contextInfo,
								this.context,
								useLoadersPost,
								loaderResolver
							),
							this.resolveRequestArray.bind(
								this,
								contextInfo,
								this.context,
								useLoaders,
								loaderResolver
							),
							this.resolveRequestArray.bind(
								this,
								contextInfo,
								this.context,
								useLoadersPre,
								loaderResolver
							)
						],
						(err, results) => {
							if (err) return callback(err);
							if (matchResource === undefined) {
								loaders = results[0].concat(loaders, results[1], results[2]);
							} else {
								loaders = results[0].concat(results[1], loaders, results[2]);
							}
							process.nextTick(() => {
								const type = settings.type;
								const resolveOptions = settings.resolve;
								callback(null, {
									context: context,
									request: loaders
										.map(loaderToIdent)
										.concat([resource])
										.join("!"),
									dependencies: data.dependencies,
									userRequest,
									rawRequest: request,
									loaders,
									resource,
									matchResource,
									resourceResolveData,
									settings,
									type,
									parser: this.getParser(type, settings.parser),
									generator: this.getGenerator(type, settings.generator),
									resolveOptions
								});
							});
						}
					);
				}
			);
		});
```