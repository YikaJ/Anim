//index.js
//获取应用实例

const { Anim } = getApp()
const simpleMixin = require('../../mixins/simple')

Anim.Page({
  mixins: [ simpleMixin ],
  data: {
    pageMessage: 'page message'
  },
  onLoad() {
    console.log('Page onLoad')
    this.showModal3()
  },
  showModal3() {
    wx.showModal({
      title: this.data.pageMessage
    })
  }
})
