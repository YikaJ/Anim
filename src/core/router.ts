import wechat from '../core/wechat'
import qs from 'qs'

export default function initRouter(this: Anim.PageInstance, options: IAnyObject = {}) {
  const currentPage = getCurrentPages().slice(-1)[0]

  // 还原成原来的字符串，提供后续解析
  const querystring = Object.keys(options)
    .reduce((str, key) => {
      return `${str}&${key}=${options[key]}`
    }, '')
  console.log('currentPage', currentPage)
  this.setData && this.setData({
    '$route': {
      path: currentPage.route,
      query: qs.parse(querystring)
    },
  })

  this.$router = {
    push(options) {
      const url = `${options.path}?${qs.stringify(options.query)}`
      return wechat.navigateTo({ url })
    },
    pop() {
      return wechat.navigateTo({ url: options.path })
    },
    redirect(options) {
      return wechat.navigateTo({ url: options.path })
    },
    go(delta) {
      return wechat.navigateTo({ url: options.path })
    }
  }
}