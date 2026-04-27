# 🌸 花恋 - 前端适配说明

将小程序从本地 Mock 数据切换到后端 API 的适配文档。

## 概述

原有的小程序直接从 `mock/data.js` 读取商品、分类、Banner 等数据，订单和地址存储在本地缓存中。经过适配后，所有数据通过 HTTP 请求从后端服务获取，实现了前后端分离。

## 新增文件

### `utils/config.js` — 环境配置

```javascript
baseURL: 'http://localhost:3000'  // 后端服务地址
```

- 开发时使用 `localhost`，微信开发者工具需在「详情」→「本地设置」勾选「不校验合法域名」
- 发布时替换为线上域名，并在小程序管理后台配置 `request` 合法域名

### `utils/api.js` — API 封装

对 `wx.request` 的统一封装，所有 API 调用返回 Promise，自动处理：
- `Loading` 提示
- 错误码判断（`code === 0` 为成功）
- 网络异常提示

提供以下方法：

| 方法 | 对应接口 | 说明 |
|------|----------|------|
| `getProducts(params)` | `GET /api/products` | 商品列表 |
| `getProductDetail(id)` | `GET /api/products/:id` | 商品详情 |
| `getCategories()` | `GET /api/products/categories/list` | 分类列表 |
| `getBanners()` | `GET /api/products/banners/list` | Banner 列表 |
| `createOrder(data)` | `POST /api/orders` | 创建订单 |
| `getOrders(status)` | `GET /api/orders` | 订单列表 |
| `updateOrderStatus(id, status)` | `PATCH /api/orders/:id/status` | 更新订单状态 |
| `getAddresses()` | `GET /api/addresses` | 地址列表 |
| `addAddress(data)` | `POST /api/addresses` | 新增地址 |
| `editAddress(id, data)` | `PUT /api/addresses/:id` | 编辑地址 |
| `deleteAddress(id)` | `DELETE /api/addresses/:id` | 删除地址 |
| `setDefaultAddress(id)` | `PATCH /api/addresses/:id/default` | 设为默认地址 |
| `login(userInfo)` | `POST /api/users/login` | 登录 |

## 页面改动

### 首页 (`pages/index/index.js`)

**改动内容：** 四个数据加载方法全部替换为 API 调用。

| 数据 | 原实现 | 新实现 |
|------|--------|--------|
| Banner | `mock.banners` | `api.getBanners()` |
| 分类 | `mock.categories.slice(0, 5)` | `api.getCategories()` |
| 热销商品 | `mock.getHotFlowers()` | `api.getProducts({ hot: 'true' })` |
| 新品 | `mock.getNewFlowers()` | `api.getProducts({ isNew: 'true' })` |

### 分类页 (`pages/category/category.js`)

**改动内容：** 分类列表、商品列表、搜索全部改为 API 调用。

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| 加载分类 | `mock.categories` | `api.getCategories()` |
| 加载商品 | `mock.flowers` / `mock.getFlowersByCategory()` | `api.getProducts({ categoryId })` |
| 搜索 | `mock.flowers.filter(...)` | `api.getProducts({ search })` |

### 详情页 (`pages/detail/detail.js`)

**改动内容：** 商品详情从 API 获取。

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| 加载商品 | `mock.getFlowerById(id)` | `api.getProductDetail(id)` |

收藏功能保持本地存储不变（纯客户端行为）。

### 下单页 (`pages/order/order.js`)

**改动内容：** 订单提交改为 API 调用。

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| 创建订单 | 本地拼装 `order` 对象 → `app.globalData.orders` | `api.createOrder({ items, totalPrice, address, remark })` |

地址来源也由本地存储改为从 API 获取（通过 `user` 页同步到全局）。

### 订单列表页 (`pages/orders/orders.js`)

**改动内容：** 订单数据和状态操作全部改为 API 调用。

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| 加载订单 | `app.globalData.orders` | `api.getOrders(status)` |
| 取消订单 | 直接修改 `app.globalData` | `api.updateOrderStatus(id, 'cancelled')` |
| 确认收货 | 直接修改 `app.globalData` | `api.updateOrderStatus(id, 'completed')` |

### 我的页面 (`pages/user/user.js`)

**改动内容：** 收藏商品和地址管理改为 API 调用。

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| 加载收藏商品 | `mock.getFlowerById()` 逐一查找 | `api.getProducts()` 过滤匹配 |
| 加载地址列表 | `app.globalData.addresses` | `api.getAddresses()` |
| 新增地址 | 直接写入 `app.globalData` | `api.addAddress()` |
| 编辑地址 | 直接写入 `app.globalData` | `api.editAddress()` |
| 删除地址 | 直接操作 `app.globalData` | `api.deleteAddress()` |
| 设为默认 | 直接操作 `app.globalData` | `api.setDefaultAddress()` |

## 未改动的部分

### 购物车 (`pages/cart/cart.js`)

购物车是纯客户端状态，不需要与服务端同步，保持本地存储不变。

### 收藏操作

收藏的 `toggle` 行为（添加/取消）仍然是本地存储，仅在 **展示收藏列表** 时通过 API 获取商品详情。

## 启动流程

```bash
# 1. 启动后端
cd ../vibecoding-backend
npm run dev

# 2. 在微信开发者工具中打开本项目
#    - 详情 → 本地设置 → 勾选「不校验合法域名」
#    - 确认 project.config.json 中的 appid 正确
```

## 开发注意事项

1. **域名白名单：** 微信小程序生产环境需在管理后台配置 `request` 合法域名
2. **请求超时：** `wx.request` 默认超时 60s，可在 `api.js` 中通过 `timeout` 参数调整
3. **错误处理：** 每个页面的 API 调用都有 `try/catch` 包裹，避免网络异常导致页面白屏
4. **数据一致性：** 地址数据现在以服务端为准，`user` 页面加载地址后会同步到 `app.globalData.addresses` 供下单页使用
