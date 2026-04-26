App({
  onLaunch() {
    const cart = wx.getStorageSync('cart')
    const orders = wx.getStorageSync('orders')
    const favorites = wx.getStorageSync('favorites')
    const addresses = wx.getStorageSync('addresses')

    this.globalData.cart = cart || []
    this.globalData.orders = orders || []
    this.globalData.favorites = favorites || []
    this.globalData.addresses = addresses || []
  },

  globalData: {
    userInfo: null,
    cart: [],
    orders: [],
    favorites: [],
    addresses: []
  }
})
