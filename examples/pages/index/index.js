//index.js
//获取应用实例

const { Anim, counterStore } = getApp()
const simpleMixin = require('../../mixins/simple')

Anim.Page({
  mixins: [ simpleMixin ],
  data: {
    pageMessage: 'page message',
    formData: {
      arrData: []
    }
  },
  computed: {
    computedMessage() {
      return this.data.pageMessage + 'xxxxx'
    },
    computedArrData() {
      const { formData } = this.data
      const computedData = formData.arrData.map(() => ({ value: Math.random() }))
      return computedData
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
    this.$router.navigateTo({
      path: '/pages/logs/logs'
    })
  },
  handleTap4() {
    this.$router.navigateTo({
      path: '/pages/router/router',
      query: {
        a: {
          b: {
            c: 'heheda'
          }
        },
        d: [1, 2],
        e: [{f: '1'}, {f: '2'}]
      }
    }).then(() => {
      console.log('router promise')
    })
  },
  handleTap5() {
    const { formData } = this.data
    this.setData({
      formData: Object.assign({}, formData, {
        arrData: formData.arrData.concat({ username: '' })
      })
    })
  }
})
