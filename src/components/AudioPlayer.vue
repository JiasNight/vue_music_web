<template>
  <div class="audio-contaient" v-show="isShowAudio">
    <div class="audio-box">
      <div class="audio-avatar">
        <img :src="musicInfo.img" :alt="musicInfo.name" :class="imgClass">
      </div>
      <span class="audio-time">{{currentTime}}</span>
      <!-- <el-slider class="audio-slider" v-model="percentage_value"></el-slider> -->
      <el-slider class="audio-slider" v-model="percentage_value" @change="onProgressBarChange(percentage_value)" :show-tooltip="showTooltip"></el-slider>
      <span class="audio-allTime">{{totalTime}}</span>
      <el-button class="audio-prev" icon="iconfont icon-previous" @click="musicPrev" size="mini" circle></el-button>
      <el-button class="audio-stop" :icon="isPlayIcon" @click.native="musicPlayOrStop" size="medium" circle autofocus></el-button>
      <el-button class="audio-next" icon="iconfont icon-next" @click="musicNext" size="mini" circle></el-button>
      <el-button class="audio-list" :icon="isMusicListsIcon" @click="isMusicLists" size="mini" circle></el-button>
      <el-button class="audio-loop" :icon="isModeListIcon" @click="changeMusicMode" size="mini" circle></el-button>
      <el-button class="audio-volume" :icon="volumeIcon" size="mini" circle></el-button>
      <el-slider class="audio-volume-slider" v-model="volume" @change="volumeChange"></el-slider>
      <div class="audio-listInfos" v-show="musicListShow">
        <div class="infos-list">
          <table>
            <th>播放列表<i :class="isModeListIcon"></i></th>
            <tr v-for="(item, index) in musicLists" :key="index"><span @click="changeMusicPlay(item.id)">{{ item.name }}</span></tr>
          </table>
        </div>
      </div>
    </div>
    <span :class="audioLyric">{{musicInfo.name}}</span>
    <audio @canplay="getDuration" @timeupdate="updateTime"  @error="error" @ended="end" :src="musicInfo.src" ref="audio"></audio>
  </div>
</template>

