<template>
  <div class="audio-contaient" v-show="isShowAudio">
    <div class="audio-box">
      <div class="audio-avatar">
        <img :src="musicInfo.img" :alt="musicInfo.name" :class="imgClass">
      </div>
      <!-- 歌曲当前时间 -->
      <span class="audio-time">{{currentTime}}</span>
      <!-- 歌曲进度条 -->
      <el-slider class="audio-slider" v-model="percentage_value" @change="onProgressBarChange(percentage_value)" :show-tooltip="showTooltip"></el-slider>
      <!-- 歌曲总时间 -->
      <span class="audio-allTime">{{totalTime}}</span>
      <!-- 上一曲按钮 -->
      <el-button class="audio-prev" icon="iconfont icon-previous" @click="musicPrev" size="mini" circle></el-button>
      <!-- 播放暂停按钮 -->
      <el-button class="audio-stop" :icon="isPlayIcon" @click.native="musicPlayOrStop" size="medium" circle autofocus></el-button>
      <!-- 下一曲按钮 -->
      <el-button class="audio-next" icon="iconfont icon-next" @click="musicNext" size="mini" circle></el-button>
      <!-- 播放列表按钮 -->
      <el-button class="audio-list" :icon="isMusicListsIcon" @click="isMusicLists" size="mini" circle></el-button>
      <!-- 改变播放模式按钮 -->
      <el-tooltip effect="dark" :content="playModeString" placement="top-start" transition="el-fade-in-linear">
        <el-button class="audio-loop" :icon="isModeListIcon" @click="changeMusicMode" size="mini" circle></el-button>
      </el-tooltip>
      <!-- 音量按钮 -->
      <el-button class="audio-volume" :icon="volumeIcon" size="mini" circle></el-button>
      <!-- 音量滑块 -->
      <el-slider class="audio-volume-slider" v-model="volume" @change="volumeChange"></el-slider>
      <div class="audio-listInfos" v-show="musicListShow">
        <!-- <h4>播放列表<i :class="isModeListIcon"></i></h4> -->
        <!-- <div class="infos-list"> -->
        <table>
          <thead>
            <th>播放列表<i :class="isModeListIcon"></i></th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in musicLists" :key="index"><span @click="changeMusicPlay(item.id)">{{ item.name }}</span></tr>
          </tbody>
        </table>
        <!-- </div> -->
      </div>
    </div>
    <span :class="audioLyric">{{musicInfo.name}}</span>
    <audio @canplay="getDuration" @timeupdate="updateTime"  @error="error" @ended="end" :src="musicInfo.src" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      playing: false,
      musicListShow: false,
      showTooltip: false,
      tableHeader: false,
      audioReady: false,
      isShowAudio: true,
      imgClass: '',
      audioLyric: 'audio-lyric',
      isPlayIcon: 'iconfont icon-play',
      isMusicListsIcon: 'iconfont icon-liebiao',
      isModeListIcon: 'iconfont icon-liebiaoshunxu',
      playMode: 1, // 播放状态，默认为1顺序播放，2为随机播放，3为单曲循环
      playModeString: '顺序播放',
      currentIndex: null,
      percentage_value: 0,
      currentTime: '00:00', // 当前播放时间
      totalTime: '00:00', // 总播放时间
      volume: 10, // 音量进度
      volumeIcon: 'iconfont icon-yinliang'
      // musicInfo: {},
      // musicLists: []
    }
  },
  computed: {
    ...mapGetters([
      'musicInfo',
      'musicLists'
    ])
  },
  mounted () {
    // 初始化加载音乐到音乐列表中
    this.initMusicLists()
  },
  methods: {
    // ...mapActions([
    //   'initMusicLists'
    // ]),
    // 初始化加载音乐信息
    initMusicLists () {
      this.$axios.get('testMusic.json').then(res => {
        this.$store.dispatch('addMusicLists', res.data)
        // console.log('执行了')
        // return res.data
      }).catch(error => {
        console.log('获取音乐列表错误！' + error)
        return error
      })
    },
    error () {
      this.audioReady = true
      console.log('发生错误')
    },
    end () {
      if (this.playMode === 1) {
        console.log('顺序播放')
        // console.log(this.currentIndex)
      } else if (this.playMode === 2) {
        console.log('随机播放')
      } else if (this.playMode === 0) {
        console.log('单曲循环')
        this.audioLoop()
      }
    },
    // 循环播放函数loop
    audioLoop () {
      this.$refs.audio.currentTime = 0
      setTimeout(this.onPlay(), 2000)
    },
    getDuration () {
      // 歌曲全部时长
      this.totalTime = this.TimeFormat(this.$refs.audio.duration)
    },
    updateTime (e) {
      // 当前时间
      this.currentTime = this.TimeFormat(e.target.currentTime)
    },
    // 用于将时间戳转换成所需时间格式
    TimeFormat (timeStamp) {
      timeStamp = timeStamp | 0 // |0 向下取整
      let minute = (timeStamp / 60) | 0 // 取余得到分钟
      let second = timeStamp % 60 // 取余得秒
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    // 播放
    onPlay () {
      this.$refs.audio.volume = this.volume / 100
      this.imgClass = 'avatar-img'
      this.isPlayIcon = 'iconfont icon-pause'
      this.playing = true
      this.$refs.audio.play()
      this.audioLyric = 'audio-lyric audio-lyric-move'
      this.isShowAudio = true
    },
    // 暂停
    onPause () {
      this.$refs.audio.pause()
      this.imgClass = ''
      this.isPlayIcon = 'iconfont icon-play'
      this.playing = false
      this.audioLyric = 'audio-lyric'
    },
    // 暂停与播放
    musicPlayOrStop () {
      if (this.playing) { // 播放中,点击则为暂停
        this.onPause()
      } else { // 暂停中,点击则为播放
        this.onPlay()
      }
    },
    // 列表改变歌曲播放
    changeMusicPlay (id) {
      let info = this.$store.state.currentMusicInfo
      let musicList = this.$store.state.currentMusicLists
      musicList.forEach(item => {
        if (id === item.id) {
          info = item
          this.$store.commit('setMusicInfo', info)
        }
        setTimeout(this.onPlay(), 500)
      })
    },
    // 上一曲
    musicPrev () {
      let info = this.$store.state.currentMusicInfo
      let array = this.$store.state.currentMusicLists
      let arrLen = this.$store.state.currentMusicLists.length
      let currentIndex = null
      if (this.playMode === 1) {
        array.forEach(function (item, index) {
          if (info.id === item.id) {
            currentIndex = index
          }
        })
        currentIndex = currentIndex === 0 ? (arrLen - 1) : currentIndex - 1
        info = array[currentIndex]
        this.$store.commit('setMusicInfo', info)
      } else if (this.playMode === 2) {
        // 随机播放上一曲
        currentIndex = Math.round(Math.random() * (arrLen - 1))
        info = array[currentIndex]
        this.$store.commit('setMusicInfo', info)
      }
    },
    // 下一曲
    musicNext () {
      let info = this.$store.state.currentMusicInfo
      let array = this.$store.state.currentMusicLists
      let arrLen = this.$store.state.currentMusicLists.length
      let currentIndex = null
      if (this.playMode === 1) {
        array.forEach(function (item, index) {
          if (info.id === item.id) {
            currentIndex = index
          }
        })
        currentIndex = currentIndex === (arrLen - 1) ? (currentIndex = 0) : currentIndex + 1
        info = array[currentIndex]
        this.$store.commit('setMusicInfo', info)
      } else if (this.playMode === 2) {
        // 随机播放下一曲
        currentIndex = Math.round(Math.random() * (arrLen - 1))
        info = array[currentIndex]
        this.$store.commit('setMusicInfo', info)
      }
    },
    // 是否显示播放列表按钮点击事件
    isMusicLists () {
      if (this.musicListShow) {
        this.musicListShow = false
        this.isMusicListsIcon = 'iconfont icon-liebiao'
      } else {
        this.musicListShow = true
        this.isMusicListsIcon = 'iconfont icon-liebiaolist46'
      }
    },
    // 改变播放顺序按钮点击事件
    changeMusicMode () {
      this.playMode += 1
      if (this.playMode === 1) {
        this.isModeListIcon = 'iconfont icon-liebiaoshunxu'
        this.playModeString = '顺序播放'
      } else if (this.playMode === 2) {
        this.isModeListIcon = 'iconfont icon-suiji'
        this.playModeString = '随机播放'
      } else if (this.playMode === 3) {
        this.isModeListIcon = 'iconfont icon-danquxunhuan'
        this.playModeString = '单曲循环'
        this.playMode = 0
      }
    },
    // 显示音量横线
    ShowVolume () {
      if (this.showVolume) {
        this.showVolume = false
      } else {
        this.showVolume = true
      }
    },
    noShowVolume () {
      setTimeout(() => {
        this.showVolume = false
      }, 10000)
    },
    // 音量改变
    volumeChange () {
      if (this.volume === 0) {
        this.volumeIcon = 'iconfont icon-jingyin'
        this.$refs.audio.volume = 0
      } else {
        this.volumeIcon = 'iconfont icon-yinliang'
        this.$refs.audio.volume = (this.volume / 100)
      }
    },
    // 改变进度条播放
    onProgressBarChange (percent) {
      percent = this.percentage_value
      this.$refs.audio.currentTime = this.$refs.audio.duration * (percent / 100) // 拖拽占比
      if (!this.playing) {
        // 非播放状态，拖拽后播放，改变播放状态
        this.onPlay()
      }
    }
  },
  watch: {
    musicInfo (newSong) {
      // console.log(newSong.id)
      // let oldSong = this.$store.state.currentMusicInfo
      // if (newSong.id !== oldSong.id) {
      //   console.log('改变了')
      //   setTimeout(this.onPlay(), 500)
      // }
    }
  }
}
</script>

