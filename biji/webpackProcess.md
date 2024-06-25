要理解webpack流程，需要先了解几个概念：
compiler：控制整个编译流程的对象
compilation：编译对象
NormalModule: module构造函数，用于创建module
NormalModuleFactory: 管理module的创建，module的创建是需要前置条件的，例如module的loader，NormalModule只负责接收参数创建module，loader的获取逻辑等前置条件的处理放在NormalModuleFactory中，每个compilation有一个NormalModuleFactory对象

```javascript
// webpack.js

// options: {
//   context: "F:\\webpackLearn"
//   devtool: "eval"
//   entry: "./src/index.js"
//   mode: "development"
//   module:
//   defaultRules: [
//     {type: 'javascript/auto', resolve: {…}}
//     {test: /\.mjs$/i, type: 'javascript/esm', resolve: {…}}
//     {test: /\.json$/i, type: 'json'}
//     {test: /\.wasm$/i, type: 'webassembly/experimental'}
//   ],
//   rules: [
//     0: {loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\pitcher.js', resourceQuery: ƒ}
//     1: {use: Array(1), resource: ƒ, resourceQuery: ƒ}
//     2: {loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\templateLoader.js', options: {…}, resourceQuery: ƒ}
//     3: {use: Array(1), resource: ƒ, resourceQuery: ƒ}
//     4: {use: Array(3), resource: ƒ, resourceQuery: ƒ}
//     5: {use: Array(1), resource: ƒ}
//     6: {use: Array(1), resource: ƒ}
//     7: {use: Array(3), resource: ƒ}
//   ]
//   optimization:{
//     checkWasmTypes: false
//     concatenateModules: false
//     flagIncludedChunks: false
//     hashedModuleIds: false
//     mangleWasmImports: false
//     mergeDuplicateChunks: true
//     minimize: false
//     minimizer: [{…}]
//     namedChunks: true
//     namedModules: true
//     noEmitOnErrors: false
//     nodeEnv: "development"
//     occurrenceOrder: false
//     portableRecords: false
//     providedExports: true
//     removeAvailableModules: false
//     removeEmptyChunks: true
//     runtimeChunk: undefined
//     sideEffects: false
//     splitChunks: {hidePathInfo: false, chunks: 'async', minSize: 10000, minChunks: 1, maxAsyncRequests: Infinity, …}
//     usedExports: false
//   },
//   output: {
//     chunkCallbackName: "webpackChunk"
//     chunkFilename: "[name].js"
//     chunkLoadTimeout: 120000
//     crossOriginLoading: false
//     devtoolLineToLine: false
//     devtoolNamespace: ""
//     filename: "[name].js"
//     globalObject: "window"
//     hashDigest: "hex"
//     hashDigestLength: 20
//     hashFunction: "md4"
//     hotUpdateChunkFilename: "[id].[hash].hot-update.js"
//     hotUpdateFunction: "webpackHotUpdate"
//     hotUpdateMainFilename: "[hash].hot-update.json"
//     jsonpFunction: "webpackJsonp"
//     jsonpScriptType: false
//     library: ""
//     libraryTarget: "var"
//     path: "F:\\webpackLearn\\dist"
//   }
// }
const webpack = (options, callback) => {
  options = new WebpackOptionsDefaulter().process(options);
  let compiler = new Compiler(options.context);
  compiler.run(callback);
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
      } else {
        plugin.apply(compiler);
      }
    }
  }
}
```

