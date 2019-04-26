import { storeMap, notifyStack } from '../core/model'
import { isEqualObj, cloneObj } from '../utils/index'

const timeout = 5
let batch = 0

export function notifyUpdate () {
  batch++
  setTimeout(() => {
    if (--batch === 0) {
      const len = notifyStack.length
      for (let i = len - 1; i >= 0; i--) {
        const [targetPage, dataFn, oldData] = notifyStack[i]
        const newData = dataFn(storeMap)
        if (!isEqualObj(oldData, newData)) {
          notifyStack[i][2] = cloneObj(newData)
          targetPage.setData(newData)
        }
      }
    }
  }, timeout)
}
