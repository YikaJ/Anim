declare namespace Anim {
  interface PageInstance extends Page.PageInstance {
    store: () => IAnyObject,
    mixins: PageInstance[],
    computed: Record<string, () => any>,
    watch: Record<string, (newVal: any, oldVal: any) => void>
    $router: Router
  }


  // Router
  interface Router {
    navigateTo: (options: RouterNavigateOpts) => wechatPromise
    navigateBack: (delta?: number) => wechatPromise
    redirectTo: (options: RouterNavigateOpts) => wechatPromise
    switchTab: (options: RouterNavigateOpts) => wechatPromise
    reLaunch: (options: RouterNavigateOpts) => wechatPromise

    go: (delta: number) => wechatPromise
  }
  
  interface RouterNavigateOpts {
    path: string,
    query: IAnyObject
  }


  // wechat
  type wxApi = keyof wx.Wx
  type asyncApi = (...argument: any[]) => Promise<any>
  type asyncWx = Partial<Record<Anim.wxApi, Anim.asyncApi>>
  type wechatPromise = Promise<any> | void 
  interface AsyncWxCallback {
    success?: (...args: any[]) => void,
    fail?: (...args: any[]) => void,
    complelte?: (...args: any[]) => void
  }
}