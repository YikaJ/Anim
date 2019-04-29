import initRouter from '../core/router'

const RouterMixin = {
  onLoad(this: Anim.PageInstance, options: IAnyObject) {
    initRouter.call(this, options)
  }
}

export default RouterMixin