import Watcher from './watcher'
export default function initComputed(vm: AnimPageInstance) {
  if (!vm.computed) return
  // 初始化 computed data 数据
  const computedData: IAnyObject = {}
  Object.keys(vm.computed)
    .forEach(key => {
      const fn = vm.computed[key]
      if (typeof fn !== 'function') {
        console.error(`${key} 在 computed 内必须是函数`)
        return
      }

      // init watcher
      const watcher = new Watcher(vm, fn, () => {
        vm.setData && vm.setData({
          [key]: watcher.value
        })
      })

      vm.data[key] = watcher.value
      computedData[key] = watcher.value

      // watching computed data
      Object.defineProperty(vm.data, key, {
        configurable: true,
        enumerable: true,
        set(newValue) {
          return newValue
        },
        get() {
          watcher.depend()
          return watcher.value
        }
      })
    })

  vm.setData && vm.setData(computedData)
}
