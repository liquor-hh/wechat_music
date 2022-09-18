// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    username: {
      type: String,
      value: "张三"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods: {
    sendMsg() {
      this.triggerEvent('getMsg', 20)
    }
  }
  /**
   * 组件的方法列表
   */
})
