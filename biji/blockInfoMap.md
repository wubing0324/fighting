blockInfoMap是一个数组，每个item是一个对象，key是模块（module）本身，value是这个模块是u哦以来的模块，也是一个对象，又包含同步模块normalModule和异步模块block

```javascript
0: {NormalModule => Object}
key: NormalModule
binary: false
blocks: [ImportDependenciesBlock]
buildInfo: {cacheable: true, fileDependencies: Set(1), contextDependencies: Set(0), assets: undefined, assetsInfo: undefined, …}
buildMeta: {providedExports: true}
buildTimestamp: 1661232426103
built: true
context: "F:\\webpackLearn\\src"
debugId: 1000
dependencies: []
depth: 0
error: null
errors: []
factoryMeta: {}
generator: JavascriptGenerator {}
hash: undefined
id: null
index: null
index2: null
issuer: null
lineToLine: false
loaders: [{…}]
matchResource: undefined
optimizationBailout: []
parser: Parser {_pluginCompat: SyncBailHook, hooks: {…}, options: {…}, sourceType: 'auto', scope: undefined, …}
prefetched: false
profile: undefined
rawRequest: "./src/index.js"
reasons: [ModuleReason]
renderedHash: undefined
request: "F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js!F:\\webpackLearn\\src\\index.js"
resolveOptions: {}
resource: "F:\\webpackLearn\\src\\index.js"
type: "javascript/auto"
useSourceMap: false
used: null
usedExports: null
userRequest: "F:\\webpackLearn\\src\\index.js"
variables: []
warnings: []
_ast: null
_buildHash: "bca796407c79bde2be9e8962754e6fcc"
_cachedSources: Map(0) {}
_chunks: Set(1) {Chunk}
_lastSuccessfulBuildMeta: {providedExports: true}
_rewriteChunkInReasons: undefined
_source: OriginalSource {_value: "// import 'style-loader!./index.less'\n// import '.…// let fun = () => {console.log('箭头函数')}\n// fun()", _name: 'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js!F:\\webpackLearn\\src\\index.js'}
_sourceSize: null
__proto__: Module {constructor: ƒ, identifier: ƒ, readableIdentifier: ƒ, libIdent: ƒ, nameForCondition: ƒ, …}
arguments: (...)
chunksIterable: (...)
entry: (...)
exportsArgument: (...)
meta: (...)
moduleArgument: (...)
optional: (...)
value:
blocks: Array(1)
0: ImportDependenciesBlock
blocks: []
chunkGroup: undefined
dependencies: [ImportDependency]
groupOptions: {name: null}
loc: SourceLocation {start: Position, end: Position}
module: NormalModule {dependencies: Array(0), blocks: Array(1), variables: Array(0), type: 'javascript/auto', context: 'F:\\webpackLearn\\src', …}
parent: NormalModule {dependencies: Array(0), blocks: Array(1), variables: Array(0), type: 'javascript/auto', context: 'F:\\webpackLearn\\src', …}
range: (2) [64, 87]
request: "./myIndex.vue"
variables: []
__proto__: AsyncDependenciesBlock {constructor: ƒ}
chunkName: (...)
chunks: (...)
length: 1
__proto__: [constructor: ƒ, concat: ƒ, find: ƒ, findIndex: ƒ, pop: ƒ, …]
modules: Set(0)
```