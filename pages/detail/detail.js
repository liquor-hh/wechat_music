// pages/detail/detail.js
import API from '../../requestFn/api'
const app = getApp()
var timer = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songTitle: "",
    songBgUrl: "",
    songSimi: [],
    songComment: [],
    lyricResult: [],
    lyricIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    Promise.all([
      this.getSongDetail(id),
      this.getSongSimi(id),
      this.getSongComment(id),
      this.getSongLyric(id),
      this.getSongUrl(id)
    ])
      .then(res => {
        // 歌曲详情
        if(res[0].code == 200) {
          this.setData({
            songTitle: res[0].songs[0].al.name,
            songBgUrl: res[0].songs[0].al.picUrl
          })
        }
        // 相似歌曲
        if(res[1].code == 200) {
          this.setData({
            songSimi: res[1].songs
          })
        }
        // 歌曲评论
        if(res[2].code == 200) {
          this.setData({
            songComment: res[2].comments
          })
        }
        // 歌词与歌词播放到的时间
        if(res[3].code == 200) {
          let lyric = res[3].lrc.lyric
          let lyricArr = lyric.split(/\n/)
          let result = []
          lyricArr.forEach(item => {
            let lyricItem = item.split(']')[1]
            let lyricTime = item.split(']')[0].slice(1)
            lyricTime = Number(lyricTime.split(':')[0] * 60 + Number(lyricTime.split(':')[1]).toFixed(1)) 
            if(lyricItem) {
              result.push({
                lyricItem,
                lyricTime
              })
            }
          })
          this.setData({
            lyricResult: result
          })
        }
        // 歌曲url
        if(res[4].code == 200) {
          let url = res[4].data[0].url
          let bgAudio = wx.getBackgroundAudioManager()
          this.setData({
            bgAudio
          })
          bgAudio.src = url
          bgAudio.title = res[0].songs[0].al.name
          bgAudio.onPlay(() => {
            this.setData({
              iconName: 'pause-circle-o',
              musicPlay: true
            })
            this.lyricPlay()
          })
          bgAudio.onPause(() => {
            this.setData({
              iconName: 'play-circle-o',
              musicPlay: false
            })
          })
        }
    })
  },
  getSongDetail(ids) {
    return app.request({
      url: API.detail.songDetail,
      data: {
        ids
      }
    })
  },
  getSongSimi(id) {
    return app.request({
      url: API.detail.songSimi,
      data: {
        id
      }
    })
  },
  getSongComment(id) {
    return app.request({
      url: API.detail.songComment,
      data: {
        id
      }
    })
  },
  getSongLyric(id) {
    return app.request({
      url: API.detail.songLyric,
      data: {
        id
      }
    })
  },
  getSongUrl(id) {
    return app.request({
      url: API.detail.songUrl,
      data: {
        id
      }
    })
  },
  lyricPlay() {
    timer && clearInterval(timer)
    timer = setInterval(() => {
      for (let i = 0; i < this.data.lyricResult.length; i++) {
        let lyricResult = this.data.lyricResult
        let currentPlayTime = this.data.bgAudio.currentTime
        if(currentPlayTime < lyricResult[i + 1].lyricTime && currentPlayTime >= lyricResult[i].lyricTime) {
          this.setData({
            lyricIndex: i
          })
          break
        }
      }
    }, 300);
  },
  controlMusicPlay() {
    if(this.data.bgAudio.paused) {
      this.data.bgAudio.play()
    } else {
      this.data.bgAudio.pause()
    }
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