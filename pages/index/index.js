const mock = require('../../mock/data')
const app = getApp()

Page({
  data: {
    banners: [],
    categories: [],
    hotFlowers: [],
    newFlowers: [],
    currentTab: 0,
    cartCount: 0,
    searchValue: ''
  },

  onLoad() {
    this.setData({
      banners: mock.banners,
      categories: mock.categories.slice(0, 5),
      hotFlowers: mock.getHotFlowers(),
      newFlowers: mock.getNewFlowers()
    })
  },

  onShow() {
    this.updateCartCount()
  },

  updateCartCount() {
    const cart = app.globalData.cart || []
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    this.setData({ cartCount: count })
  },

  onSearchInput(e) {
    this.setData({ searchValue: e.detail.value })
  },

  onSearch() {
    if (!this.data.searchValue.trim()) return
    wx.navigateTo({
      url: `/pages/category/category?search=${this.data.searchValue}`
    })
  },

  goToCategory() {
    wx.switchTab({ url: '/pages/category/category' })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  }
})
