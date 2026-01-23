# Webpack 和 Vite 的区别

## 1. Webpack 的核心设计：模块化打包
Webpack 在构建时会将所有模块（无论 ESM 还是 CommonJS） 打包成一个或多个 Bundle，并注入自己的运行时加载器，从而屏蔽了原始模块系统的差异：

- 编译阶段：将 import/export 和 require/module.exports 都转换为 Webpack 内部的模块标识符。
- 运行时阶段：通过 __webpack_require__ 方法统一加载模块。

```javascript
// 源代码（ESM）
import lodash from 'lodash';

// Webpack 转换后（简化版）
var lodash = __webpack_require__(/*! lodash */ "lodash");
```

## 2. 动态 require 的支持
Webpack 能处理动态 require（如 require(variable)），因为它在构建时：

- 分析所有可能的路径（如果路径是动态表达式，会尝试推断或提供运行时支持）
- 生成上下文映射（对于 require.context 等复杂场景）

而 Vite 依赖原生 ESM，无法在运行时动态解析模块路径（ESM 的 import 必须是静态字符串）。

## 3. 统一处理非 ESM 依赖
Webpack 内置了对 CommonJS/UMD 模块的转换能力：

- 直接支持 require：无需预构建，因为 Webpack 的加载器本身兼容 CommonJS
- 自动包装非 ESM 模块：即使依赖未提供 ESM 版本，Webpack 也能将其封装成兼容的形式

而 Vite 依赖浏览器原生 ESM，必须显式预构建非 ESM 依赖（如通过 optimizeDeps.include）。

## 4. Webpack 和 Vite 的模块处理对比

| 特性 | Webpack | Vite |
|------|---------|------|
| 模块系统支持 | 所有（ESM/CJS/AMD/UMD） | 优先 ESM，需预构建非 ESM 依赖 |
| 动态 require | ✅ 支持（通过静态分析或运行时） | ❌ 不支持（必须静态 import） |
| 构建阶段 | 全量打包 | 开发时原生 ESM，生产时 Rollup 打包 |
| Tree Shaking | 依赖配置和工具链 | 原生 ESM 支持更高效 |
| 启动速度 | 慢（需打包所有依赖） | 快（按需编译） |

## 5. 为什么 Vite 不沿用 Webpack 的方式？
Vite 选择基于原生 ESM 的设计，牺牲部分兼容性换取开发体验的飞跃：

### 开发模式：
- 无需打包，直接利用浏览器原生 ESM 加载模块，实现秒级启动

### 生产构建：
- 仍使用 Rollup 打包，但保留 ESM 优势（如更好的 Tree Shaking）
- 代价是必须处理非 ESM 依赖的兼容性问题（如你的 optimizeDeps.include 配置）

## 6. 实际场景示例
假设有一个 CommonJS 依赖 lodash：

### Webpack：
直接处理，无论代码中用 `import _ from 'lodash'` 还是 `const _ = require('lodash')`，最终都会被转换为 `__webpack_require__`。

### Vite：
如果 lodash 未提供 ESM 版本，需通过预构建转换为 ESM，否则浏览器会报错。

## 总结

### Webpack 的优势：
- 兼容性更强：通过自定义运行时和打包机制抹平模块系统差异

### Vite 的优势：
- 性能更优：利用原生 ESM 实现快速开发，但需额外处理非 ESM 依赖

### 选择依据：
- 需要兼容老旧依赖？选 Webpack
- 追求开发速度和现代浏览器体验？选 Vite（配合 optimizeDeps 解决兼容问题）