```javascript
// compiler.js

run(callback) {

  const finalCallback = (err, stats) => {
    // 编译结束的回调
  };

  const onCompiled = (err, compilation) => {

    if (this.hooks.shouldEmit.call(compilation) === false) {
      this.hooks.done.callAsync(stats, err => {
        return finalCallback(null, stats);
      });
      return;
    }


  this.hooks.beforeRun.callAsync(this, err => {
    this.hooks.run.callAsync(this, err => {
      this.compile(onCompiled);
    });
  });
}

compile(callback) {
  const params = this.newCompilationParams();
  this.hooks.beforeCompile.callAsync(params, err => {
    if (err) return callback(err);

    this.hooks.compile.call(params);

    const compilation = this.newCompilation(params);

    this.hooks.make.callAsync(compilation, err => {
      if (err) return callback(err);

      compilation.finish(err => {
        if (err) return callback(err);

        compilation.seal(err => {
          if (err) return callback(err);

          this.hooks.afterCompile.callAsync(compilation, err => {
            if (err) return callback(err);

            return callback(null, compilation);
          });
        });
      });
    });
  });
}

newCompilationParams() {
  const params = {
    normalModuleFactory: this.createNormalModuleFactory(),
    contextModuleFactory: this.createContextModuleFactory(),
    compilationDependencies: new Set()
  };
  return params;
}
newCompilation(params) {
  const compilation = this.createCompilation();
  compilation.fileTimestamps = this.fileTimestamps;
  compilation.contextTimestamps = this.contextTimestamps;
  compilation.name = this.name;
  compilation.records = this.records;
  compilation.compilationDependencies = params.compilationDependencies;
  this.hooks.thisCompilation.call(compilation, params);
  this.hooks.compilation.call(compilation, params);
  return compilation;
}
createNormalModuleFactory() {
  const normalModuleFactory = new NormalModuleFactory(
    this.options.context,
    this.resolverFactory,
    this.options.module || {}
  );
  this.hooks.normalModuleFactory.call(normalModuleFactory);
  return normalModuleFactory;
}
```

```javascript
// SingleEntryPlugin.js

apply(compiler) {
  // 第二个参数
  // params： {
  // 	normalModuleFactory: this.createNormalModuleFactory(),
  // 	contextModuleFactory: this.createContextModuleFactory(),
  // 	compilationDependencies: new Set()
  // };
  compiler.hooks.compilation.tap(
    "SingleEntryPlugin",
    (compilation, { normalModuleFactory }) => {
      compilation.dependencyFactories.set(
        SingleEntryDependency,
        normalModuleFactory
      );
    }
  );

  compiler.hooks.make.tapAsync(
    "SingleEntryPlugin",
    (compilation, callback) => {
      const { entry, name, context } = this;

      const dep = SingleEntryPlugin.createDependency(entry, name);
      compilation.addEntry(context, dep, name, callback);
    }
  );
}
```

