##### 1.cssmodule用法和原理
+ 1.在vue中，首先配置css-loader: {modules: true}
+ 2.然后在xxx.vue文件中，这样写类名
```javascript
<template>
  <div :class="$style.red"></div>
</template>
<style>
  .red{
    color: red;
  }
</style>
```
最后生成的dom是这样的：
```javascript
<div class="_23QBkVnCzMrYAOx1YnCUI9_0"></div>
<style>
  ._23QBkVnCzMrYAOx1YnCUI9_0{
    color: red;
  }
</style>
```
原理：通过postCss将css样式转换成ast语法树，应用插件postcss-modules-scope遍历ast找到带有:local的选择器，根据选择器名称生成唯一值，用这个唯一值替换选择器名称，然后将映射关系（选择其名称：唯一值）存到一个全局对象中，当所有样式解析完，抛出这个映射关系，此时样式中的选择器名称已经变成了唯一值。此时我们通过$style.topBar获取到的真实类名就是从这个对象获取到的唯一值。

类名映射对象是这样的：
```javascript
module.exports = {"topBar":"_23QBkVnCzMrYAOx1YnCUI9_0"}
```
在我们的vue组件中为什么能引入到这个对象，直接上编译后的代码,其实就是通过函数拿到这个对象，并赋值到$style上
```javascript
MlVG:function(t,i){t.exports={topBar:"_23QBkVnCzMrYAOx1YnCUI9_0",app:"_7GWKZZxRyNF89VUa_LE90_0"}}

this.$style=c("MlVG")
```
vue-loader第一次解析生成cssmodule请求代码如下：
```javascript
if (style.module) {
  stylesCode += (0, cssModules_1.genCSSModulesCode)(id, i, styleRequest, style.module, needsHotReload);
}

function genCSSModulesCode(id, index, request, moduleName, needsHotReload) {
    const styleVar = `style${index}`;
    let code = `\nimport ${styleVar} from ${request}`;
    // inject variable
    const name = typeof moduleName === 'string' ? moduleName : '$style';
    code += `\ncssModules["${name}"] = ${styleVar}`;
    if (needsHotReload) {
        code += `
if (module.hot) {
  module.hot.accept(${request}, () => {
    cssModules["${name}"] = ${styleVar}
    __VUE_HMR_RUNTIME__.rerender("${id}")
  })
}`;
    }
    return code;
}
```
vue文件在经过第一次vue-loader的解析内容如下：
```javascript
import { render } from "./myIndex.vue?vue&type=template&id=753083bd"
import script from "./myIndex.vue?vue&type=script&lang=js"
export * from "./myIndex.vue?vue&type=script&lang=js"

const cssModules = {}
import style0 from "./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&module=true"
cssModules["$style"] = style0
if (module.hot) {
  module.hot.accept("./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&module=true", () => {
    cssModules["$style"] = style0
    __VUE_HMR_RUNTIME__.rerender("753083bd")
  })
}

import exportComponent from "F:\\webpackLearn\\node_modules\\vue-loader\\dist\\exportHelper.js"
const __exports__ = /*#__PURE__*/exportComponent(script, [['render',render],['__cssModules',cssModules],['__file',"src/myIndex.vue"]])
/* hot reload */
if (module.hot) {
  __exports__.__hmrId = "753083bd"
  const api = __VUE_HMR_RUNTIME__
  module.hot.accept()
  if (!api.createRecord('753083bd', __exports__)) {
    api.reload('753083bd', __exports__)
  }

  module.hot.accept("./myIndex.vue?vue&type=template&id=753083bd", () => {
    api.rerender('753083bd', render)
  })

}


export default __exports__
```
再次通过picther注入loader生成如下请求:
```javascript
export { default } from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js"; export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js"

export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/templateLoader.js??ref--6!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=template&id=753083bd"

export { default } from "-!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/dist/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js??ref--2-2!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&module=true";

export * from "-!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/dist/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js??ref--2-2!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&module=true"

```
经过以上loaders的解析，样式转化为cssmodule形式
  ```
  ._23QBkVnCzMrYAOx1YnCUI9_0{
    color: red;
  }
  ```
，
经过css-loader转化后的代码如下:
```javascript
exports.push([module.id, "._3TOEu6Ik7l2x4E3Ia0hayK {\n  background: #000;\n}\n", ""]);
// Exports
exports.locals = {
        "wrapper": "_3TOEu6Ik7l2x4E3Ia0hayK"
};
module.exports = exports;
```
再经过style-loader最终style0是这样的：{
        "wrapper": "_3TOEu6Ik7l2x4E3Ia0hayK"
};
,最后把style0赋值给cssModules["$style"]，之后挂载到vue实例上，上述template经过解析生成的render如下，包含了$style变量，也就是cssModules["$style"]
```javascript
import { createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createElementVNode("span", null, "45645646546546", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createElementVNode("p", null, "我是谁", -1 /* HOISTED */)
const _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.$style['wrapper'])
  }, _hoisted_3, 2 /* CLASS */))
}
```
-------
##### 2.Vue中scoped

