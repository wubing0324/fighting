let path = require('path')
let fs = require('fs')
let vm = require('vm')
function Module(id) {
    this.id = id
    this.exports = {}
}

Module.load = function(filepath) {
    let absPath = this.resolveFilename(filepath)
    let module = new Module(absPath)
    return module.load()
}
Module.prototype.load = function() {
    // 此时能拿到文件后缀是因为resolveFilename已经做了处理，this.id一定是带后缀的文件路径
    let extension = path.extname(this.id)
    Module._extensions[extension](this)
    return this.exports
}
Module.wrapper = [
    "(function(exports, module, require, __filename, __dirname){",
    "})"
]
Module.resolveFilename = function(filepath) {
    let absPath = path.resolve(__dirname, filepath)
    let ext = path.extname(absPath)
    let finalPath = absPath
    if (!ext) {
        let exts = Object.keys(Module._extensions)
        for (let i = 0; i < exts.length; i++) {
            finalPath = absPath + exts[i]
            try {
                fs.accessSync(finalPath)
                break
            } catch (error) {
                finalPath = path.basename(finalPath, exts[i])
            }
        }
        if (!path.extname(finalPath)) {
            throw new Error('文件不存在')
        }
    } else {
        try {
            fs.accessSync(finalPath)
        } catch (error) {
            throw new Error('文件不存在')
        }
    }
    return finalPath
}
Module._extensions = {
    '.js'(module) {
        let fileContent = fs.readFileSync(module.id)
        let script = Module.wrapper[0] + fileContent + Module.wrapper[1]
        let fn = vm.runInThisContext(script)
        fn.call(module.exports, module.exports, module, req)
    },
    '.json'() {},
}
function req(filepath) {
    return Module.load(filepath)
}
let result = req('./a')
console.log(result)