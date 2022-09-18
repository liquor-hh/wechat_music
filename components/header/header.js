// components/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    attached() {
      console.log('该组件成功进入到某页面的节点');
    },
    detached() {
      console.log('该组件成功进入到某页面节点出来');
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

  }
})
