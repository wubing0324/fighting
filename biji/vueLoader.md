针对一个vue文件，实际上构建了三次module并执行loader和ast。第一次解析是为了拼接文件，第二次注入loader，第三次才是通过loader做真正的解析。
vue-loader整体流程：
1. 执行plugin扩展compiler.options.module.rules：
+ 创建templateCompilerRule：在其中找到vue-loader的options配置，创建template对应的loader，并将options应用其中。
+ 创建clonedRules：复制rules并为每个rule添加resource，使.vue文件解析后的block能够被对应的rule解析（解析template生成的render），
+ 创建jsRulesForRenderFn规则（针对于js或ts的loaders也要应用于render函数中的js和ts）
+ 创建pitcher规则

2.解析xxx.vue文件
```javascript
compiler.options.module.rules = [
  pitcher,
  ...jsRulesForRenderFn,
  templateCompilerRule,
  ...clonedRules,
  ...rules,
];
```
+ 根据compiler.options.module.rules，xxx.vue匹配到rules中的vue-loader，上面四个规则都没有匹配到，因为此时没有resourcequery，执行loader，通过vue/compiler-sfc解析文件内容，生成对象如下：
```javascript
{ filename: 'F:\\webpackLearn\\src\\myIndex.vue',
  source:
   '<template>\r\n  <div class="wrapper"></div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: 
{},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n</script>\r\n<style lang="less" scoped>\r\n.wrapper{\r\n  background:#000;\r\n}\r\n</style>',
  template:
   { type: 'template',
     content: '\r\n  <div class="wrapper"></div>\r\n',
     loc:
      { source: '\r\n  <div class="wrapper"></div>\r\n',
        start: [Object],
        end: [Object] },
     attrs: {},
     ast:
      { type: 1,
        ns: 0,
        tag: 'template',
        tagType: 0,
        props: [],
        isSelfClosing: false,
        children: [Array],
        loc: [Object],
        codegenNode: undefined } },
  script:
   { type: 'script',
     content:
      '\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: {},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n',
     loc:
      { source:
         '\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: {},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n',
        start: [Object],
        end: [Object] },
     attrs: {} },
  scriptSetup: null,
  styles:
  [{ type: 'style',
      content: '\r\n.wrapper{\r\n  background:#000;\r\n}\r\n',
      loc: [Object],
      attrs: [Object],
      lang: 'less',
      scoped: true }],
  customBlocks: [],
  cssVars: [],
  slotted: false,
  shouldForceReload: [Function: shouldForceReload] }
```
+ 解析对象的template、script、style字段内容去拼接请求，最后生成如下内容：

```javascript
import { render } from "./myIndex.vue?vue&type=template&id=753083bd"
import script from "./myIndex.vue?vue&type=script&lang=js"
export * from "./myIndex.vue?vue&type=script&lang=js"

import "./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less"
```
此时loader执行完毕，这时候xxx.vue已经通过loader的翻译变成了上述的样子
+ 执行ast逻辑，转换xxx.vue文件内容，找到其中依赖依次解析构建模块，构建模块前，通过文件路径获取其需要的loaders，解析import { render } from "./myIndex.vue?vue&type=template&id=753083bd"文件，执行compiler.options.module.rules的匹配,此时通过 resourceQuery=?vue&type=style&index=0&id=753083bd&lang=less 匹配到两个loader，pitcher规则对应的loader和less对应的loader，然后执行runLoader。pitcher loader的定义有pitch，所以先执行pitch，后执行less loader，在pitch中，解析query，根据type，将loader真实路径注入到文件路径中，拿当前文件来说，query中type=style,在路径中注入stylePostLoaderPath等，最后返回生成的路径：
```javascript
export * from "-!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/dist/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js??ref--2-2!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"
```
此时pitch有了非undefined返回值，于是终止了之后loader的执行，所以此次并没有执行less对应的loader，loader执行完毕，执行ast转换，依赖解析，解析上面的文件，此时文件路径中包含 '-!'，使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，所以这次只执行内联loader，先执行vue-loader，通过vue/compiler-sfc解析文件，根据query.type返回不同的解析内容，返回给下一个loader，对于style，vue-loader返回的是less格式的样式，传递给less-loader。对于template，返回```'<div>{{msg}}</div>'```给templateLoader，最终生成render函数。

