const app = getApp()

Page({
  data: {
    orders: [],
    currentTab: 0,
    tabs: ['全部', '待付款', '待发货', '已完成']
  },

  onShow() {
    this.loadOrders()
  },

  loadOrders() {
    const allOrders = app.globalData.orders || []
    const tab = this.data.currentTab
    let orders = allOrders

    if (tab === 1) orders = allOrders.filter(o => o.status === 'pending')
    else if (tab === 2) orders = allOrders.filter(o => o.status === 'shipped')
    else if (tab === 3) orders = allOrders.filter(o => o.status === 'completed')

    this.setData({ orders })
  },

  switchTab(e) {
    const { index } = e.currentTarget.dataset
    this.setData({ currentTab: index }, () => {
      this.loadOrders()
    })
  },

  cancelOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orders = app.globalData.orders.map(o =>
            o.id === id ? { ...o, status: 'cancelled', statusText: '已取消' } : o
          )
          app.globalData.orders = orders
          wx.setStorageSync('orders', orders)
          this.loadOrders()
        }
      }
    })
  },

  confirmOrder(e) {
    const { id } = e.currentTarget.dataset
    const orders = app.globalData.orders.map(o =>
      o.id === id ? { ...o, status: 'completed', statusText: '已完成' } : o
    )
    app.globalData.orders = orders
    wx.setStorageSync('orders', orders)
    this.loadOrders()
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
