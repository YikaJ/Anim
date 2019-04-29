import wechat from '../core/wechat'

export default function initRouter(this: Anim.PageInstance, options: IAnyObject = {}) {
  const currentPage = getCurrentPages().slice(-1)[0]
  let query

  try {
    query = JSON.parse(options.__anim__query)
  } catch(e) {
    query = {}
  }

  console.log(options)

  this.setData && this.setData({
    '$route': {
      path: currentPage.route,
      query
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
  return `${options.path}?__anim__query=${JSON.stringify(options.query || {})}`
}