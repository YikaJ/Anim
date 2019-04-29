import { debounce } from 'throttle-debounce'

function initWatch(vm: AnimPageInstance) {
  if (!vm.watch) return
  
  // 存储一套用于不被代理劫持的数据源
  let watchDataMap: IAnyObject = {}
  Object.keys(vm.watch)
    .forEach(key => {
      const fn = vm.watch[key]
      if (typeof fn !== 'function') {
        console.error(`${key} 在 watch 内必须是函数`)
        return
      }

      watchDataMap[key] = vm.data[key]

      const descriptor = Object.getOwnPropertyDescriptor(vm.data, key)
      if (descriptor) {
        Object.defineProperty(vm.data, key, {
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          get: descriptor.get,
          set: debounce(10, function(newValue: any) {
            console.log('setvalue', key, newValue)
            // 从 watchDataMap 中取数据，防止从 vm.data 内取的是最新数据，无法得到 oldValue
            const oldValue = watchDataMap[key]
            fn.call(vm, newValue, oldValue)
            if (descriptor.set) {
              descriptor.set(newValue)
              watchDataMap[key] = newValue
            }
          })
        })
      }
    })
}

// 通过 setTimeout 来延迟 computed 属性的赋值
export default (vm: AnimPageInstance) => {
  setTimeout(() => {
    initWatch(vm)
  }, 0)
}
