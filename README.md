# 🌸 花恋 — 二次元花店

> 花で紡ぐ、あなたの物語 — 用花编织你的故事

**花恋**是一个以二次元/日系风格为主题的线上花店项目，包含微信小程序前端、Node.js 后端服务、Web 管理后台三个子系统。

## 项目全景

```
hualian/                          # 🌸 主仓库 — 微信小程序前端
├── pages/                        # 7 个页面
│   ├── index/                    # 首页（Banner、分类、热销、新品）
│   ├── category/                 # 分类浏览 & 搜索
│   ├── detail/                   # 商品详情 & 收藏
│   ├── cart/                     # 购物车
│   ├── order/                    # 下单
│   ├── orders/                   # 订单列表
│   └── user/                     # 个人中心 & 地址管理
├── components/                   # 自定义组件
│   ├── banner/                   # 轮播图组件
│   └── product-card/             # 商品卡片组件
├── utils/
│   ├── api.js                    # API 封装（wx.request 统一处理）
│   └── config.js                 # 后端地址 & API Key 配置
├── mock/                         # 本地 Mock 数据（已废弃）
├── app.js                        # 小程序入口（全局数据）
├── app.json                      # 全局配置（页面、TabBar、主题色）
├── app.wxss                      # 全局样式（粉色主题）
└── FRONTEND_ADAPTATION.md        # 前端适配文档

hualian-backend/                  # 🖥️ 后端服务 — Node.js + Express + MySQL
hualian-admin/                    # 📊 管理后台 — Web 面板
```

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| **前端** | 微信小程序原生框架 | 移动端花店应用 |
| **后端** | Node.js + Express | RESTful API 服务 |
| **数据库** | MySQL 8.0 | 数据持久化 |
| **管理后台** | 原生 HTML/CSS/JS | Web 管理面板 |

## 功能特性

### 小程序端（消费者）

| 模块 | 功能 |
|------|------|
| 🏠 首页 | Banner 轮播、分类快捷入口、热销推荐、新品上市 |
| 🔍 分类 | 按类别筛选、关键词搜索 |
| 🌷 详情 | 图片轮播、商品信息、收藏、数量选择、加入购物车 |
| 🛒 购物车 | 选择/全选、数量调整、移除、合计、结算 |
| 📋 下单 | 地址选择、备注、提交订单 |
| 📦 订单 | 按状态筛选、取消订单、确认收货 |
| 👤 我的 | 登录、订单统计、收藏夹、地址 CRUD |

### 管理后台（商家）

| 模块 | 功能 |
|------|------|
| 📊 仪表盘 | 订单/商品统计、最新订单列表 |
| 📋 订单管理 | 按状态筛选、发货、取消、确认完成、查看详情 |
| 🌷 商品管理 | 新增/编辑/删除商品（名称、价格、分类、图片、标签等） |
| 📍 地址管理 | 新增/编辑/删除地址、设为默认 |

## 快速开始

### 1. 克隆项目

```bash
# 主仓库（小程序）
git clone https://github.com/rorimania/hualian.git

# 后端
git clone https://github.com/rorimania/hualian-backend.git

# 管理后台
git clone https://github.com/rorimania/hualian-admin.git
```

最终目录结构：

```
your-project/
├── hualian/              # 小程序
├── hualian-backend/      # 后端
└── hualian-admin/        # 管理后台
```

### 2. 配置数据库

确保 MySQL 8.0 服务已运行：

```bash
# 检查 MySQL 服务状态
sc query MySQL80

# 如果未运行，启动服务
net start MySQL80
```

创建数据库：

```bash
"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysql.exe" -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS hanakotoba DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit
```

数据库默认连接配置（在 `hualian-backend/.env` 中）：

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=114514
DB_NAME=hanakotoba
```

> 首次启动后端时，会自动创建表结构并导入种子数据（12 个商品、6 个分类、3 个 Banner 以及管理员账号）。

### 3. 启动后端

```bash
cd hualian-backend
npm install
npm run dev
# → http://localhost:3000
```

要求：MySQL 8.0 已运行，在 `.env` 中配置数据库连接。

### 4. 打开管理后台

浏览器访问 `http://localhost:3000/`

默认账号：`rorimania` / `114514`

### 5. 运行小程序

用微信开发者工具打开 `hualian/` 目录，在「详情」→「本地设置」中勾选 **不校验合法域名**。

## 设计主题

- **主色**：`#FF8FAB`（粉红）
- **辅助色**：`#C9B1FF`（淡紫）
- **背景**：`#FFF8F5`（暖白）
- **文字**：`#4A3F5C`（深紫灰）
- **风格**：日系二次元，柔和渐变，圆角卡片，毛玻璃效果

## 安全

- Bearer Token 保护管理后台 API（24h 过期）
- X-API-Key 保护小程序端请求
- Helmet 安全 HTTP 头
- 请求限流（200 次/15 分钟）
- 输入参数校验（express-validator）
- 密码加盐哈希存储（SHA-256）
- `.env` 管理敏感配置，已加入 `.gitignore`

## 关联仓库

| 仓库 | 地址 |
|------|------|
| 🖥️ 后端服务 | [github.com/rorimania/hualian-backend](https://github.com/rorimania/hualian-backend) |
| 📊 管理后台 | [github.com/rorimania/hualian-admin](https://github.com/rorimania/hualian-admin) |

## 许可

MIT License