```javascript
<template>
  <div class="wrapper"><span>45645646546546</span><p>我是谁</p></div>
</template>
<style scoped>
  .wrapper{
    color: red;
  }
</style>
```
最后生成的dom是这样的：
```javascript
<div data-v-753083bd class="wrapper"><span data-v-753083bd >45645646546546</span><p data-v-753083bd>我是谁</p></div>
<style>
  .wrapper[data-v-753083bd]{
    color: red;
  }
</style>
```
通过vue-loader为vue添加scoped属性的过程分为两步：
1.在dom节点上添加属性
在解析query=template生成render的时候，vue-loader@15以前是将生成的scopeId传给 解析.vue中的script所导出的options.scopeId,最后创建vue实例的时候将scopeId作为属性创建dom节点,而17版本做了修改，解析.vue文件，通过在创建vnode的时候先调用pushScopeId将scopeId传入vnode节点中。
这是解析xxx.vue生成的文件内容，exportComponent将render和__scopeId挂载到script上
```javascript
import { render } from "./myIndex.vue?vue&type=template&id=753083bd&scoped=true"
import script from "./myIndex.vue?vue&type=script&lang=js"
export * from "./myIndex.vue?vue&type=script&lang=js"

import "./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"

import exportComponent from "F:\\webpackLearn\\node_modules\\vue-loader\\dist\\exportHelper.js"
const __exports__ = /*#__PURE__*/exportComponent(script, [['render',render],['__scopeId',"data-v-753083bd"],['__file',"src/myIndex.vue"]])
```
以下是生成的render：
```javascript
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"

const _withScopeId = n => (_pushScopeId("data-v-753083bd"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "wrapper" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("span", null, "45645646546546", -1 /* HOISTED */))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("p", null, "我是谁", -1 /* HOISTED */))
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, _hoisted_4))
}
```

