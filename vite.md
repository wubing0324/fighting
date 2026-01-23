vite 下构建 vue2.7.16 版本的项目
1.svg 图标不显示：安装 vite-plugin-svg-icons
`npm install vite-plugin-svg-icons --save-dev`
在 vite 中配置：

```javascript
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const outputPostfix = `-[hash]-${Math.floor(Date.now() / 1000).toString(16)}`
const config: UserConfig = {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
    ]
}
```

2. vue2.7 通过一个新的插件提供对 Vite 的支持：@vitejs/plugin-vue2。这个新的插件需要 Vue 2.7 或更高版本，并取代了已有的 vite-plugin-vue2。

注意这个新插件刻意不会处理 Vue 特有的 JSX / TSX 转换。在 Vite 中，Vue 2 的 JSX / TSX 转换是通过一个独立的插件进行处理的：@vitejs/plugin-vue2-jsx。

```javascript
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";

plugins: [vue2(), vue2Jsx()];
```

3.安装 typescript 和@types/jsdom 和@types/node
`npm i typescript @types/jsdom @types/node vite-plugin-require-transform`

配置 tsconfig.json

```javascript
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "module": "EsNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "types": ["node", "vite-plugin-svg-icons/client", "unplugin-vue-define-options/macros-global"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

4.安装 vite-plugin-svg-icons
`vite-plugin-svg-icons`

```javascript
plugins: [
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
  }),
];
```

注册全局 icon 组件
index.ts

```javascript
import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

Vue.component("SvgIcon", SvgIcon);

// 自动引入所有的图标svg文件
import.meta.glob("@/assets/svg/*.svg", { eager: true });
import "virtual:svg-icons-register";

export interface SvgIconProps {
  name: string;
  color?: string;
  size?: string | number;
}
```

```javascript
<template>
  <svg aria-hidden="true" class="svg-icon" :style="svgStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { SvgIconProps } from './index';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333'
    },
    size: {
      type: [String, Number],
      default: 16
    }
  },
  setup(props: SvgIconProps) {
    const symbolId = computed(() => `#icon-${props.name}`);
    const svgStyle = computed(() => {
      const size = typeof props.size === 'number' ? `${props.size}px` : props.size;
      return {
        width: size,
        height: size
      };
    });

    return {
      symbolId,
      svgStyle
    };
  }
});
</script>

<style scoped>
.svg-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
```

5.安装 pinia，必须安装@vue/composition-api，使用 pinia 是因为有 ts 自动补全，而 vuex 没有
`npm i pina @vue/composition-api`

6.非直接依赖的库如果是非 ESM 模式，需要使用 optimizeDeps.include 配置（详情见 webpack 和 vite 区别.md）

7.安装@types/vue
为什么需要它？
Vue 2.x 默认是用 JS 写的，没有内置类型系统。

TypeScript 需要类型定义 才能正确理解 Vue 的 API。
它的作用是什么？
为 Vue.js 提供类型定义：

让 TypeScript 能识别 Vue 构造函数、组件选项（data、methods、computed 等）、生命周期钩子等。

例如：

```
import Vue from "vue";

// TypeScript 知道 `Vue` 是一个构造函数，并且能检查组件选项
new Vue({
  el: "#app",
  data() {  // ✅ 类型检查 data 的返回值
    return { count: 0 };
  },
  methods: {
    increment() {  // ✅ 类型检查 methods
      this.count++;  // ✅ 知道 `this.count` 是 number
    },
  },
});
```

支持 Vue 全局 API 的类型：

例如 Vue.component、Vue.directive、Vue.mixin 等：

```
Vue.component("my-button", {  // ✅ 类型检查组件选项
  props: { size: String },
  template: "<button>{{ size }}</button>",
});
```

提供 this 的上下文类型：

在 Vue 组件中，this 会自动推断出 data、methods、computed 等属性：

```
export default Vue.extend({
  data() {
    return { message: "Hello" };
  },
  methods: {
    showMessage() {
      console.log(this.message);  // ✅ 知道 `this.message` 是 string
    },
  },
});
```

类似 @types/react 为 React 提供类型，@types/vue 是 Vue 2.x 的官方类型支持
`npm install --save-dev @types/vue`

4. 常见使用场景
   (1) 定义 Vue 组件（Options API）

```
import Vue from "vue";

export default Vue.extend({
  data() {
    return { count: 0 };  // ✅ 类型推断为 { count: number }
  },
  methods: {
    increment() {
      this.count++;  // ✅ 类型安全
    },
  },
});
```

(2) 类型检查 Props

```
export default Vue.extend({
  props: {
    id: { type: Number, required: true },  // ✅ 必须传递 number 类型的 id
    title: { type: String, default: "默认标题" },  // ✅ 可选 string 类型
  },
  methods: {
    logProps() {
      console.log(this.id, this.title);  // ✅ 知道 id 是 number，title 是 string
    },
  },
});
```

(3) 结合 Vuex 和 Vue Router
@types/vue 还支持与其他 Vue 生态库（如 Vuex、Vue Router）的类型集成：

```
import { Route } from "vue-router";

export default Vue.extend({
  methods: {
    navigate(route: Route) {  // ✅ 使用 Vue Router 的类型
      this.$router.push(route);
    },
  },
});
```

5. 对比 Vue 3 的类型支持
   特性 Vue 2.x + @types/vue Vue 3.x（内置类型）
   类型来源 需额外安装 @types/vue 内置，无需额外安装
   Composition API 需额外安装 @vue/composition-api 原生支持
   TS 体验 较好（依赖类型包） 更完善（官方原生 TS 实现）

总结
@types/vue 为 Vue 2.x 提供 TypeScript 类型支持，是 Vue 2 + TS 开发的必备依赖。

Vue 3 无需安装，因为类型已内置。

主要功能：

类型检查 Vue 组件选项（data、methods、props 等）。

提供 this 上下文的智能提示。

支持 Vue 全局 API 的类型安全调用。
