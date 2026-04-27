const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    items: [],
    totalPrice: 0,
    address: null,
    hasAddress: false,
    remark: '',
    showToast: false,
    toastText: '',
  },

  onLoad(options) {
    const itemsJson = decodeURIComponent(options.items || '[]')
    const total = parseFloat(options.total || '0')
    const items = JSON.parse(itemsJson)
    const addresses = app.globalData.addresses || []
    const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0]

    this.setData({
      items,
      totalPrice: total,
      address: defaultAddr || null,
      hasAddress: !!defaultAddr,
    })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  selectAddress() {
    wx.navigateTo({
      url: '/pages/user/user?tab=address',
    })
  },

  async submitOrder() {
    const { items, totalPrice, address, remark } = this.data

    if (!address) {
      this.showToast('请添加收货地址 📍')
      return
    }

    try {
      const order = await api.createOrder({ items, totalPrice, address, remark })

      // 从购物车移除已下单商品
      const cart = app.globalData.cart || []
      const itemIds = items.map((i) => i.id)
      const newCart = cart.filter((c) => !itemIds.includes(c.id))
      app.globalData.cart = newCart
      wx.setStorageSync('cart', newCart)

      this.showToast('下单成功 🎉')
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/orders/orders',
        })
      }, 1000)
    } catch (e) {
      console.error('下单失败', e)
    }
  },

  showToast(text) {
    this.setData({ showToast: true, toastText: text })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 1500)
  },
})
