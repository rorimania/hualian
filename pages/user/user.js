const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    userInfo: null,
    loggedIn: false,
    orderCounts: { all: 0, pending: 0, shipped: 0, completed: 0 },
    favorites: [],
    favoriteFlowers: [],
    addresses: [],
    showAddressForm: false,
    editingAddress: null,
    formName: '',
    formPhone: '',
    formAddress: '',
    currentTab: 'profile',
  },

  onLoad(options) {
    const tab = options.tab || 'profile'
    this.setData({ currentTab: tab })
  },

  onShow() {
    this.loadData()
  },

  async loadData() {
    const userInfo = app.globalData.userInfo
    const orders = app.globalData.orders || []
    const favoriteIds = app.globalData.favorites || []

    this.setData({
      userInfo,
      loggedIn: !!userInfo,
      orderCounts: {
        all: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        shipped: orders.filter((o) => o.status === 'shipped').length,
        completed: orders.filter((o) => o.status === 'completed').length,
      },
      favorites: favoriteIds,
    })

    this.loadFavoriteFlowers(favoriteIds)
    this.loadAddresses()
  },

  async loadFavoriteFlowers(favoriteIds) {
    if (favoriteIds.length === 0) {
      this.setData({ favoriteFlowers: [] })
      return
    }
    try {
      const allProducts = await api.getProducts()
      const favoriteFlowers = allProducts.filter((f) => favoriteIds.includes(f.id))
      this.setData({ favoriteFlowers })
    } catch (e) {
      console.error('加载收藏商品失败', e)
    }
  },

  async loadAddresses() {
    try {
      const addresses = await api.getAddresses()
      // 同步到全局，供下单页使用
      app.globalData.addresses = addresses
      this.setData({ addresses })
    } catch (e) {
      console.error('加载地址失败', e)
    }
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于展示用户信息',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          loggedIn: true,
        })
      },
      fail: () => {
        const defaultInfo = {
          nickName: '花恋小天使',
          avatarUrl: '',
        }
        app.globalData.userInfo = defaultInfo
        this.setData({
          userInfo: defaultInfo,
          loggedIn: true,
        })
      },
    })
  },

  goToOrders() {
    wx.navigateTo({ url: '/pages/orders/orders' })
  },

  goToOrdersTab(e) {
    const { status } = e.currentTarget.dataset
    wx.navigateTo({ url: '/pages/orders/orders' })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },

  removeFavorite(e) {
    const { id } = e.currentTarget.dataset
    const favorites = app.globalData.favorites.filter((fid) => fid !== parseInt(id))
    app.globalData.favorites = favorites
    wx.setStorageSync('favorites', favorites)
    this.loadData()
  },

  switchTab(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({ currentTab: tab })
  },

  // 地址管理
  addAddress() {
    this.setData({
      showAddressForm: true,
      editingAddress: null,
      formName: '',
      formPhone: '',
      formAddress: '',
    })
  },

  editAddress(e) {
    const { address } = e.currentTarget.dataset
    this.setData({
      showAddressForm: true,
      editingAddress: address,
      formName: address.name,
      formPhone: address.phone,
      formAddress: address.fullAddress,
    })
  },

  closeForm() {
    this.setData({ showAddressForm: false })
  },

  onNameInput(e) {
    this.setData({ formName: e.detail.value })
  },
  onPhoneInput(e) {
    this.setData({ formPhone: e.detail.value })
  },
  onAddressInput(e) {
    this.setData({ formAddress: e.detail.value })
  },

  async saveAddress() {
    const { formName, formPhone, formAddress, editingAddress } = this.data
    if (!formName || !formPhone || !formAddress) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    try {
      if (editingAddress) {
        await api.editAddress(editingAddress.id, {
          name: formName,
          phone: formPhone,
          fullAddress: formAddress,
        })
      } else {
        await api.addAddress({
          name: formName,
          phone: formPhone,
          fullAddress: formAddress,
        })
      }
      this.setData({ showAddressForm: false })
      this.loadAddresses()
      wx.showToast({ title: '保存成功', icon: 'success' })
    } catch (e) {
      console.error('保存地址失败', e)
    }
  },

  async deleteAddress(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除此地址吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.deleteAddress(id)
            this.loadAddresses()
          } catch (e) {
            console.error('删除地址失败', e)
          }
        }
      },
    })
  },

  async setDefaultAddress(e) {
    const { id } = e.currentTarget.dataset
    try {
      await api.setDefaultAddress(id)
      this.loadAddresses()
    } catch (e) {
      console.error('设置默认地址失败', e)
    }
  },
})
