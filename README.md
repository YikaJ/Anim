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

* anim.js (17kb)，[下载](https://www.qq.com)
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

### 计算属性 Computed

### 监听 Watch

### 混入 Mixin

混入 (mixin) 可以帮助开发者更好的组织页面代码逻辑，抽象出可复用的逻辑，并分发到各个页面内。当页面使用 `mixins` 功能时，会将配置选项按一定的规则和页面的配置项进行合并。

### 状态管理

### 路由增强

#### API 增强

更加符合前端路由库的方法集成。后续可考虑在前端层维护一个路由栈，可以除了后退还可以支持前进等需求。URL 和参数不再需要手动拼装，舒服使用。并且参数支持更加复杂的解析，支持多层嵌套，数组参数。提高小程序开发的便利性。

所有的方法都是 Promise 化。

this.$router.push({ path: string, query: Object})
this.$router.pop()
this.$router.redirect()
this.$router.go(number)

#### 突破小程序 10 层限制

通过 Anim 维护的路由栈，还可以突破 10 层限制。利用 Redirect 和中间页来处理复杂逻辑。

#### 路由响应

路由数据会存放到 this.data.$route 中，方便 UI 使用。考虑到小程序前端的特殊性，暂时只支持 query 参数。