var opt = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: 'D:\\webpackLearn\\dist',
    chunkFilename: '[id].bundle.js',
    webassemblyModuleFilename: '[modulehash].module.wasm',
    library: '',
    hotUpdateFunction: 'webpackHotUpdate',
    jsonpFunction: 'webpackJsonp',
    chunkCallbackName: 'webpackChunk',
    globalObject: 'window',
    devtoolNamespace: '',
    libraryTarget: 'var',
    pathinfo: false,
    sourceMapFilename: '[file].map[query]',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
    crossOriginLoading: false,
    jsonpScriptType: false,
    chunkLoadTimeout: 120000,
    hashFunction: 'md4',
    hashDigest: 'hex',
    hashDigestLength: 20,
    devtoolLineToLine: false,
    strictModuleExceptionHandling: false
  },
  module: {
    rules: [ [Object], [Object] ],
    unknownContextRequest: '.',
    unknownContextRegExp: false,
    unknownContextRecursive: true,
    unknownContextCritical: true,
    exprContextRequest: '.',
    exprContextRegExp: false,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    strictExportPresence: false,
    strictThisContextOnImports: false,
    unsafeCache: false,
    defaultRules: [ [Object], [Object], [Object], [Object] ]
  },
  devtool: 'eval-source-map',
  context: 'D:\\webpackLearn',
  cache: false,
  target: 'web',
  node: {
    console: false,
    process: true,
    global: true,
    Buffer: true,
    setImmediate: true,
    __filename: 'mock',
    __dirname: 'mock'
  },
  performance: { maxAssetSize: 250000, maxEntrypointSize: 250000, hints: 'warning' },
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 109,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: [Object]
    },
    runtimeChunk: undefined,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    mangleWasmImports: false,
    namedModules: false,
    hashedModuleIds: false,
    namedChunks: false,
    portableRecords: false,
    minimize: true,
    minimizer: [ [Object] ],
    nodeEnv: 'production'
  },
  resolve: {
    unsafeCache: true,
    modules: [ 'node_modules' ],
    extensions: [ '.wasm', '.mjs', '.js', '.json' ],
    mainFiles: [ 'index' ],
    aliasFields: [ 'browser' ],
    mainFields: [ 'browser', 'module', 'main' ],
    cacheWithContext: false
  },
  resolveLoader: {
    unsafeCache: true,
    mainFields: [ 'loader', 'main' ],
    extensions: [ '.js', '.json' ]
  }
}
var str = 'resolveLoader.mainFiles'
var bool = ['index']

const setProperty = (obj, path, value) => {
	let name = path.split(".");
	for (let i = 0; i < name.length - 1; i++) {
		if (typeof obj[name[i]] !== "object" && obj[name[i]] !== undefined) return;
		if (Array.isArray(obj[name[i]])) return;
		if (!obj[name[i]]) obj[name[i]] = {};
		obj = obj[name[i]];
	}
	obj[name.pop()] = value;
};
setProperty(opt, str, bool)
//将opt中的resolveLoader对象拿出来，并把mainFiles作为一个key赋值给resolveLoader对象，value就是传进来的参数value。总结：为resolveLoader添加mainFiles属性