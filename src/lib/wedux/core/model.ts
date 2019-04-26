/**
 * {storeName: StoreInternalVariables}
 * Always keep storeMap as pure object without Proxy
 */
export const storeMap: any = {}

/**
 * [[targetPage, dataFn, oldData]]
 *  - targetPage | Object, Page instance of Mini app
 *  - dataFn     | Func, generate page data from store
 *  - oldData    | Object, generated data in last time
 */
export const notifyStack: any[] = []
