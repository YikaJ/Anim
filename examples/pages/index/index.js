//index.js
//获取应用实例

const { Anim } = getApp()
const simpleMixin = require('../../mixins/simple')

Anim.Page({
  mixins: [ simpleMixin ],
  onLoad() {
    console.log('Page onLoad')
  }
})
