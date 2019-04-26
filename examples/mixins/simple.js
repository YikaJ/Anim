module.exports = {
  data: {
    mixinMessage: 'simple Page mixin (mixinMessage)'
  },
  onLoad() {
    console.log('simple-mixin onload')
    this.showToast2()
  },
  showToast2() {
    wx.showModal({
      title: this.data.mixinMessage,
    })
  }
}