<style scoped>
.audio-contaient{
  width: 80%;
  height: 62px;
  background-color: rgba(41, 42, 45, 0.8);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 50px;
  z-index: 10;
}

.audio-box{
  width: 90%;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 80px 60px auto 45px 45px 45px 45px 45px 45px 45px 60px;
  grid-template-areas: 'avatar getTime slider allTime prev stop next list loop btnVolume volume';
}

.audio-avatar,.audio-time,.audio-slider,.audio-allTime,.audio-prev,.audio-stop,.audio-next,.audio-list,.audio-loop,.audio-volume{
  align-self: center;
  justify-self: center;
}

.audio-avatar{
  width: 50px;
  height: 50px;
  grid-area: avatar;
}

.audio-avatar img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.avatar-img{
  animation: audio-rotating 6s linear infinite;
}

.audio-time{
  grid-area: getTime;
}

.audio-slider{
  width: 100%;
  grid-area: slider;
}

.audio-allTime{
  grid-area: allTime;
}

.audio-prev{
  grid-area: prev;
}
.audio-stop{
  grid-area: stop;
}

.audio-next{
  grid-area: next;
}

.audio-list{
  grid-area: list;
}

.audio-loop{
  grid-area: loop;
}

.audio-volume{
  grid-area: btnVolume;
}

