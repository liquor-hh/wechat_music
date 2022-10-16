const API = {
  home: {
    getTopListDetail: '/topList/detail'
  },
  list: {
    getSongList: '/top/list'
  },
  search: {
    searchHot: '/search/hot/detail',
    searchWord: '/search',
    searchSuggest: '/search/suggest'
  },
  detail: {
    songDetail: '/song/detail',
    songLyric: '/lyric',
    songSimi: '/simi/song',
    songComment: '/comment/music',
    songUrl: '/song/url'
  }
}
module.exports = API