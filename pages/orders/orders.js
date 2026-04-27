const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    orders: [],
    currentTab: 0,
    tabs: ['全部', '待付款', '待发货', '已完成'],
  },

  onShow() {
    this.loadOrders()
  },

  async loadOrders() {
    const tab = this.data.currentTab
    const statusMap = { 0: 'all', 1: 'pending', 2: 'shipped', 3: 'completed' }
    const status = statusMap[tab]

    try {
      const orders = await api.getOrders(status)
      this.setData({ orders })
    } catch (e) {
      console.error('加载订单失败', e)
    }
  },

  switchTab(e) {
    const { index } = e.currentTarget.dataset
    this.setData({ currentTab: index }, () => {
      this.loadOrders()
    })
  },

  async cancelOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要取消此订单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.updateOrderStatus(id, 'cancelled')
            this.loadOrders()
          } catch (e) {
            console.error('取消订单失败', e)
          }
        }
      },
    })
  },

  async confirmOrder(e) {
    const { id } = e.currentTarget.dataset
    try {
      await api.updateOrderStatus(id, 'completed')
      this.loadOrders()
    } catch (e) {
      console.error('确认收货失败', e)
    }
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
})
