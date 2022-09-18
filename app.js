// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  // 加载完成，执行一次
  onLoad() {

  },
  // 页面显示完成
  onShow() {},
  // 页面隐藏，页面仍然在栈内(navigateTo)
  onHide() {},
  // 页面卸载，页面出栈时触发(redirectTo)
  onUnload() {},
  /**
    * @params {url} 请求地址
    * @params {method} 请求方式
   */
  request(opt) {
    return new Promise((resolve, reject) => {
      let token = ""
      wx.request({
        // 一个完整的接口请求路径：域名+端口号
        url: this.globalData.baseURL + opt.url,
        methods: opt.method || 'GET',
        data: opt.data || {},
        timeout: 10000,
        header: {
          'authorization': token
        },
        success(res) {
          // 成功
          if(res.data.code === 200) {

          } else if(res.data.code === 401) {
            // token 过期或失效
            // 刷新token
          } else {
            console.log(res);
            // 其他异常情况（成功的），将后台返回的提示信息告诉用户
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
          resolve(res.data)
        },
        fail(res) {
          // 接口请求失败
          reject(res.data)
        }
      })
    })
  },
  // 每一个请求地址都包括域名，所以域名可以存放到公共变量中
  globalData: {
    userInfo: null,
    baseURL: 'http://localhost:3000'
  }
})
