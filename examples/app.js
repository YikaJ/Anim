const Anim = require('./lib/anim.js')

// Global Mixin
Anim.Page.mixin({
  data: {
    message: 'global Page mixin',
    mixinMessage: 'global Page mixin (mixinMessage)'
  },
  onLoad() {
    console.log(this.data.message)
    this.showModal()
  },
  showModal() {
    wx.showModal({ title: this.data.message })
  }
})

//app.js
Anim.App({
  onLaunch: function () {
    this.Anim = Anim
  }
})