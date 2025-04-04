# Vue 项目代码规范配置指南

本文档详细说明如何从零开始配置 Vue 项目的代码规范，实现保存时自动修复 ESLint 错误。

## 1. 安装必要的依赖包

```bash
# 安装 ESLint 相关
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier

# 安装 Prettier 相关
pnpm add -D prettier

# 安装 Stylelint 相关
pnpm add -D stylelint stylelint-config-standard-scss stylelint-config-recommended-vue stylelint-config-recess-order stylelint-prettier postcss-html postcss-scss
```

## 2. 配置 VSCode 设置

在 `.vscode/settings.json` 中添加以下配置：

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 3. 创建 ESLint 配置文件

创建 `.eslintrc.js`：

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/no-v-html": "off"
  }
};
```

## 4. 创建 Prettier 配置文件

创建 `.prettierrc.js`：

```javascript
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "auto"
};
```

## 5. 创建 Stylelint 配置文件

创建 `.stylelintrc.js`：

```javascript
module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended"
  ],
  rules: {
    "selector-class-pattern": null,
    "no-descending-specificity": null
  }
};
```

## 6. 在 package.json 中添加 lint 脚本

```json
{
  "scripts": {
    "lint:eslint": "eslint --cache --max-warnings 0 \"{src,mock,build}/**/*.{vue,js,ts,tsx}\" --fix",
    "lint:prettier": "prettier --write \"src/**/*.{js,ts,json,tsx,css,scss,vue,html,md}\"",
    "lint:stylelint": "stylelint --cache --fix \"**/*.{html,vue,css,scss}\" --cache-location node_modules/.cache/stylelint/",
    "lint": "pnpm lint:eslint && pnpm lint:prettier && pnpm lint:stylelint"
  }
}
```

## 7. 安装 VSCode 插件

需要在 VSCode 中安装以下插件：

- ESLint
- Prettier - Code formatter
- Stylelint
- Vue Language Features (Volar)

## 8. 配置 Git 提交前的代码检查（可选）

```bash
# 安装 husky 和 lint-staged
pnpm add -D husky lint-staged
```

在 package.json 中添加：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,vue}": ["stylelint --fix", "prettier --write"]
  }
}
```

## 效果说明

配置完成后，当您保存文件时：

1. ESLint 会自动检查并修复 JavaScript/TypeScript 代码
2. Prettier 会自动格式化代码
3. Stylelint 会自动检查并修复 CSS/SCSS 样式代码

## 验证配置

要验证配置是否生效，您可以：

1. 故意写一些不符合规范的代码
2. 保存文件
3. 观察代码是否自动被修复

如果您想手动运行代码检查，可以使用：

```bash
pnpm lint
```

这个命令会运行所有的代码检查工具并自动修复问题。
