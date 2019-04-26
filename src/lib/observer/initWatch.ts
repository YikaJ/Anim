function initWatch(vm) {
  if (!vm.watch) return
  Object.keys(vm.watch)
    .forEach(key => {
      const fn = vm.watch[key]
      if (typeof fn !== 'function') {
        console.error(`${key} 在 watch 内必须是函数`)
        return
      }

      const descriptor = Object.getOwnPropertyDescriptor(vm.data, key)
      let timer: any // 防止 watch 的值变化过快时，函数被频繁调用，如 a + b + c = d ，abc都发生变化时，d 应该只被触发一次
      if (descriptor) {
        Object.defineProperty(vm.data, key, {
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          get: descriptor.get,
          set(newValue) {
            clearTimeout(timer)
            const oldValue = vm.data[key]
            timer = setTimeout(() => {
              fn.call(vm, newValue, oldValue)
            }, 0)
            if (descriptor.set) descriptor.set(newValue)
          }
        })
      }
    })
}

// 通过 setTimeout 来延迟 computed 属性的赋值
export default (vm) => {
  setTimeout(() => {
    initWatch(vm)
  }, 0)
}
