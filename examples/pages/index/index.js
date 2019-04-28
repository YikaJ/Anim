//index.js
//获取应用实例

const { Anim, counterStore } = getApp()
const simpleMixin = require('../../mixins/simple')

Anim.Page({
  mixins: [ simpleMixin ],
  data: {
    pageMessage: 'page message'
  },
  computed: {
    computedMessage() {
      return this.data.pageMessage + 'xxxxx'
    }
  },
  onLoad() {
    console.log('Page onLoad')
    this.showModal3()
  },
  showModal3() {
    wx.showModal({
      title: this.data.pageMessage
    })
  },
  handleTap() {
    counterStore.addCount()
  },
  handleTap2() {
    this.showModal()
  },
  handleTap3() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  }
})