.audio-lyric{
  position: absolute;
  left: 30%;
  top: 2px;
}

/* 歌词横幅移动 */
.audio-lyric-move{
  color: aliceblue;
  animation: lyricMove 5s infinite linear;
}

.audio-listInfos{
  width: 140px;
  height: 180px;
  background-color: rgba(41, 42, 45, 0.85);
  position: absolute;
  bottom: 60px;
  right: 40px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;/* 兼容火狐*/
  -ms-overflow-style: none;/* 兼容IE*/
  border-radius: 5px;
  display: inline-block;
}

/* 滑块隐藏，兼容chrome和safari */
.audio-listInfos::-webkit-scrollbar{
  display: none;
}

/* .infos-list{
  width: 100%;
  height: 100%;
} */

.audio-listInfos table{
  width: 100%;
  height: 180px;
}

.audio-listInfos table thead{
  table-layout:fixed;
}

.audio-listInfos table thead th{
  font-size: 15px;
  font-weight: inherit;
  text-align: center;
}

.audio-listInfos table tbody{
  width: 100%;
  max-height: 50px;
}

.audio-listInfos table tbody tr{
  height: 25px;
  width: 100%;
  cursor: pointer;
}

.audio-listInfos table tbody tr:nth-child(even){
  background:rgba(41, 42, 45, 0.3)
}

.audio-listInfos table tbody tr:nth-child(odd){
  background:rgba(0.14, 0.15, 0.16, 0.2)
}

.audio-listInfos table tbody tr:hover{
  background-color: rgba(119, 116, 116, 0.3);
}

.audio-listInfos table tbody tr span{
  width: 86%;
  height: 100%;
  display: inline-block;
  position: absolute;
  left: 10px;
  color: rgba(161, 158, 158, 0.7);
  text-overflow:ellipsis;
  white-space:nowrap;
}

/* 播放列表歌曲横幅移动 */
.audio-listInfos table tbody tr span:hover{
  color: aliceblue;
  animation: songNameMove 5s infinite linear;
}

.audio-volume-slider{
  grid-area: volume;
  width: 100%;
  align-self: center;
  justify-self: end;
}

.audio-volume-slider >>> .el-slider__button{
  width: 6px;
  height: 6px;
  border: 0px solid;
}

.audio-slider >>> .el-slider__button{
  width: 8px;
  height: 8px;
  border: 0px solid;
}

/* 歌词信息移动 */
@keyframes lyricMove{
  0%{
    -webkit-transform: translateX(50px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

/* 播放列表移动 */
@keyframes songNameMove {
  0%{
    -webkit-transform: translateX(80px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

@-webkit-keyframes songNameMove {
  0%{
    -webkit-transform: translateX(80px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

@-moz-keyframes songNameMove {
  0%{
    -webkit-transform: translateX(80px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

@keyframes audio-rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
 }
@-webkit-keyframes audio-rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
 }
@-moz-keyframes audio-rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
 }
</style>
