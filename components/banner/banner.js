Component({
  properties: {
    banners: {
      type: Array,
      value: []
    }
  },
  data: {
    current: 0
  },
  methods: {
    onSwiperChange(e) {
      this.setData({ current: e.detail.current })
    },
    onBannerTap(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('bannerTap', { id })
    }
  }
})
