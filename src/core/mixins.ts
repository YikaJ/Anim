import { PAGE_LIFECYCLE } from '../constant/page'


// 除下列其他的 mixins 为覆盖操作
const lifeCycleMap = PAGE_LIFECYCLE.reduce((obj: any, key) => {
  obj[key] = []
  return obj
}, {})

// 初始化结构体
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
      // lifecycle
      if(PAGE_LIFECYCLE.indexOf(key) !== -1) {
        return options[key].push(opt[key])
      }

      // data（浅层 copy 顺序依次 global / mixin / page data）
      if(key === 'data') {
        options.data = {
          ...options.data,
          ...opt.data
        }
        return
      }

      // others
      options[key] = opt[key]
    })
    return options
  }, PAGE_INITIAL_OPTIONS)

  return transformOptions(mixOptions)
}

// 转换 options
export function transformOptions(options: any) {
  // 生命周期合并
  const finalOptions =  PAGE_LIFECYCLE
    .reduce((memory, key) => {
      if(memory[key] && memory[key].length > 0) {
        // 浅复制一层数组做存储
        memory[`__anim_${key}`] = memory[key].slice()
        memory[key] = function(...args: any[]) {
          memory[`__anim_${key}`].forEach((fn: any) => {
            fn.apply(this, args)
          })
        }
      } else {
        delete memory[key]
      }

      return memory
    }, options)
  
  return finalOptions
}