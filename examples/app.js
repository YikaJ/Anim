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
      return this.data.count + 1
    }
  },
  watch: {
    moreCount(newCount, oldCount) {
      console.log('I Am the New Count', newCount)
      console.log('I Am the Old Count', oldCount)
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
Anim.App({
  onLaunch: function () {
    this.Anim = Anim
    this.counterStore = counterStore
  }
})