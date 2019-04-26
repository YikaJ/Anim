import * as mixins from '../core/mixins'

import { mapToData } from '../lib/wedux'

// 存储前置 mixins
// mixins 顺序：默认 mixin -> 全局 mixin -> 页面 mixin -> 页面 option
const _mixins: Object[] = [mixins.observeMixin]

// 提供全局混入 Global Mixins 的功能
AnimPage.mixin = function<T>(opts: T) {
  _mixins.push(opts)
}

// Page 构造器
export default function AnimPage<T>(opts: T | any) {
  let currentMixins = _mixins.slice()
  if(Array.isArray(opts.mixins)) {
    currentMixins = currentMixins.concat(opts.mixins)
  }

  const pageOpts: any = mixins.mixOptions(currentMixins.concat(opts))

  // Page constructor
  console.log('current page options', pageOpts) 
  // 绑定 wedux
  if (pageOpts.store) {
    if (typeof pageOpts.store === 'function') {
      const connect = mapToData(pageOpts.store)
      return Page(connect(pageOpts))
    }
    console.error(`Page.store 必须是函数，当前为${pageOpts.store}，store暂不起作用`)
  }

  return Page(pageOpts)
}