2.在样式表添加属性
在解析query=style的时候，执行style-post-loader，有scopeId，则应用插件scopedPlugin到postcss解析生成选择器。
style-post-loader源码如下：
```javascript
const compiler_sfc_1 = require("vue/compiler-sfc");
// This is a post loader that handles scoped CSS transforms.
// Injected right before css-loader by the global pitcher (../pitch.js)
// for any <style scoped> selection requests initiated from within vue files.
const StylePostLoader = function (source, inMap) {
    const query = qs.parse(this.resourceQuery.slice(1));
    const { code, map, errors } = (0, compiler_sfc_1.compileStyle)({
        source: source,
        filename: this.resourcePath,
        id: `data-v-${query.id}`,
        map: inMap,
        scoped: !!query.scoped,
        trim: true,
        isProd: this.mode === 'production' || process.env.NODE_ENV === 'production',
    });
    if (errors.length) {
        this.callback(errors[0]);
    }
    else {
        this.callback(null, code, map);
    }
};
exports.default = StylePostLoader;
```
调用了vue/compiler-sfc.compileStyle:
```javascript
function compileStyle(options) {
    return doCompileStyle({
        ...options,
        isAsync: false
    });
}
function doCompileStyle(options) {
    const { filename, id, scoped = false, trim = true, isProd = false, modules = false, modulesOptions = {}, preprocessLang, postcssOptions, postcssPlugins } = options;
    const shortId = id.replace(/^data-v-/, '');
    const longId = `data-v-${shortId}`;
    const plugins = (postcssPlugins || []).slice();
    if (scoped) {
        plugins.push(scopedPlugin(longId));
    }
    const postCSSOptions = {
        ...postcssOptions,
        to: filename,
        from: filename
    };
    let result;
    let code;
    try {
        result = _postcss__default(plugins).process(source, postCSSOptions);
        // In async mode, return a promise.
        if (options.isAsync) {
            return result
                .then(result => ({
                code: result.css || '',
                rawResult: result
            }))
                .catch(error => ({
                code: '',
                errors: [...errors, error],
                rawResult: undefined
            }));
        }
        // force synchronous transform (we know we only have sync plugins)
        code = result.css;
    }
    catch (e) {
        errors.push(e);
    }
    return {
        code: code || ``,
        rawResult: result,
    };
}
```
当有scoped的时候，会在之后调用postCss的时候应用这个scopedPlugin插件，去翻译生成的ast树，遍历树结点，为每个样式节点selector添加属性（.wrawper -> .wrapper[data-v-753083bd]），以上是样式中添加scopeId 的总过程，具体遍历逻辑如下，有点小复杂
```javascript
const scopedPlugin = (id = '') => {
  const keyframes = Object.create(null);
  const shortId = id.replace(/^data-v-/, '');
  return {
    postcssPlugin: 'vue-sfc-scoped',
    Rule(rule) {
        processRule(id, rule);
    }
  }
}

function processRule(id, rule) {
    rule.selector = selectorParser(selectorRoot => {
        selectorRoot.each(selector => {
            rewriteSelector(id, selector, selectorRoot);
        });
    }).processSync(rule.selector);
}
function rewriteSelector(id, selector, selectorRoot, slotted = false) {
    let node = null;
    let shouldInject = true;
    // find the last child node to insert attribute selector
    selector.each(n => {
        // DEPRECATED ">>>" and "/deep/" combinator
        if (n.type === 'combinator' &&
            (n.value === '>>>' || n.value === '/deep/')) {
            n.value = ' ';
            n.spaces.before = n.spaces.after = '';
            warn(`the >>> and /deep/ combinators have been deprecated. ` +
                `Use :deep() instead.`);
            return false;
        }
        if (n.type === 'pseudo') {
            const { value } = n;
            // deep: inject [id] attribute at the node before the ::v-deep
            // combinator.
            if (value === ':deep' || value === '::v-deep') {
                if (n.nodes.length) {
                    // .foo ::v-deep(.bar) -> .foo[xxxxxxx] .bar
                    // replace the current node with ::v-deep's inner selector
                    let last = n;
                    n.nodes[0].each(ss => {
                        selector.insertAfter(last, ss);
                        last = ss;
                    });
                    // insert a space combinator before if it doesn't already have one
                    const prev = selector.at(selector.index(n) - 1);
                    if (!prev || !isSpaceCombinator(prev)) {
                        selector.insertAfter(n, selectorParser.combinator({
                            value: ' '
                        }));
                    }
                    selector.removeChild(n);
                }
                else {
                    // DEPRECATED usage
                    // .foo ::v-deep .bar -> .foo[xxxxxxx] .bar
                    warn(`::v-deep usage as a combinator has ` +
                        `been deprecated. Use :deep(<inner-selector>) instead.`);
                    const prev = selector.at(selector.index(n) - 1);
                    if (prev && isSpaceCombinator(prev)) {
                        selector.removeChild(prev);
                    }
                    selector.removeChild(n);
                }
                return false;
            }
            // slot: use selector inside `::v-slotted` and inject [id + '-s']
            // instead.
            // ::v-slotted(.foo) -> .foo[xxxxxxx-s]
            if (value === ':slotted' || value === '::v-slotted') {
                rewriteSelector(id, n.nodes[0], selectorRoot, true /* slotted */);
                let last = n;
                n.nodes[0].each(ss => {
                    selector.insertAfter(last, ss);
                    last = ss;
                });
                // selector.insertAfter(n, n.nodes[0])
                selector.removeChild(n);
                // since slotted attribute already scopes the selector there's no
                // need for the non-slot attribute.
                shouldInject = false;
                return false;
            }
            // global: replace with inner selector and do not inject [id].
            // ::v-global(.foo) -> .foo
            if (value === ':global' || value === '::v-global') {
                selectorRoot.insertAfter(selector, n.nodes[0]);
                selectorRoot.removeChild(selector);
                return false;
            }
        }
        if (n.type !== 'pseudo' && n.type !== 'combinator') {
            node = n;
        }
    });
    if (node) {
        node.spaces.after = '';
    }
    else {
        // For deep selectors & standalone pseudo selectors,
        // the attribute selectors are prepended rather than appended.
        // So all leading spaces must be eliminated to avoid problems.
        selector.first.spaces.before = '';
    }
    if (shouldInject) {
        const idToAdd = slotted ? id + '-s' : id;
        selector.insertAfter(
        // If node is null it means we need to inject [id] at the start
        // insertAfter can handle `null` here
        node, selectorParser.attribute({
            attribute: idToAdd,
            value: idToAdd,
            raws: {},
            quoteMark: `"`
        }));
    }
}

```
_postcss__default实际上就是postCss,processRule(id,rule)中的rule就是postCss的解析结果，遍历节点执行rewriteSelector翻译节点名称

> (0,func)()这种写法会将this的指向改为全局，也就是 window 或者 global。原因是逗号操作符 对它的每个操作数求值（从左到右），并返回最后一个操作数的值。例子：(0,obj.method)()相当于let method = obj.method -> method()
```javascript
var obj = {
  method: function() { return this; }
};
console.log(obj.method() === obj);     // true
console.log((0,obj.method)() === obj); // false
```