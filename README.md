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

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。巧妙利用 computed 方法，可以让整体代码更简洁清晰。

计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值，开发者不需要关注依赖的数据是何时更新的。

```js
Anim.Page({
  data: {
    a: 1
  },
  computed: {
    b() {
      return this.data.a + 2
    }
  }
})
```

### 监听 Watch

当你有一些数据需要随着其它数据变动而变动时，可以用 watch 监听数据的变化，然后执行一些逻辑。

```js
Anim.Page({
  data: {
    a: 1
  },
  watch: {
    a(newVal, oldVal) {
      console.log('a', newVal, oldVal)
    }
  }
})
```

### 混入 Mixin

混入 (mixin) 可以帮助开发者更好的组织页面代码逻辑，抽象出可复用的逻辑，并分发到各个页面内。当页面使用 `mixins` 功能时，会将配置选项按一定的规则和页面的配置项进行合并。

支持全局混入，可以让全局共享配置。

```js
const myMixin = {
  onLoad() {
    this.showMessage()
  },
  showMessage() {
    console.log('global show Message')
  }
}
Anim.Page.mixin(myMixin)
```

支持当前页面混入

```js
const myMixin = {
  onLoad() {
    this.showMessage()
  },
  showMessage() {
    console.log('show Message')
  }
}
Anim.Page({
  mixins: [myMixin],
  onLoad() {
    console.log('show another message')
  }
})
```

### 状态管理

使用 wedux 进行全局状态管理，wedux 对数据进行了 Proxy 代理，使得所有使用该 Store 数据的地方都会被统一通知并更新。

```js
Anim.Page({
  store: (state) => {
    return {
      count: state.counter.count
    }
  }
})
```

### setData

代理原生 setData 方法，并在此之上实现数据 diff，在现有的小程序架构上，精简 setData 的数据，加快小程序数据传输和渲染。

```js
Anim.Page({
  data: {
    bigData: []
  },
  onLoad() {
    // 自动做 diff 数据
    this.setData({
      bigData: bigData
    })
  }
})
```

### 路由增强

更加符合前端路由库的方法集成。后续可考虑在前端层维护一个路由栈，可以除了后退还可以支持前进等需求。URL 和参数不再需要手动拼装，舒服使用。并且参数支持更加复杂的解析，支持多层嵌套，数组参数。提高小程序开发的便利性。

#### API 增强

所有的方法都是 Promise 化。

```js
this.$router.navigateTo({ path: string, query: Object})
this.$router.navigateBack()
this.$router.redirectTo()
this.$router.reLaunch(number)
this.$router.switchTab()

// go 方法后续可以支持 backwards / forwards
this.$router.go()
```

#### 支持复杂的 query 数据

微信小程序暂时不支持复杂的 query 解析，在 Anim 框架下重新对 URL 做了解析，支持多层嵌套模式和数组参数。

```js
// index.js
Anim.Page({
  onLoad() {
    this.$router.navigateTo({
      path: '/pages/another/another',
      query: {
        a: { b: { c: 3 }},
        d: [1, 2, 3],
        e: [{key: 'val'}, {key: 'val'}]
      }
    })
  }
})

// another.js
Anim.Page({
  onLoad() {
    // 可以获取复杂数据
    console.log(this.$route.query)
  }
})
```

#### 突破小程序 10 层限制

通过 Anim 维护的路由栈，还可以突破 10 层限制。利用 Redirect 和中间页来处理复杂逻辑。

#### 路由响应

路由数据会存放到 this.data.$route 中，方便 UI 使用。考虑到小程序前端的特殊性，暂时只支持 query 参数。

```js

Anim.Page({
  onLoad() {
    console.log(this.data.$route)
  }
})
```