// const Anim = require('@govcloud/anim/anim')
const Anim = require('./lib/anim.js')
const initCounterStore = require('./store/counter.js')
const counterStore = initCounterStore()

// Global Mixin
Anim.Page.mixin({
  store: (state) => {
    return {
      count: state.counter.count
    }
  },
  data: {
    message: 'global Page mixin',
    mixinMessage: 'global Page mixin (mixinMessage)'
  },
  computed: {
    moreCount() {
      console.log(this.data)
      return this.data.count + 1
    }
  },
  onShow() {
    console.log(this.data.message)
    this.showModal()
  },
  showModal() {
    wx.showModal({ title: this.data.message })
  }
})

//app.js
App({
  onLaunch: function () {
    this.Anim = Anim
    this.counterStore = counterStore
  }
})