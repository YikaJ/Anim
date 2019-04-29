export default function promisify(fn: Function): Anim.asyncApi {
  return function(fnOptions: Anim.AsyncWxCallback) {
    return new Promise((resolve, reject) => {
      fn({
        ...fnOptions,
        success(res: any) {
          fnOptions.success && fnOptions.success(res)
          resolve(res)
        },
        fail(res: any) {
          fnOptions.fail && fnOptions.fail(res)
          reject(res)
        }
      })
    })
  }
}