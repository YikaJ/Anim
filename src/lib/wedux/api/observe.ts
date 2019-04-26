import { storeMap } from '../core/model'
import { notifyUpdate } from '../core/index'
import { cloneObj, isProxyNeeded } from '../utils/index'
import Proxy from '../utils/Proxy'

export default function (storeInstance: any, storeName: string) {
  storeName = storeName || storeInstance.constructor.name.toLowerCase()
  const ownProps = Object.getOwnPropertyNames(storeInstance)

  // 挂载 storeName
  storeInstance.__storeName__ = storeName

  if (!storeMap[storeName]) {
    storeMap[storeName] = cloneObj(storeInstance, ownProps)
  }

  return wrapToProxy(storeInstance, [storeName])
}

const wrapToProxy = (object: any, keys: any) => {
  Object.keys(object).forEach(key => {
    if (isProxyNeeded(object[key])) {
      object[key] = wrapToProxy(object[key], keys.concat([key]))
    }
  })

  return new Proxy(object, {
    get(target: any, key: any) {
      if (key === '__isProxy') return true
      if (key === '__data') return findInStoreMap(keys)
      // return Reflect.get(target, key)
      // const targetValue = Reflect.get(target, key)
      // if (targetValue && targetValue.__isProxy) return targetValue
      const valueInStoreMap = findInStoreMap(keys.concat([key]))
      if (valueInStoreMap !== undefined) return valueInStoreMap
      return Reflect.get(target, key)
    },
    set(target: any, key: any, value: any) {
      const pureValue = value.__isProxy && value.__data || value
      const objectValue = isProxyNeeded(pureValue) && wrapToProxy(cloneObj(pureValue), keys.concat([key])) || pureValue
      const res = Reflect.set(target, key, objectValue)
      setValueInStoreMap(keys.concat([key]), pureValue)
      notifyUpdate()
      return res
    }
  })
}

const findInStoreMap = (keys: any) => {
  return keys.reduce((acc: any, key: any) => {
    return acc && acc[key] || undefined
  }, storeMap)
}

const setValueInStoreMap = (keys: any, value: any) => {
  const len = keys.length
  const lastKey = keys[len - 1]
  let target = storeMap
  keys.forEach((key: any, index: any) => {
    if (index === len - 1) return
    target = target[key]
  })
  target[lastKey] = value
}
