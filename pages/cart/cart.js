const app = getApp()

Page({
  data: {
    cart: [],
    totalPrice: 0,
    allSelected: true,
    hasCart: false,
    showToast: false,
    toastText: ''
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const cart = app.globalData.cart || []
    const hasCart = cart.length > 0
    this.setData({ cart, hasCart })
    this.calculateTotal()
  },

  calculateTotal() {
    const { cart } = this.data
    const selectedItems = cart.filter(item => item.selected)
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const allSelected = cart.length > 0 && cart.every(item => item.selected)
    this.setData({ totalPrice, allSelected })
  },

  toggleSelect(e) {
    const { id } = e.currentTarget.dataset
    const cart = this.data.cart.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
    this.setData({ cart })
    app.globalData.cart = cart
    wx.setStorageSync('cart', cart)
    this.calculateTotal()
  },

  toggleAllSelect() {
    const { cart, allSelected } = this.data
    const newCart = cart.map(item => ({ ...item, selected: !allSelected }))
    this.setData({ cart: newCart })
    app.globalData.cart = newCart
    wx.setStorageSync('cart', newCart)
    this.calculateTotal()
  },

  decreaseQty(e) {
    const { id } = e.currentTarget.dataset
    const cart = this.data.cart.map(item => {
      if (item.id !== id) return item
      const qty = Math.max(1, item.quantity - 1)
      return { ...item, quantity: qty }
    })
    this.setData({ cart })
    app.globalData.cart = cart
    wx.setStorageSync('cart', cart)
    this.calculateTotal()
  },

  increaseQty(e) {
    const { id } = e.currentTarget.dataset
    const cart = this.data.cart.map(item => {
      if (item.id !== id) return item
      const qty = Math.min(99, item.quantity + 1)
      return { ...item, quantity: qty }
    })
    this.setData({ cart })
    app.globalData.cart = cart
    wx.setStorageSync('cart', cart)
    this.calculateTotal()
  },

  removeItem(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要移除此商品吗？',
      success: (res) => {
        if (res.confirm) {
          const cart = this.data.cart.filter(item => item.id !== id)
          this.setData({ cart, hasCart: cart.length > 0 })
          app.globalData.cart = cart
          wx.setStorageSync('cart', cart)
          this.calculateTotal()
          this.showToast('已移除 🗑️')
        }
      }
    })
  },

  goToCheckout() {
    const { cart, totalPrice } = this.data
    const selectedItems = cart.filter(item => item.selected)
    if (selectedItems.length === 0) {
      this.showToast('请选择商品 💫')
      return
    }
    const itemsJson = encodeURIComponent(JSON.stringify(selectedItems))
    wx.navigateTo({
      url: `/pages/order/order?items=${itemsJson}&total=${totalPrice}`
    })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  goToCategory() {
    wx.switchTab({ url: '/pages/category/category' })
  },

  showToast(text) {
    this.setData({ showToast: true, toastText: text })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 1500)
  }
})