```javascript
// Compilation.js

addEntry(context, entry, name, callback) {
  this._addModuleChain(
    context,
    entry,
    module => {
      this.entries.push(module);
    },
    (err, module) => {
      return callback(null, module);
    }
  );
}

_addModuleChain(context, dependency, onModule, callback) {
  const moduleFactory = this.dependencyFactories.get(Dep);
  this.semaphore.acquire(() => {
    moduleFactory.create(
      {
        contextInfo: {
          issuer: "",
          compiler: this.compiler.name
        },
        context: context,
        dependencies: [dependency]
      },
      (err, module) => {

        const afterBuild = () => {
          if (addModuleResult.dependencies) {
            this.processModuleDependencies(module, err => {
              if (err) return callback(err);
              callback(null, module);
            });
          } else {
            return callback(null, module);
          }
        };

        if (addModuleResult.issuer) {
          if (currentProfile) {
            module.profile = currentProfile;
          }
        }

        if (addModuleResult.build) {
          this.buildModule(module, false, null, null, err => {
            if (err) {
              this.semaphore.release();
              return errorAndCallback(err);
            }

            if (currentProfile) {
              const afterBuilding = Date.now();
              currentProfile.building = afterBuilding - afterFactory;
            }

            this.semaphore.release();
            afterBuild();
          });
        } else {
          this.semaphore.release();
          this.waitForBuildingFinished(module, afterBuild);
        }
      }
    );
  });
}

buildModule(module, optional, origin, dependencies, thisCallback) {
  let callbackList = this._buildingModules.get(module);
  if (callbackList) {
    callbackList.push(thisCallback);
    return;
  }
  this._buildingModules.set(module, (callbackList = [thisCallback]));

  const callback = err => {
    this._buildingModules.delete(module);
    for (const cb of callbackList) {
      cb(err);
    }
  };

  this.hooks.buildModule.call(module);
  module.build(
    this.options,
    this,
    this.resolverFactory.get("normal", module.resolveOptions),
    this.inputFileSystem,
    error => {
      const errors = module.errors;
      for (let indexError = 0; indexError < errors.length; indexError++) {
        const err = errors[indexError];
        err.origin = origin;
        err.dependencies = dependencies;
        if (optional) {
          this.warnings.push(err);
        } else {
          this.errors.push(err);
        }
      }

      const warnings = module.warnings;
      for (
        let indexWarning = 0;
        indexWarning < warnings.length;
        indexWarning++
      ) {
        const war = warnings[indexWarning];
        war.origin = origin;
        war.dependencies = dependencies;
        this.warnings.push(war);
      }
      const originalMap = module.dependencies.reduce((map, v, i) => {
        map.set(v, i);
        return map;
      }, new Map());
      module.dependencies.sort((a, b) => {
        const cmp = compareLocations(a.loc, b.loc);
        if (cmp) return cmp;
        return originalMap.get(a) - originalMap.get(b);
      });
      if (error) {
        this.hooks.failedModule.call(module, error);
        return callback(error);
      }
      this.hooks.succeedModule.call(module);
      return callback();
    }
  );
}
```
```javascript
// NormalModuleFactory.js

this.ruleSet = new RuleSet(options.defaultRules.concat(options.rules));
this.cachePredicate =
  typeof options.unsafeCache === "function"
    ? options.unsafeCache
    : Boolean.bind(null, options.unsafeCache);
this.context = context || "";
this.parserCache = Object.create(null);
this.generatorCache = Object.create(null);
this.hooks.factory.tap("NormalModuleFactory", () => (result, callback) => {
  let resolver = this.hooks.resolver.call(null);

  // Ignored
  if (!resolver) return callback();

  resolver(result, (err, data) => {
    if (err) return callback(err);

    // Ignored
    if (!data) return callback();

    // direct module
    if (typeof data.source === "function") return callback(null, data);

    this.hooks.afterResolve.callAsync(data, (err, result) => {
      if (err) return callback(err);

      // Ignored
      if (!result) return callback();
debugger
// result: {
// 	context: "F:\\webpackLearn\\src"
// 	loaders: [{loader: "F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js"}]
// 	parser: Parser {_pluginCompat: SyncBailHook, hooks: {…}, options: {…}, sourceType: 'auto', scope: undefined, …}
// 	rawRequest: "./src/index.js"
// 	request: "F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js!F:\\webpackLearn\\src\\index.js"
// 	resolveOptions: {}
// 	resource: "F:\\webpackLearn\\src\\index.js"
// 	type: "javascript/auto"
// 	useSourceMap: false
// 	userRequest: "F:\\webpackLearn\\src\\index.js"
// }
      let createdModule = this.hooks.createModule.call(result);
      if (!createdModule) {
        if (!result.request) {
          return callback(new Error("Empty dependency (no request)"));
        }

        createdModule = new NormalModule(result);
      }

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

create(data, callback) {
  const dependencies = data.dependencies;
  const cacheEntry = dependencyCache.get(dependencies[0]);
  if (cacheEntry) return callback(null, cacheEntry);
  const context = data.context || this.context;
  const resolveOptions = data.resolveOptions || EMPTY_RESOLVE_OPTIONS;
  const request = dependencies[0].request;
  const contextInfo = data.contextInfo || {};
  this.hooks.beforeResolve.callAsync(
    {
      contextInfo,
      resolveOptions,
      context,
      request,
      dependencies
    },
    (err, result) => {
      if (err) return callback(err);

      // Ignored
      if (!result) return callback();

      const factory = this.hooks.factory.call(null);

      // Ignored
      if (!factory) return callback();

      factory(result, (err, module) => {
        if (err) return callback(err);

        if (module && this.cachePredicate(module)) {
          for (const d of dependencies) {
            dependencyCache.set(d, module);
          }
        }

        callback(null, module);
      });
    }
  );
}
```

