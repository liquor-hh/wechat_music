// pages/search/search.js
import API from '../../requestFn/api'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchType: 1,
    historyList: wx.getStorageSync('historyList') || [],
    hotList: ['林俊杰','林俊杰','林俊杰'],
    searchWord: '',
    searchSuggest: [],
    searhResult: []
  },
  getSearchList() {
    let searchWord = this.data.searchWord
    let historyList = this.data.historyList
    historyList.unshift(searchWord)
    searchWord && wx.setStorageSync('historyList', historyList)
    this.setData({
      historyList
    })
    this.getResultCb(searchWord)
  },
  delHistory() {
    wx.clearStorageSync('historyList')
    this.setData({
      historyList: []
    })
  },
  getHotList() {
    app.request({
      url: API.search.searchHot
    }).then(res => {
      this.setData({
        hotList: res.data
      })
    })
  },
  inputFn(e) {
    let keyWord = e.detail.value
    app.request({
      url: API.search.searchSuggest,
      data: {
        keywords: keyWord,
        type: 'mobile'
      }
    }).then(res => {
      this.setData({
        searchSuggest: res.result.allMatch,
        searchType: 2
      })
    })
  },
  getResultFn(e){
    let keyword = e.currentTarget.dataset.searchword
    this.setData({
      searchWord: keyword
    })
    this.getResultCb(keyword)
  },
  clearInput() {
    this.setData({
      searchWord: '',
      searchType: 1
    })
  },
  getResultCb(words) {
    app.request({
      url: API.search.searchWord,
      data: {
        keywords: words
      }
    }).then(res => {
      this.setData({
        searchResult: res.result.songs,
        searchType: 3
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHotList()
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