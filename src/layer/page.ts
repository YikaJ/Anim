import * as mixins from '../core/mixins'

// 存储前置 mixins
const _mixins: Object[] = []

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

  console.log(currentMixins, opts)

  const pageOpts: any = mixins.mixOptions(currentMixins.concat(opts))

  // Page constructor
  Page(pageOpts)
}