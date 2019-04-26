const Anim = require('./lib/anim.js')

// Global Mixin
Anim.Page.mixin({
  onLoad() {
    console.log('global Page mixin')
    wx.showToast({ title: 'Nice!' })
  }
})

//app.js
Anim.App({
  onLaunch: function () {
    this.Anim = Anim
  }
})