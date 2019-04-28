# Anim 小程序开发框架

## 介绍

Anim 框架是基于原生小程序 Mina 框架开发的，采用 rollup 打包，只需要引入 anim.js 即可快速使用。

特点：

1. 基于小程序 runtime 的增强型开发框架，无需引入各类编译环境，开箱即用。
2. 可兼容原生使用，无需对项目进行大改，按需使用即可。
3. 补充多种原生小程序开发框架缺失功能，提高大型工程化项目的可维护性，让开发更省心。
4. 引入文件大小仅为 5 kb。

## 使用

### 普通引入

通过 CDN 下载后，放置到小程序项目内部任意地方。推荐引入后挂载到 getApp 上，减少重复代码。

下载地址：

* anim.js (10kb)，[下载](https://www.qq.com)
* anim.min.js (5kb)，[下载](https://www.qq.com)

```js
// app.js
const Anim = require('./lib/anim.js')

App({
  onLaunch() {
    this.Anim = Anim
  }
})


// pages/index/index.js

// 可以使用增强型 Anim.Page
const { Anim } = getApp()
Anim.Page({
  data: {},
  computed: {}
})
```

### 小程序 npm 方式引入

正在开发小程序 npm 方式引入。

## 能力

### 监听 Watch

### 计算属性 Computed

### 混入 Mixin

混入 (mixin) 可以帮助开发者更好的组织页面代码逻辑，抽象出可复用的逻辑，并分发到各个页面内。当页面使用 `mixins` 功能时，会将配置选项按一定的规则和页面的配置项进行合并。

### 状态管理

### 路由增强