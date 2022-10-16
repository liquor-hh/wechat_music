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
    headerBg: '',
    pageIndex: 1,
    pageSize: 20
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  getSongList(id) {
    app.request({
      url: API.list.getSongList,
      data: {
        id
      }
    }).then(res => {
      let start = (this.data.pageIndex - 1) * this.data.pageSize
      let end = this.data.pageIndex * this.data.pageSize
      this.setData({
        bgUrl: res.playlist.coverImgUrl,
        description: res.playlist.description,
        name: res.playlist.name.slice(3),
        songList: res.playlist.tracks,
        songListGroup: res.playlist.tracks.slice(start, end)
      })
      this.canvasFn()
    })
  },
  scrollToLowerFn() {
    let pageIndex = this.data.pageIndex
    pageIndex += 1
    if(pageIndex == 6) {
      return
    }
    this.setData({
      pageIndex
    })
    let start = (this.data.pageIndex - 1) * this.data.pageSize
    let end = this.data.pageIndex * this.data.pageSize
    let data = this.data.songList.slice(start, end)
    this.setData({
      songListGroup: this.data.songListGroup.concat(data)
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
    return {
      title: '分享标题',
      imageUrl: '/static/home.png'
    }
  }
})