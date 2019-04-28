import Dep from './dep'

let uid = 0

class Watcher {
  vm: any
  fn: () => void
  cb: () => void
  id = ++uid
  depIdMap: any = {}
  value: any
  dep = new Dep()

  constructor(vm: any, fn: any, cb: any) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    this.value = this.getValue()
  }
  getValue() {
    Dep.target = this
    const value = this.fn.call(this.vm)
    Dep.target = undefined
    return value
  }
  update() {
    this.value = this.getValue()
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