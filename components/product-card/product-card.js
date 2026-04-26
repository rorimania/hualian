Component({
  properties: {
    flower: {
      type: Object,
      value: {}
    },
    small: {
      type: Boolean,
      value: false
    }
  },
  data: {
    loaded: false,
    discountPercent: 0,
    salesText: '0'
  },
  observers: {
    'flower'(flower) {
      if (flower && flower.price && flower.originalPrice && flower.originalPrice > flower.price) {
        const percent = Math.round((1 - flower.price / flower.originalPrice) * 100)
        this.setData({ discountPercent: percent })
      }
      if (flower && flower.sales) {
        const salesText = flower.sales > 999
          ? (flower.sales / 1000).toFixed(1) + 'k'
          : String(flower.sales)
        this.setData({ salesText })
      }
    }
  },
  methods: {
    onImageLoad() {
      this.setData({ loaded: true })
    },
    onTap() {
      const { id } = this.properties.flower
      if (id) {
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      }
    }
  }
})
