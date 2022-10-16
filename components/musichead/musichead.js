// components/musichead/musichead.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconShow: {
      type: Boolean,
      value: false
    },
    iconBlack: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    headerBg: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack(){
      wx.navigateBack({
        delta: 1,
      })
    },
    goHome(){
      wx.redirectTo({
        url: '/pages/home/home'
      })
    }
  }
})
