import Watcher from './watcher'

export default function initComputed(vm) {
  if (!vm.computed) return
  // 初始化 computed data 数据
  const computedData = {}
  Object.keys(vm.computed)
    .forEach(key => {
      const fn = vm.computed[key]
      if (typeof fn !== 'function') {
        console.error(`${key} 在 computed 内必须是函数`)
        return
      }

      // init watcher
      const watcher = new Watcher(vm, fn, () => {
        // console.log('watcher set', key, watcher.value)
        vm.setData({
          [key]: watcher.value
        })
      })
      vm.data[key] = watcher.value
      computedData[key] = vm.data[key]

      // Proxy
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

  vm.setData(computedData)
}
