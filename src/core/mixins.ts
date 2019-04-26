import { PAGE_LIFECYCLE } from '../constant/page'


// 除下列其他的 mixins 为覆盖操作

const lifeCycleMap = PAGE_LIFECYCLE.reduce((obj: any, key) => {
  obj[key] = []
  return obj
}, {})

const PAGE_INITIAL_OPTIONS = {
  mixins: [],
  data: {},
  ...lifeCycleMap
}

// 将 mixins 与 options 混合
export function mixOptions(
  mixins: Object[],
) {
  const mixOptions = mixins.reduce((options, opt: any) => {
    Object.keys(opt).forEach(key => {
      if(PAGE_LIFECYCLE.indexOf(key) !== -1) {
        options[key].push(opt[key])
      }
    })
    return options
  }, PAGE_INITIAL_OPTIONS)

  return transformOptions(mixOptions)
}

export function transformOptions(options: any) {
  const handleLifeCycleOpts =  PAGE_LIFECYCLE
    .reduce((memory, key) => {
      if(memory[key] && memory[key].length > 0) {
        // 浅复制一层数组做存储
        memory[`_${key}_`] = memory[key].slice()
        memory[key] = function(...args: any[]) {
          memory[`_${key}_`].forEach((fn: any) => {
            fn.apply(null, args)
          })
        }
      } else {
        delete memory[key]
      }

      return memory
    }, options)
  console.log('options', handleLifeCycleOpts)
  return handleLifeCycleOpts
}