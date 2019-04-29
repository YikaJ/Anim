import promisify from '../lib/promisify'

const NAVIGATE_API_NAMES: Anim.wxApi[] = ['navigateTo', 'navigateBack', 'redirectTo', 'reLaunch']
const REQUEST_API_NAMES: Anim.wxApi[] = ['request', 'downloadFile', 'uploadFile']
// 反向思维，带 Sync 的 API，去掉就为异步 API
const NAME_WITH_ASYNC_API_NAMES: Anim.wxApi[] = Object.keys(wx)
  .filter(key => key.includes('Sync'))
  .map(key => key.replace('Sync', '') as Anim.wxApi)

const ASYNC_API_NAMES: Anim.wxApi[] = NAME_WITH_ASYNC_API_NAMES
  .concat(NAVIGATE_API_NAMES)
  .concat(REQUEST_API_NAMES)

const initApi: Anim.asyncWx = {}
const asyncApi = ASYNC_API_NAMES.reduce((api, key) => {
  api[key] = promisify(wx[key])
  return api
}, initApi)

const wechatApi = {
  ...wx,
  ...asyncApi
}

export default wechatApi