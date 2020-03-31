import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

Vue.prototype.$axios = axios

const store = new Vuex.Store({
  // vuex数据源,保存的数据存储在这里，在页面通过this.$store.state.count获取count
  state: {
    currentMusicInfo: {
      // id: 1,
      // name: '绅士就是我',
      // author: '薛之谦',
      // type: '流行',
      // sheet: '又是那一年',
      // img: require('../assets/images/s3.png'),
      // src: require('../assets/audio/薛之谦 - 绅士.mp3'),
      // lyric: ''
    },
    currentMusicLists: [
      // id: 1,
      // name: '绅士就是我',
      // author: '薛之谦',
      // type: '流行',
      // sheet: '又是那一年',
      // img: require('../assets/images/s3.png'),
      // src: require('../assets/audio/薛之谦 - 绅士.mp3'),
      // lyric: ''
    ]
  },
  getters: {
    musicInfo (state) {
      return state.currentMusicInfo
    },
    musicLists (state) {
      return state.currentMusicLists
    }
  },
  mutations: {
    setMusicLists: (state, lists) => {
      state.currentMusicLists = lists
      state.currentMusicInfo = state.currentMusicLists[0]
    },
    setMusicInfo: (state, info) => {
      state.currentMusicInfo = info
    }
  },
  actions: {
    addMusicLists: (context, lists) => {
      context.commit('setMusicLists', lists.data)
    }
  }
})
// 导出store
export default store
