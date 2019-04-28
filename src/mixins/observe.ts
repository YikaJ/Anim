
import initObserve from '../lib/observer/initObserve'
import initComputed from '../lib/observer/initComputed'
import initWatch from '../lib/observer/initWatch'

// 提供 watch/computed/store mixin
const observeMixin = {
  onLoad() {
    initObserve(this)
    initComputed(this)
    initWatch(this)
  }
}

export default observeMixin