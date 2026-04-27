const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    banners: [],
    categories: [],
    hotFlowers: [],
    newFlowers: [],
    currentTab: 0,
    cartCount: 0,
    searchValue: '',
  },

  onLoad() {
    this.loadBanners()
    this.loadCategories()
    this.loadHotProducts()
    this.loadNewProducts()
  },

  onShow() {
    this.updateCartCount()
  },

  async loadBanners() {
    try {
      const banners = await api.getBanners()
      this.setData({ banners })
    } catch (e) {
      console.error('加载 Banner 失败', e)
    }
  },

  async loadCategories() {
    try {
      const categories = await api.getCategories()
      this.setData({ categories: categories.slice(0, 5) })
    } catch (e) {
      console.error('加载分类失败', e)
    }
  },

  async loadHotProducts() {
    try {
      const hotFlowers = await api.getProducts({ hot: 'true' })
      this.setData({ hotFlowers })
    } catch (e) {
      console.error('加载热销商品失败', e)
    }
  },

  async loadNewProducts() {
    try {
      const newFlowers = await api.getProducts({ isNew: 'true' })
      this.setData({ newFlowers })
    } catch (e) {
      console.error('加载新品失败', e)
    }
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
      url: `/pages/category/category?search=${this.data.searchValue}`,
    })
  },

  goToCategory() {
    wx.switchTab({ url: '/pages/category/category' })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  },
})
