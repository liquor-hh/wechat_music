// pages/songList/songList.js
const app = getApp()
const API = require("../../requestFn/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgUrl: '',
    description: '',
    name: '',
    songList: [],
    headerBg: ''
  },
  getSongList(id) {
    app.request({
      url: API.list.getSongList,
      data: {
        id
      }
    }).then(res => {
      this.setData({
        bgUrl: res.playlist.coverImgUrl,
        description: res.playlist.description,
        name: res.playlist.name.slice(3),
        songList: res.playlist.tracks
      })
      this.canvasFn()
    })
  },
  canvasFn() {
    let that = this
    // 获取 canvans 节点
    let query = wx.createSelectorQuery()
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec(res => {
        let canvas = res[0].node
        let ctx = canvas.getContext('2d')
        // 由于 bgUrl 是网络图片，需要先使用 getImageInfo 来解析
        wx.getImageInfo({
          src: this.data.bgUrl,
          success(res) {
            let createImg = canvas.createImage()
            createImg.src = res.path
            createImg.onload = (e) => {
              ctx.drawImage(createImg, 0, 0, res.width, res.height, 0, 0, res.width, res.height)
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375,
                height: 75,
                canvas: canvas,
                success(res) {
                  that.setData({
                    headerBg: res.tempFilePath
                  })
                  // 获取到了一个图片路径，那么 canvas 就没用了，需要删除画布中的内容
                  ctx.clearRect(0, 0, 750, 750)
                }
              })
            }
          }
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSongList(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})