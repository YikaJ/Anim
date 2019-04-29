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
    push: (options: RouterNavigateOpts) =>wechatPromise
    pop: () => wechatPromise
    redirect: (options: RouterNavigateOpts) => wechatPromise
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