```javascript
// NormalModule.js

doBuild(options, compilation, resolver, fs, callback) {
  const loaderContext = this.createLoaderContext(
    resolver,
    options,
    compilation,
    fs
  );
  // console.log('start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  // console.log(this.resource)
  // console.log(this.loaders)
  // console.log('end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  runLoaders(
    {
      resource: this.resource,
      loaders: this.loaders,
      context: loaderContext,
      readResource: fs.readFile.bind(fs)
    },
    (err, result) => {
      if (result) {
        this.buildInfo.cacheable = result.cacheable;
        this.buildInfo.fileDependencies = new Set(result.fileDependencies);
        this.buildInfo.contextDependencies = new Set(
          result.contextDependencies
        );
      }

      if (err) {
        if (!(err instanceof Error)) {
          err = new NonErrorEmittedError(err);
        }
        const currentLoader = this.getCurrentLoader(loaderContext);
        const error = new ModuleBuildError(this, err, {
          from:
            currentLoader &&
            compilation.runtimeTemplate.requestShortener.shorten(
              currentLoader.loader
            )
        });
        return callback(error);
      }

      const resourceBuffer = result.resourceBuffer;
      const source = result.result[0];
      const sourceMap = result.result.length >= 1 ? result.result[1] : null;
      const extraInfo = result.result.length >= 2 ? result.result[2] : null;

      if (!Buffer.isBuffer(source) && typeof source !== "string") {
        const currentLoader = this.getCurrentLoader(loaderContext, 0);
        const err = new Error(
          `Final loader (${
            currentLoader
              ? compilation.runtimeTemplate.requestShortener.shorten(
                  currentLoader.loader
                )
              : "unknown"
          }) didn't return a Buffer or String`
        );
        const error = new ModuleBuildError(this, err);
        return callback(error);
      }

      this._source = this.createSource(
        this.binary ? asBuffer(source) : asString(source),
        resourceBuffer,
        sourceMap
      );
      this._sourceSize = null;
      this._ast =
        typeof extraInfo === "object" &&
        extraInfo !== null &&
        extraInfo.webpackAST !== undefined
          ? extraInfo.webpackAST
          : null;
      return callback();
    }
  );
}

build(options, compilation, resolver, fs, callback) {
  this.buildTimestamp = Date.now();
  this.built = true;
  this._source = null;
  this._sourceSize = null;
  this._ast = null;
  this._buildHash = "";
  this.error = null;
  this.errors.length = 0;
  this.warnings.length = 0;
  this.buildMeta = {};
  this.buildInfo = {
    cacheable: false,
    fileDependencies: new Set(),
    contextDependencies: new Set(),
    assets: undefined,
    assetsInfo: undefined
  };

  return this.doBuild(options, compilation, resolver, fs, err => {
    this._cachedSources.clear();

    // if we have an error mark module as failed and exit
    if (err) {
      this.markModuleAsErrored(err);
      this._initBuildHash(compilation);
      return callback();
    }

    // check if this module should !not! be parsed.
    // if so, exit here;
    const noParseRule = options.module && options.module.noParse;
    if (this.shouldPreventParsing(noParseRule, this.request)) {
      this._initBuildHash(compilation);
      return callback();
    }

    const handleParseError = e => {
      const source = this._source.source();
      const loaders = this.loaders.map(item =>
        contextify(options.context, item.loader)
      );
      const error = new ModuleParseError(this, source, e, loaders);
      this.markModuleAsErrored(error);
      this._initBuildHash(compilation);
      return callback();
    };

    const handleParseResult = result => {
      this._lastSuccessfulBuildMeta = this.buildMeta;
      this._initBuildHash(compilation);
      return callback();
    };

    try {
      const result = this.parser.parse(
        this._ast || this._source.source(),
        {
          current: this,
          module: this,
          compilation: compilation,
          options: options
        },
        (err, result) => {
          if (err) {
            handleParseError(err);
          } else {
            handleParseResult(result);
          }
        }
      );
      if (result !== undefined) {
        // parse is sync
        handleParseResult(result);
      }
    } catch (e) {
      handleParseError(e);
    }
  });
}
```

```javascript
addModuleDependencies(
  module,
  dependencies,
  bail,
  cacheGroup,
  recursive,
  callback
) {
  const start = this.profile && Date.now();
  const currentProfile = this.profile && {};

  asyncLib.forEach(
    dependencies,
    (item, callback) => {
      const dependencies = item.dependencies;

      const errorAndCallback = err => {
        err.origin = module;
        err.dependencies = dependencies;
        this.errors.push(err);
        if (bail) {
          callback(err);
        } else {
          callback();
        }
      };
      const warningAndCallback = err => {
        err.origin = module;
        this.warnings.push(err);
        callback();
      };

      const semaphore = this.semaphore;
      semaphore.acquire(() => {
        const factory = item.factory;
        factory.create(
          {
            contextInfo: {
              issuer: module.nameForCondition && module.nameForCondition(),
              compiler: this.compiler.name
            },
            resolveOptions: module.resolveOptions,
            context: module.context,
            dependencies: dependencies
          },
          (err, dependentModule) => {
            let afterFactory;

            const isOptional = () => {
              return dependencies.every(d => d.optional);
            };

            const errorOrWarningAndCallback = err => {
              if (isOptional()) {
                return warningAndCallback(err);
              } else {
                return errorAndCallback(err);
              }
            };

            if (err) {
              semaphore.release();
              return errorOrWarningAndCallback(
                new ModuleNotFoundError(module, err)
              );
            }
            if (!dependentModule) {
              semaphore.release();
              return process.nextTick(callback);
            }
            if (currentProfile) {
              afterFactory = Date.now();
              currentProfile.factory = afterFactory - start;
            }

            const iterationDependencies = depend => {
              for (let index = 0; index < depend.length; index++) {
                const dep = depend[index];
                dep.module = dependentModule;
                dependentModule.addReason(module, dep);
              }
            };

            const addModuleResult = this.addModule(
              dependentModule,
              cacheGroup
            );
            dependentModule = addModuleResult.module;
            iterationDependencies(dependencies);

            const afterBuild = () => {
              if (recursive && addModuleResult.dependencies) {
                this.processModuleDependencies(dependentModule, callback);
              } else {
                return callback();
              }
            };

            if (addModuleResult.issuer) {
              if (currentProfile) {
                dependentModule.profile = currentProfile;
              }

              dependentModule.issuer = module;
            } else {
              if (this.profile) {
                if (module.profile) {
                  const time = Date.now() - start;
                  if (
                    !module.profile.dependencies ||
                    time > module.profile.dependencies
                  ) {
                    module.profile.dependencies = time;
                  }
                }
              }
            }

            if (addModuleResult.build) {
              this.buildModule(
                dependentModule,
                isOptional(),
                module,
                dependencies,
                err => {
                  if (err) {
                    semaphore.release();
                    return errorOrWarningAndCallback(err);
                  }

                  if (currentProfile) {
                    const afterBuilding = Date.now();
                    currentProfile.building = afterBuilding - afterFactory;
                  }

                  semaphore.release();
                  afterBuild();
                }
              );
            } else {
              semaphore.release();
              this.waitForBuildingFinished(dependentModule, afterBuild);
            }
          }
        );
      });
    },
    err => {
      // In V8, the Error objects keep a reference to the functions on the stack. These warnings &
      // errors are created inside closures that keep a reference to the Compilation, so errors are
      // leaking the Compilation object.

      if (err) {
        // eslint-disable-next-line no-self-assign
        err.stack = err.stack;
        return callback(err);
      }

      return process.nextTick(callback);
    }
  );
}

