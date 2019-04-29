import Watcher from './watcher'

let uid = 0

/**
 * 依赖收集
 */
class Dep {
  static target?: Watcher
  subs: Watcher[] = []
  id = ++uid

  addSub(sub: Watcher) {
    this.subs.push(sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

export default Dep