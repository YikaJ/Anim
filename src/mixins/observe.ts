
import initObserve from '../lib/observer/initObserve'
import initComputed from '../lib/observer/initComputed'
import initWatch from '../lib/observer/initWatch'

// 提供 watch/computed/store mixin
const observeMixin = {
  onLoad(this: AnimPageInstance) {
    initObserve(this)
    initWatch(this)
    initComputed(this)
  }
}

export default observeMixin