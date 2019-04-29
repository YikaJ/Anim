//logs.js
const { Anim, counterStore } = getApp()
Anim.Page({
  onLoad() {
    console.log(this)
  },
  handleTap() {
    counterStore.addCount()
  }
})