```javascript
class VueLoaderPlugin {
    apply(compiler) {
        // 拿到webpack配置的loader
        const rawRules = compiler.options.module.rules;
        // rawRules:[
        //     { test: /\.vue$/, loader: 'vue-loader' },
        //     { test: /\.js$/, loader: 'babel-loader' },
        //     { test: /\.less$/, use: [ [Object], [Object], [Object] ] }
        // ]
        // use webpack's RuleSet utility to normalize user rules
        const rules = new RuleSet(rawRules).rules;
        // rules:[
        //     { resource: [Function: bound test], use: [ [Object] ] },
        //     { resource: [Function: bound test], use: [ [Object] ] },
        //     {
        //       resource: [Function: bound test],
        //       use: [ [Object], [Object], [Object] ]
        //     }
        //   ]

        // find the rule that applies to vue files
        // 随便定义一个.vue文件，用来查询到vue rules的索引
        let vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue`));
        if (vueRuleIndex < 0) {
            vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue.html`));
        }
        const vueRule = rules[vueRuleIndex];
        const vueUse = vueRule.use;
        // 获取vue-loader的options（vueLoaderOptions）
        const vueLoaderUseIndex = vueUse.findIndex((u) => {
            return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader || '');
        });
        const vueLoaderUse = vueUse[vueLoaderUseIndex];
        const vueLoaderOptions = (vueLoaderUse.options = vueLoaderUse.options || {});
            
        // for each user rule (expect the vue rule), create a cloned rule
        // that targets the corresponding language blocks in *.vue files.
        // clonedRules是为了给rules中的配置添加resource，用于匹配.vue中的js和style，这样.vue中的js和style等内容也可以被loader所识别和转换
        const clonedRules = rules.filter((r) => r !== vueRule).map(cloneRule);
        // rule for template compiler
        const templateCompilerRule = {
            loader: require.resolve('./templateLoader'),
            resourceQuery: (query) => {
                const parsed = qs.parse(query.slice(1));
                return parsed.vue != null && parsed.type === 'template';
            },
            options: vueLoaderOptions,
        };
        // for each rule that matches plain .js/.ts files, also create a clone and
        // match it against the compiled template code inside *.vue files, so that
        // compiled vue render functions receive the same treatment as user code
        // (mostly babel)
        // .vue中的js也使用babel编译
        const matchesJS = createMatcher(`test.js`);
        const matchesTS = createMatcher(`test.ts`);
        const jsRulesForRenderFn = rules
            .filter((r) => r !== vueRule && (matchesJS(r) || matchesTS(r)))
            .map(cloneRuleForRenderFn);
        // pitcher for block requests (for injecting stylePostLoader and deduping
        // loaders matched for src imports)
        const pitcher = {
            loader: require.resolve('./pitcher'),
            resourceQuery: (query) => {
                const parsed = qs.parse(query.slice(1));
                return parsed.vue != null;
            },
        };
        // replace original rules
        compiler.options.module.rules = [
            pitcher,
            ...jsRulesForRenderFn,
            templateCompilerRule,
            ...clonedRules,
            ...rules,
        ];
    }
}
```


```javascript
import { render } from "./myIndex.vue?vue&type=template&id=753083bd&scoped=true"
import script from "./myIndex.vue?vue&type=script&lang=js"
export * from "./myIndex.vue?vue&type=script&lang=js"

import "./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"

import exportComponent from "F:\\webpackLearn\\node_modules\\vue-loader\\dist\\exportHelper.js"
const __exports__ = /*#__PURE__*/exportComponent(script, [['render',render],['__scopeId',"data-v-753083bd"],['__file',"src/myIndex.vue"]])

```
第一次解析到.vue文件，会执行loader/index.js,通过vue/compiler-sfc将.vue文件解析成一个对象
```javascript
{ filename: 'F:\\webpackLearn\\src\\myIndex.vue',
  source:
   '<template>\r\n  <div class="wrapper"></div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: {},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n</script>\r\n<style lang="less">\r\n.wrapper{\r\n  background:#000;\r\n}\r\n</style>',
  template:
   { type: 'template',
     content: '\r\n  <div class="wrapper"></div>\r\n',
     loc:
      { source: '\r\n  <div class="wrapper"></div>\r\n',
        start: [Object],
        end: [Object] },
     attrs: {},
     ast:
      { type: 1,
        ns: 0,
        tag: 'template',
        tagType: 0,
        props: [],
        isSelfClosing: false,
        children: [Array],
        loc: [Object],
        codegenNode: undefined } },
  script:
   { type: 'script',
     content:
      '\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: {},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n',
     loc:
      { source:
         '\r\nexport default {\r\n  name: "",\r\n  data() {\r\n    return {\r\n      message: \'我是消息\'\r\n    };\r\n  },\r\n  props: {},\r\n  components: {},\r\n  minix: [],\r\n  computed: {},\r\n  watch: {},\r\n  methods: {},\r\n  created() {},\r\n  mounted() {\r\n    console.log(\'waaaa\')\r\n  },\r\n  updated() {}\r\n};\r\n',
        start: [Object],
        end: [Object] },
     attrs: {} },
  scriptSetup: null,
  styles:
   [ { type: 'style',
       content: '\r\n.wrapper{\r\n  background:#000;\r\n}\r\n',
       loc: [Object],
       attrs: [Object],
       lang: 'less' } ],
  customBlocks: [],
  cssVars: [],
  slotted: false,
  shouldForceReload: [Function: shouldForceReload] }
```
  也就是将vue文件转成了对象template、script、style字段内容，根据对象内容最后生成

```javascript
import { render } from "./myIndex.vue?vue&type=template&id=753083bd&scoped=true"
import script from "./myIndex.vue?vue&type=script&lang=js"
export * from "./myIndex.vue?vue&type=script&lang=js"

import "./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"

import exportComponent from "F:\\webpackLearn\\node_modules\\vue-loader\\dist\\exportHelper.js"
const __exports__ = /*#__PURE__*/exportComponent(script, [['render',render],['__scopeId',"data-v-753083bd"],['__file',"src/myIndex.vue"]])
```
这一次module（myIndex.vue）的loader解析和构建完成，然后转成ast最后解析其内部的依赖，经过vue-loader的第一次翻译，myIndex.vue的实际内容变为以上代码，找到上面的每个依赖项，继续生成模块，通过webpack中resolver的解析，在初始化vuePlugin的时候扩展的loader（clonedRules，templateLoader等）在此处通过resourceQuery被匹配，获取到以上每个请求所匹配的所有loaders存储在this.loaders中，依次执行loader，第一个loader是picther，并且它只有pitch，于是先执行它的pitch，处理this.loaders依次拼接到请求生成内联loader，然后返回一个非undefined的值，终止了其他loader的执行并生成以下请求。

```javascript
export { default } from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js"; export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=script&lang=js"

export * from "-!../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/dist/templateLoader.js??ref--6!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=template&id=753083bd&scoped=true"

export * from "-!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/dist/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js??ref--2-2!../node_modules/vue-loader/dist/index.js??ref--9-0!./myIndex.vue?vue&type=style&index=0&id=753083bd&lang=less&scoped=true"
```
再次根据以上请求构建module，这次解析翻译真正的文件内容

######整体流程 
1. webpack初始化的时候执行vuePlugin。
    + 获取compiler.options.module.rules，用于下面前三个loader的生成
    + 创建templateCompilerRule：在其中找到vue-loader的options配置，创建template对应的loader，并将options应用其中。
    + 创建clonedRules：复制rules并为每个rule添加resourceQuery，使.vue文件解析后的block能够被对应的rule解析，
    + 创建jsRulesForRenderFn规则，从compiler.options.module.rules获取针对js或ts的loader，针对于js或ts的loaders也要应用于render函数中的js和ts
    + 创建pitcher规则

2. 对于一个.vue文件，webpack执行了三次module的构建

    + 第一次：解析.vue文件，通过文件内容拼接出三个请求（template、script、style）
    + 第二次：webpack解析loaders，根据resourceQuery匹配到cloneRules中的laoder，生成this.loaders。通过picther向上述请求根据query注入对应的loaders(处理并注入this.loaders中所有的loader)，query.type如果是style需要注入stylePostLoaderPath。picth有返回值，阻断其他loader的执行，这次生成了真正的请求，且每个请求都添加了-！。

    + 第三次：解析第二步生成的请求，转换文件内容，由于第二步生成的请求中包含-!，所以不再执行preLoader 和 loader。
>使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，在第二步所有匹配到的loader都转成了内联loader

对于以下 use 配置，loader的执行顺序如下：
```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ['a-loader', 'b-loader', 'c-loader'],
      },
    ],
  },
};
将会发生这些步骤：
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
如果b的pitch返回了非undefined值，上面的步骤将被缩短为：
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```


https://juejin.cn/post/7013991508281917454