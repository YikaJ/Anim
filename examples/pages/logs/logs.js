//logs.js
const { Anim, counterStore } = getApp()
Anim.Page({
  handleTap() {
    counterStore.addCount()
  }
})