<script>
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
      percentage_value: 0,
      currentTime: '00:00', // 当前播放时间
      totalTime: '00:00', // 总播放时间
      volume: 25, // 音量进度
      volumeIcon: 'iconfont icon-yinliang',
      musicInfo: {
        // id: 1,
        // name: '绅士',
        // author: '薛之谦',
        // type: '流行',
        // sheet: '又是那一年',
        // img: require('../assets/images/s3.png'),
        // src: require('../assets/audio/薛之谦 - 绅士.mp3'),
        // lyric: ''
      },
      musicLists: [
        {
          id: 1,
          name: '绅士',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 2,
          name: '你还要我怎样',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 你还要我怎样.mp3'),
          lyric: ''
        },
        {
          id: 3,
          name: '薛之谦-演员',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 演员.mp3'),
          lyric: ''
        },
        {
          id: 4,
          name: '薛之谦-刚刚',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 5,
          name: '薛之谦-其实',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 6,
          name: '薛之谦-好像在哪见过你',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 7,
          name: '薛之谦-丑八怪',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 8,
          name: '賭神',
          author: '賭神',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/賭神 - 卢冠廷.mp3'),
          lyric: ''
        }
      ]
    }
  },
  mounted () {
    // 初始化加载音乐到音乐列表中
    this.initMusicLists()
  },
  methods: {
    error () {
      this.audioReady = true
      console.log('发生错误')
    },
    end () {
      if (this.playMode === 1) {
        console.log('顺序播放')
        console.log(this.musicInfo.currentIndex)
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
      // let time = this.$refs.audio.duration
      // let minute = Math.floor(time / 60)
      // if (minute < 9 && minute > 0) {
      //   minute = '0' + minute
      // }
      // let second = Math.round(time % 60)
      // this.totalTime = minute + ':' + second
      // this.audioReady = true
      // 歌曲全部时长
      this.totalTime = this.TimeFormat(this.$refs.audio.duration)
    },
    updateTime (e) {
      // 当前时间
      this.currentTime = this.TimeFormat(e.target.currentTime)
      // let time = Math.round(e.target.currentTime)
      // this.percentage_value = Math.round((time / this.$refs.audio.duration) * 100)
      // if (time <= 9 && time >= 0) {
      //   this.currentTime = '00:0' + time
      // } else if (time > 9 && time < 60) {
      //   this.currentTime = '00:' + time
      // } else if (time === 60) {
      //   this.currentTime = '01:00'
      // } else if (time > 60 && time < 70) {
      //   this.currentTime = '01:0' + Math.round(time % 60)
      // } else {
      //   let minute = Math.floor(time / 60)
      //   if (minute < 9 && minute > 0) {
      //     minute = '0' + minute
      //   }
      //   let second = Math.round(time % 60)
      //   if (second <= 9 && second >= 0) {
      //     second = '0' + second
      //   }
      //   this.currentTime = minute + ':' + second
      // }
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
      this.musicLists.forEach(item => {
        if (id === item.id) {
          this.musicInfo = item
        }
        setTimeout(this.onPlay(), 500)
      })
    },
    // 初始化加载音乐信息
    initMusicLists () {
      this.musicInfo = this.musicLists[0]
    },
    // 上一曲
    musicPrev () {
      let info = this.musicInfo
      let array = this.musicLists
      let arrLen = this.musicLists.length
      let currentIndex = null
      array.forEach(function (item, index) {
        if (info.id === item.id) {
          currentIndex = index
        }
      })
      currentIndex = currentIndex === 0 ? (arrLen - 1) : currentIndex - 1
      info = array[currentIndex]
      this.musicInfo = info
      this.onPlay()
    },
    // 下一曲
    musicNext () {
      let info = this.musicInfo
      let array = this.musicLists
      let arrLen = this.musicLists.length
      let currentIndex = null
      array.forEach(function (item, index) {
        if (info.id === item.id) {
          currentIndex = index
        }
      })
      currentIndex = currentIndex === (arrLen - 1) ? (currentIndex = 0) : currentIndex + 1
      info = array[currentIndex]
      this.musicInfo = info
      this.onPlay()
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
      } else if (this.playMode === 2) {
        this.isModeListIcon = 'iconfont icon-suiji'
      } else if (this.playMode === 3) {
        this.isModeListIcon = 'iconfont icon-danquxunhuan'
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
    musicInfo (newSong, oldSong) {
      if (newSong.id !== oldSong.id) {
        this.$nextTick(() => {
          // this.$refs.audio.play()
        })
      }
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
  width: 150px;
  height: 180px;
  background-color: rgba(41, 42, 45, 0.85);
  position: absolute;
  bottom: 60px;
  right: 40px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /*兼容火狐*/
  -ms-overflow-style: none; /*兼容IE*/
  border-radius: 5px;
  display: inline-block;
}

/* 滑块隐藏，兼容chrome和safari */
  .audio-listInfos::-webkit-scrollbar{
    display: none;
  }

.infos-list{
  width: 100%;
  height: 100%;
}

.infos-list table{
  width: 100%;
  height: 100%;
  table-layout:fixed;
  border-collapse:collapse;
}

.infos-list table th{
  font-size: 15px;
  font-weight: inherit;
  text-align: center;
}

.infos-list table tr{
  height: 25px;
  width: 100%;
  cursor: pointer;
}

.infos-list table tr:nth-child(even){
  background:rgba(41, 42, 45, 0.3)
}

.infos-list table tr:nth-child(odd){
  background:rgba(0.14, 0.15, 0.16, 0.2)
}

.infos-list table tr:hover{
  background-color: rgba(119, 116, 116, 0.3);
}

.infos-list table tr span{
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
.infos-list table tr span:hover{
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
    -webkit-transform: translateX(10px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

@-webkit-keyframes songNameMove {
  0%{
    -webkit-transform: translateX(10px);
  }
  100%{
    -webkit-transform: translateX(-80px);
  }
}

@-moz-keyframes songNameMove {
  0%{
    -webkit-transform: translateX(10px);
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
