
var store = {
  name: 'home',
  modules: {
    a: {name: 'a'},
    b: {name: 'b', modules: {name: 'c'}}
  }
}
var root = null
function register(path, rootModule) {
  var rawModule = {
    raw: rootModule,
    children: {},
  }

  if (root) {
    let parentModule = path.slice(0, -1).reduce((module, path) => {
      console.log(module, path)
      return module.children[path]
    }, root)
    parentModule.children[path[path.length - 1]] = rawModule
  } else {
    root = rawModule
  }
  if (rootModule.modules) {
    Object.keys(rootModule.modules).forEach(moduleName => {
      register(path.concat(moduleName),rootModule.modules[moduleName])
    })
  }
  return root
}
var r = register([], store)

console.log(JSON.stringify(r))