const app = getApp()

Page({
  data: {
    items: [],
    totalPrice: 0,
    address: null,
    hasAddress: false,
    remark: '',
    showToast: false,
    toastText: ''
  },

  onLoad(options) {
    const itemsJson = decodeURIComponent(options.items || '[]')
    const total = parseFloat(options.total || '0')
    const items = JSON.parse(itemsJson)
    const addresses = app.globalData.addresses || []
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0]

    this.setData({
      items,
      totalPrice: total,
      address: defaultAddr || null,
      hasAddress: !!defaultAddr
    })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  selectAddress() {
    wx.navigateTo({
      url: '/pages/user/user?tab=address'
    })
  },

  submitOrder() {
    const { items, totalPrice, address, remark } = this.data

    if (!address) {
      this.showToast('请添加收货地址 📍')
      return
    }

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    const order = {
      id,
      shortId: id.slice(0, 8),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice,
      address,
      remark,
      status: 'pending',
      statusText: '待付款',
      createTime: new Date().toLocaleString('zh-CN')
    }

    const orders = app.globalData.orders || []
    orders.unshift(order)
    app.globalData.orders = orders
    wx.setStorageSync('orders', orders)

    // 从购物车移除已下单商品
    const cart = app.globalData.cart || []
    const itemIds = items.map(i => i.id)
    const newCart = cart.filter(c => !itemIds.includes(c.id))
    app.globalData.cart = newCart
    wx.setStorageSync('cart', newCart)

    this.showToast('下单成功 🎉')
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/orders/orders'
      })
    }, 1000)
  },

  showToast(text) {
    this.setData({ showToast: true, toastText: text })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 1500)
  }
})
