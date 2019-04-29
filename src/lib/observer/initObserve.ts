import Dep from './dep'
export default function initObserve(vm: Anim.PageInstance) {
  if (typeof vm.data === 'object' && vm.data !== 'null') {
    Object.keys(vm.data).forEach(key => {
      const vmData = { ...vm.data }
      let value = vmData[key]
      const dep = new Dep()

      Object.defineProperty(vm.data, key, {
        set(newValue) {
          if (newValue === value || (newValue !== newValue && value !== value)) {
            return
          }
          value = newValue
          // 对依赖发出通知
          dep.notify()
        },
        get() {
          // 依赖收集
          dep.depend()
          return value
        }
      })
    })
  }
}