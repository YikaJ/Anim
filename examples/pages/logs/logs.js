//logs.js
const { Anim, counterStore } = getApp()
Page({
  onLoad() {
    console.log(this)
  },
  handleTap() {
    counterStore.addCount()
  }
})
