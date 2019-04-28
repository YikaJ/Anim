import Dep from './dep'

let uid = 0

class Watcher {
  vm: AnimPageInstance
  fn: () => any
  cb: () => void
  id = ++uid
  depIdMap: Record<number, Dep> = {}
  value: any
  oldValue: any
  dep = new Dep()

  constructor(vm: AnimPageInstance, fn: () => any, cb: () => void) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    this.value = this.getValue()
    this.oldValue = undefined
  }
  getValue() {
    Dep.target = this
    const value = this.fn.call(this.vm)
    console.log('watcher getValue', value)
    Dep.target = undefined
    return value
  }
  update() {
    this.oldValue = this.value
    this.value = this.getValue()
    console.log('update', this.value)

    this.cb.call(this.vm)
  }
  addDep(dep: Dep) {
    if (!this.depIdMap.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIdMap[dep.id] = dep
    }
  }
  depend() {
    this.dep.depend()
  }
}

export default Watcher