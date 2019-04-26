const { system } = wx.getSystemInfoSync()

let proxy: ProxyConstructor | any
try {
  proxy = Proxy
  // throw new Error() // Testing for env without Proxy
} catch (err) {
  proxy = function (obj: any, handler: any) {
    const proxyObj = Object.create(obj.constructor.prototype, {
      '__proxyhandler__': {
        value: handler
      }
    })
    Object.keys(obj).forEach(key => {
      Object.defineProperty(proxyObj, key, {
        enumerable: true,
        get: function () { return this.__proxyhandler__.get(obj, key) },
        set: function (value) { return this.__proxyhandler__.set(obj, key, value) }
      })
    })
    return proxyObj
  }
}

export default proxy
