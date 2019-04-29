import wechat from '../core/wechat'
import qs from 'qs'

export default function initRouter(this: Anim.PageInstance, options: IAnyObject = {}) {
  const currentPage = getCurrentPages().slice(-1)[0]

  // 还原成原来的字符串，提供后续解析
  const querystring = Object.keys(options)
    .reduce((str, key) => {
      return `${str}&${key}=${options[key]}`
    }, '')
  this.setData && this.setData({
    '$route': {
      path: currentPage.route,
      query: qs.parse(querystring)
    },
  })

  // 初始化
  initRouterMethods(this)
}

function initRouterMethods(vm: Anim.PageInstance) {
  vm.$router = {
    navigateTo(options) {
      return wechat.navigateTo({ url: urlJoinOptions(options) })
    },
    navigateBack(delta = 1) {
      return wechat.navigateBack({ delta: delta })
    },
    redirectTo(options) {
      return wechat.redirectTo({ url: urlJoinOptions(options) })
    },
    reLaunch(options) {
      return wechat.reLaunch({ url: urlJoinOptions(options) })
    },
    switchTab(options) {
      return wechat.switchTab({ url: urlJoinOptions(options) })
    },
    go(num) {
      if(num < 0) {
        return wechat.navigateBack({ delta: Math.abs(num) })
      }
    }
  }
}

function urlJoinOptions(options: Anim.RouterNavigateOpts) {
  return `${options.path}?${qs.stringify(options.query)}`
}