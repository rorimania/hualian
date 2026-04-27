const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    categories: [],
    flowers: [],
    currentCategory: null,
    searchValue: '',
    showSearch: false,
    cartCount: 0,
  },

  onLoad(options) {
    this.loadCategories()
    this.loadProducts()

    if (options.search) {
      this.setData({
        showSearch: true,
        searchValue: options.search,
      })
      this.doSearch(options.search)
    }
  },

  onShow() {
    this.updateCartCount()
  },

  updateCartCount() {
    const cart = app.globalData.cart || []
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    this.setData({ cartCount: count })
  },

  async loadCategories() {
    try {
      const categories = await api.getCategories()
      this.setData({ categories })
    } catch (e) {
      console.error('加载分类失败', e)
    }
  },

  async loadProducts(categoryId) {
    try {
      const params = categoryId ? { categoryId } : {}
      const flowers = await api.getProducts(params)
      this.setData({ flowers, currentCategory: categoryId || null, searchValue: '' })
    } catch (e) {
      console.error('加载商品失败', e)
    }
  },

  selectCategory(e) {
    const { id } = e.currentTarget.dataset
    this.loadProducts(id)
  },

  onSearchInput(e) {
    this.setData({ searchValue: e.detail.value })
  },

  async doSearch(keyword) {
    try {
      const flowers = await api.getProducts({ search: keyword })
      this.setData({ flowers })
    } catch (e) {
      console.error('搜索失败', e)
    }
  },

  onSearch() {
    if (!this.data.searchValue.trim()) return
    this.doSearch(this.data.searchValue.trim())
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
})
