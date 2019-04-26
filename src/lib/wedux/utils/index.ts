/**
 * Simple deep compare for data Object
 */
export const isEqualObj = function (obj1: any, obj2: any) {
  if (Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2)) return false
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  let result = true
  Object.keys(obj1).forEach(key => {
    switch (Object.prototype.toString.call(obj1[key])) {
      case '[object Object]':
        if (!isEqualObj(obj1[key], obj2[key])) result = false
        break
      case '[object Array]':
        if (!isEqualArray(obj1[key], obj2[key])) result = false
        break
      default:
        if (obj1[key] !== obj2[key]) result = false
    }
  })
  return result
}

export const isEqualArray = (array1: any, array2: any) => {
  if (Object.prototype.toString.call(array1) !== Object.prototype.toString.call(array2)) return false
  if (array1.length !== array2.length) return false

  let result = true
  array1.forEach((item: any, index: number) => {
    if (item !== array2[index]) result = false
  })
  return result
}

/**
 * Simple deep copy for data Object
 */
export const cloneObj = function (obj: any, includedKeys?: any) {
  let newObj: any = {}
  Object.keys(obj).forEach(key => {
    if (includedKeys && !includedKeys.includes(key)) return
    switch (Object.prototype.toString.call(obj[key])) {
      case '[object Object]':
        newObj[key] = cloneObj(obj[key])
        break
      case '[object Array]':
        newObj[key] = cloneArray(obj[key])
        break
      default:
        newObj[key] = obj[key]
    }
  })
  return newObj
}

export const cloneArray = (array: any) => {
  return array.map((item: any) => {
    switch (Object.prototype.toString.call(item)) {
      case '[object Object]':
        return cloneObj(item)
      case '[object Array]':
        return cloneArray(item)
      default:
        return item
    }
  })
}

export const isProxyNeeded = (value: any) => {
  const type = Object.prototype.toString.call(value)
  return type === '[object Object]' || type === '[object Array]'
}