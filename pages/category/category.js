const mock = require('../../mock/data')
const app = getApp()

Page({
  data: {
    categories: [],
    flowers: [],
    currentCategory: null,
    searchValue: '',
    showSearch: false,
    cartCount: 0
  },

  onLoad(options) {
    const cats = mock.categories
    this.setData({
      categories: cats,
      flowers: mock.flowers,
      currentCategory: null
    })

    if (options.search) {
      this.setData({
        showSearch: true,
        searchValue: options.search
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

  selectCategory(e) {
    const { id } = e.currentTarget.dataset
    const flowers = id ? mock.getFlowersByCategory(id) : mock.flowers
    this.setData({
      currentCategory: id,
      flowers,
      searchValue: ''
    })
  },

  onSearchInput(e) {
    this.setData({ searchValue: e.detail.value })
  },

  doSearch(keyword) {
    const kw = keyword.toLowerCase()
    const results = mock.flowers.filter(f =>
      f.name.includes(kw) ||
      f.englishName.toLowerCase().includes(kw) ||
      f.desc.includes(kw) ||
      f.story.includes(kw)
    )
    this.setData({ flowers: results })
  },

  onSearch() {
    if (!this.data.searchValue.trim()) return
    this.doSearch(this.data.searchValue.trim())
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
