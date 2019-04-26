import { storeMap, notifyStack } from '../core/model'
import { cloneObj } from '../utils/index'

export default function (dataFn: any) {
  return function (pageOpt: any) {
    const { onLoad: _onLoad, onUnload: _onUnload } = pageOpt

    pageOpt.onLoad = function () {
      const targetPage = this
      const dataFromStore = dataFn(storeMap)
      notifyStack.push([targetPage, dataFn, cloneObj(dataFromStore)])
      targetPage.setData(dataFromStore)
      _onLoad && _onLoad.apply(this, arguments)
    }

    pageOpt.onUnload = function () {
      notifyStack.pop()
      _onUnload && _onUnload.call(this)
    }

    return pageOpt
  }
}