processModuleDependencies(module, callback) {
  const dependencies = new Map();

  const addDependency = dep => {
    const resourceIdent = dep.getResourceIdentifier();
    if (resourceIdent) {
      const factory = this.dependencyFactories.get(dep.constructor);
      if (factory === undefined) {
        throw new Error(
          `No module factory available for dependency type: ${dep.constructor.name}`
        );
      }
      let innerMap = dependencies.get(factory);
      if (innerMap === undefined) {
        dependencies.set(factory, (innerMap = new Map()));
      }
      let list = innerMap.get(resourceIdent);
      if (list === undefined) innerMap.set(resourceIdent, (list = []));
      list.push(dep);
    }
  };

  const addDependenciesBlock = block => {
    if (block.dependencies) {
      iterationOfArrayCallback(block.dependencies, addDependency);
    }
    if (block.blocks) {
      iterationOfArrayCallback(block.blocks, addDependenciesBlock);
    }
    if (block.variables) {
      iterationBlockVariable(block.variables, addDependency);
    }
  };

  try {
    addDependenciesBlock(module);
  } catch (e) {
    callback(e);
  }

  const sortedDependencies = [];

  for (const pair1 of dependencies) {
    for (const pair2 of pair1[1]) {
      sortedDependencies.push({
        factory: pair1[0],
        dependencies: pair2[1]
      });
    }
  }

  this.addModuleDependencies(
    module,
    sortedDependencies,
    this.bail,
    null,
    true,
    callback
  );
}
```

plugins.apply -> compile.run -> moduleFactory = new NormalModuleFactory() -> compilation = new Compilation() -> make -> bind(compilation, moduleFactory) -> compilation.addEntry -> _addModuleChain -> moduleFactory.create -> factory(resolver loader)createdModule = new NormalModule(result); -> module.build -> dobuild(runLoaders) -> this.parser.parse -> afterBuild -> processModuleDependencies -> addDependenciesBlock -> addModuleDependencies -> factory(resolver loader)createdModule = new NormalModule(result); -> compilation.finish

------
seal:
_preparedEntrypoints存储了入口的module，module之前又是有依赖关系的，通过入口module，可以找到所有依赖的module