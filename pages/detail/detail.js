const mock = require('../../mock/data')
const app = getApp()

Page({
  data: {
    flower: null,
    currentImage: 0,
    quantity: 1,
    isFavorite: false,
    cartCount: 0,
    showToast: false,
    toastText: ''
  },

  onLoad(options) {
    const { id } = options
    const flower = mock.getFlowerById(parseInt(id))
    const favorites = app.globalData.favorites || []
    const isFavorite = favorites.includes(flower.id)

    this.setData({
      flower,
      isFavorite,
      currentImage: 0
    })
  },

  onShow() {
    const cart = app.globalData.cart || []
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    this.setData({ cartCount: count })
  },

  onImageChange(e) {
    this.setData({ currentImage: e.detail.current })
  },

  decreaseQty() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 })
    }
  },

  increaseQty() {
    if (this.data.quantity < 99) {
      this.setData({ quantity: this.data.quantity + 1 })
    }
  },

  toggleFavorite() {
    const { flower, isFavorite } = this.data
    const favorites = app.globalData.favorites || []
    let newFavorites

    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== flower.id)
      this.showToast('已取消收藏 💔')
    } else {
      newFavorites = [...favorites, flower.id]
      this.showToast('已收藏 💖')
    }

    app.globalData.favorites = newFavorites
    wx.setStorageSync('favorites', newFavorites)
    this.setData({ isFavorite: !isFavorite })
  },

  addToCart() {
    const { flower, quantity } = this.data
    const cart = app.globalData.cart || []
    const existing = cart.find(item => item.id === flower.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({
        id: flower.id,
        name: flower.name,
        image: flower.images[0],
        price: flower.price,
        quantity: quantity,
        selected: true
      })
    }

    app.globalData.cart = cart
    wx.setStorageSync('cart', cart)
    this.setData({ cartCount: cart.reduce((s, i) => s + i.quantity, 0) })
    this.showToast('已加入购物车 🛒')
  },

  buyNow() {
    this.addToCart()
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  showToast(text) {
    this.setData({ showToast: true, toastText: text })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 1500)
  }
})
