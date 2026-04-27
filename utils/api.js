const CONFIG = require('./config')

/**
 * 封装 wx.request，统一处理请求和错误
 */
function request({ url, method = 'GET', data = {} }) {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中...', mask: true })

    wx.request({
      url: CONFIG.baseURL + url,
      method,
      data,
      header: {
        'X-API-Key': CONFIG.apiKey,
      },
      success(res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          wx.showToast({ title: res.data.message || '请求失败', icon: 'none' })
          reject(res.data)
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常，请检查服务器', icon: 'none' })
        reject(err)
      },
      complete() {
        wx.hideLoading()
      },
    })
  })
}

// ===== 商品 =====

/** 获取商品列表 */
function getProducts(params = {}) {
  return request({ url: '/api/products', data: params })
}

/** 获取商品详情 */
function getProductDetail(id) {
  return request({ url: `/api/products/${id}` })
}

/** 获取分类列表 */
function getCategories() {
  return request({ url: '/api/products/categories/list' })
}

/** 获取 Banner 列表 */
function getBanners() {
  return request({ url: '/api/products/banners/list' })
}

// ===== 订单 =====

/** 创建订单 */
function createOrder(orderData) {
  return request({ url: '/api/orders', method: 'POST', data: orderData })
}

/** 获取订单列表 */
function getOrders(status) {
  return request({ url: '/api/orders', data: { status } })
}

/** 更新订单状态 */
function updateOrderStatus(id, status) {
  return request({ url: `/api/orders/${id}/status`, method: 'PATCH', data: { status } })
}

// ===== 地址 =====

/** 获取地址列表 */
function getAddresses() {
  return request({ url: '/api/addresses' })
}

/** 新增地址 */
function addAddress(addressData) {
  return request({ url: '/api/addresses', method: 'POST', data: addressData })
}

/** 编辑地址 */
function editAddress(id, addressData) {
  return request({ url: `/api/addresses/${id}`, method: 'PUT', data: addressData })
}

/** 删除地址 */
function deleteAddress(id) {
  return request({ url: `/api/addresses/${id}`, method: 'DELETE' })
}

/** 设为默认地址 */
function setDefaultAddress(id) {
  return request({ url: `/api/addresses/${id}/default`, method: 'PATCH' })
}

// ===== 用户 =====

/** 登录 */
function login(userInfo) {
  return request({ url: '/api/users/login', method: 'POST', data: userInfo })
}

module.exports = {
  getProducts,
  getProductDetail,
  getCategories,
  getBanners,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAddresses,
  addAddress,
  editAddress,
  deleteAddress,
  setDefaultAddress,
  login,
}
