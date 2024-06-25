在经过第一次解析xxx.vue生成三个block后，依次解析.vue中的这些block，根据文件的query匹配到clonedRules等之前扩展的loader：
这个匹配loader的过程发生在module构建前（NormalModuleFactory.js/resolver(...)）
```javascript
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\node_modules\vue-loader\dist\exportHelper.js
[ { options: undefined,
    loader:
     'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=script&lang=js
[ { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\pitcher.js',
    options: undefined },
  { options: undefined,
    loader:
     'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js' },
  { options: {},
    ident: 'ref--9-0',
    loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=script&lang=js
[ { loader:
     'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js',
    options: {},
    ident: 'ref--9-0' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=template&id=753083bd&scoped=true
[ { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\pitcher.js',
    options: undefined },
  { options: undefined,
    loader:
     'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js' },
  { options: {},
    ident: 'ref--6',
    loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\templateLoader.js' },
  { options: {},
    ident: 'ref--9-0',
    loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=template&id=753083bd&scoped=true
[ { loader:
     'F:\\webpackLearn\\node_modules\\babel-loader\\lib\\index.js',
    options: undefined },
  { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\templateLoader.js',
    options: {},
    ident: 'ref--6' },
  { loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js',
    options: {},
    ident: 'ref--9-0' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start********************************
import { openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"

const _withScopeId = n => (_pushScopeId("data-v-753083bd"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "wrapper" }

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1))
}
end********************************
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\index.less
[ { loader: 'F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js',
    options: undefined },
  { options: undefined,
    loader: 'F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js' },
  { options: undefined,
    loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js' },
  { options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2',
    loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true
[ { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\pitcher.js',
    options: undefined },
  { options: undefined,
    loader: 'F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js' },
  { options: undefined,
    loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js' },
  { options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2',
    loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js' },
  { options: {},
    ident: 'ref--9-0',
    loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\index.less
[ { loader: 'F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js',
    options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\index.less
[ { loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js',
    options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true
[ { loader: 'F:\\webpackLearn\\node_modules\\style-loader\\dist\\cjs.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js',
    options: undefined },
  { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\stylePostLoader.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js',
    options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2' },
  { loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js',
    options: {},
    ident: 'ref--9-0' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
start this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
F:\webpackLearn\src\myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true
[ { loader: 'F:\\webpackLearn\\node_modules\\css-loader\\dist\\cjs.js',
    options: undefined },
  { loader:
     'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\stylePostLoader.js',
    options: undefined },
  { loader: 'F:\\webpackLearn\\node_modules\\less-loader\\dist\\cjs.js',
    options: { strictMath: true, noIeCompat: true },
    ident: 'ref--2-2' },
  { loader: 'F:\\webpackLearn\\node_modules\\vue-loader\\dist\\index.js',
    options: {},
    ident: 'ref--9-0' } ]
end this.loaders~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

template经过templateloader的解析最后生成如下代码：
```javascript
start********************************
import { openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"

const _withScopeId = n => (_pushScopeId("data-v-753083bd"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "wrapper" }

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1))
}
end********************************
```

经过第二次解析后，.vue中真正的block如下：
```javascript
export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/templateLoader.js??ref--6!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=template&id=753083bd&scoped=true"

export { default } from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js";

export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js"

export * from "-!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/dist/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js??ref--2-2!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"
```

最后拿到这些块再次执行模块构建，这次执行内联loader，不再执行picther，开始用loader翻译文件内容，loader是从右向左执行，先执行vue-loader/index.js，这时候resourceQuery不为空，所以走这里，而不是拼接block
```javascript
const select_1 = require("./select");
const rawQuery = resourceQuery.slice(1);
const incomingQuery = qs.parse(rawQuery);
if (incomingQuery.type) {
  return (0, select_1.selectBlock)(descriptor, id, options, loaderContext, incomingQuery, !!options.appendExtension);
}
```
select.js代码:
```javascript
const resolveScript_1 = require("./resolveScript");
function selectBlock(descriptor, scopeId, options, loaderContext, query, appendExtension) {
    // template
    if (query.type === `template`) {
        // if we are receiving a query with type it can only come from a *.vue file
        // that contains that block, so the block is guaranteed to exist.
        const template = descriptor.template;
        if (appendExtension) {
            loaderContext.resourcePath += '.' + (template.lang || 'html');
        }
        loaderContext.callback(null, template.content, template.map);
        return;
    }
    // script
    if (query.type === `script`) {
        const script = (0, resolveScript_1.resolveScript)(descriptor, scopeId, options, loaderContext);
        if (appendExtension) {
            loaderContext.resourcePath += '.' + (script.lang || 'js');
        }
        loaderContext.callback(null, script.content, script.map);
        return;
    }
    // styles
    if (query.type === `style` && query.index != null) {
        const style = descriptor.styles[Number(query.index)];
        if (appendExtension) {
            loaderContext.resourcePath += '.' + (style.lang || 'css');
        }
        loaderContext.callback(null, style.content, style.map);
        return;
    }
    // custom
    if (query.type === 'custom' && query.index != null) {
        const block = descriptor.customBlocks[Number(query.index)];
        loaderContext.callback(null, block.content, block.map);
    }
}
exports.selectBlock = selectBlock;
```

根据query.type获取descriptor要解析的内容，传给下一个loader