const app = getApp()
const mock = require('../../mock/data')

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
    currentTab: 'profile'
  },

  onLoad(options) {
    const tab = options.tab || 'profile'
    this.setData({ currentTab: tab })
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const userInfo = app.globalData.userInfo
    const orders = app.globalData.orders || []
    const favoriteIds = app.globalData.favorites || []
    const addresses = app.globalData.addresses || []

    const favoriteFlowers = favoriteIds
      .map(id => mock.getFlowerById(id))
      .filter(Boolean)

    this.setData({
      userInfo,
      loggedIn: !!userInfo,
      orderCounts: {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        completed: orders.filter(o => o.status === 'completed').length
      },
      favorites: favoriteIds,
      favoriteFlowers,
      addresses
    })
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于展示用户信息',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          loggedIn: true
        })
      },
      fail: () => {
        // 降级：使用默认信息
        const defaultInfo = {
          nickName: '花恋小天使',
          avatarUrl: ''
        }
        app.globalData.userInfo = defaultInfo
        this.setData({
          userInfo: defaultInfo,
          loggedIn: true
        })
      }
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
      url: `/pages/detail/detail?id=${id}`
    })
  },

  removeFavorite(e) {
    const { id } = e.currentTarget.dataset
    const favorites = app.globalData.favorites.filter(fid => fid !== parseInt(id))
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
      formAddress: ''
    })
  },

  editAddress(e) {
    const { address } = e.currentTarget.dataset
    this.setData({
      showAddressForm: true,
      editingAddress: address,
      formName: address.name,
      formPhone: address.phone,
      formAddress: address.fullAddress
    })
  },

  closeForm() {
    this.setData({ showAddressForm: false })
  },

  onNameInput(e) { this.setData({ formName: e.detail.value }) },
  onPhoneInput(e) { this.setData({ formPhone: e.detail.value }) },
  onAddressInput(e) { this.setData({ formAddress: e.detail.value }) },

  saveAddress() {
    const { formName, formPhone, formAddress, editingAddress } = this.data
    if (!formName || !formPhone || !formAddress) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    const addresses = [...(app.globalData.addresses || [])]
    const newAddr = {
      id: editingAddress ? editingAddress.id : Date.now(),
      name: formName,
      phone: formPhone,
      fullAddress: formAddress,
      isDefault: addresses.length === 0
    }

    if (editingAddress) {
      const idx = addresses.findIndex(a => a.id === editingAddress.id)
      if (idx >= 0) addresses[idx] = newAddr
    } else {
      addresses.push(newAddr)
    }

    app.globalData.addresses = addresses
    wx.setStorageSync('addresses', addresses)
    this.setData({ showAddressForm: false })
    this.loadData()
    wx.showToast({ title: '保存成功', icon: 'success' })
  },

  deleteAddress(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除此地址吗？',
      success: (res) => {
        if (res.confirm) {
          const addresses = app.globalData.addresses.filter(a => a.id !== id)
          app.globalData.addresses = addresses
          wx.setStorageSync('addresses', addresses)
          this.loadData()
        }
      }
    })
  },

  setDefaultAddress(e) {
    const { id } = e.currentTarget.dataset
    const addresses = app.globalData.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }))
    app.globalData.addresses = addresses
    wx.setStorageSync('addresses', addresses)
    this.loadData()
  }
})
