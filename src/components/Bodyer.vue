<template>
    <div class="music_centre">
      <div class="left_music">

        <!-- 热门音乐 -->
        <div class="first_floor">
          <i class="el-icon-heavy-rain music_tip">热门音乐<i class="el-icon-bottom"></i></i>
          <router-link to="/topmusic" class="more_font">more<i class="el-icon-d-arrow-right music_tip"></i></router-link>
          <hr>
          <div class="hot">
            <div class="hot_music">
              <li v-for="(item, index) in musicLists" :key="index">
                <router-link :to="'/' + item.id"><img :src="item.img"></router-link>
                <span class="music_bottom"><span class="music_title">{{item.name}}</span><i class='el-icon-video-play icon_play' @click="MusicPlay(item.id)"></i></span>
              </li>
            </div>
          </div>
        </div>

      <!-- 热门歌单 -->
      <div class="second_floor">
        <i class="el-icon-lightning music_tip">热门歌单<i class="el-icon-bottom"></i></i>
        <router-link to="/" class="more_font">more<i class="el-icon-d-arrow-right music_tip"></i></router-link>
        <hr>
        <div class="hot">
          <div class="hot_sheet">
            <li v-for="(item, index) in musicLists" :key="index">
              <router-link :to="'/' + item.id"><img :src="item.img"></router-link>
              <span class="music_bottom"><span class="music_title">{{item.sheet}}</span><i class='el-icon-video-play icon_play'></i></span>
            </li>
          </div>
        </div>
      </div>

      <!-- 热门歌手 -->
      <div class="third_floor">
        <i class="el-icon-cloudy-and-sunny music_tip">热门歌手<i class="el-icon-bottom"></i></i>
        <router-link to="/" class="more_font">more<i class="el-icon-d-arrow-right music_tip"></i></router-link>
        <hr>
        <div class="hot_sing">
          <div class="hot_singer">
            <li v-for="(item, index) in musicLists" :key="index">
              <router-link :to="'/' + item.id"><img :src="item.img"></router-link>
              <span class="music_bottom"><span class="music_author">{{item.author}}</span></span>
            </li>
          </div>
        </div>
      </div>

      <!-- 推荐MV -->
      <div class="four_floor">
        <i class="el-icon-moon music_tip">推荐MV<i class="el-icon-bottom"></i></i>
        <router-link to="/" class="more_font">more<i class="el-icon-d-arrow-right music_tip"></i></router-link>
        <hr>
        <div class="hot_sing">
          <div class="hot_singer">
            <li v-for="(item, index) in musicLists" :key="index">
              <router-link :to="'/' + item.id"><img :src="item.img"></router-link>
              <span class="music_bottom"><span class="music_author">{{item.author}}</span></span>
            </li>
          </div>
        </div>
      </div>

      </div>

      <!-- 右边内容 -->
      <div class="right_side">
        <div class="latest_news">
          <span>最新信息</span>
          <hr>
        </div>
        <div class="latest_discuss">
          <span>最新评论</span>
          <hr>
        </div>
        <div class="listener_message">
          <span>听众留言</span>
          <hr>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
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
          name: '薛之谦-刚刚',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 6,
          name: '薛之谦-刚刚',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 7,
          name: '薛之谦-刚刚',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        },
        {
          id: 8,
          name: '薛之谦-刚刚',
          author: '薛之谦',
          type: '流行',
          sheet: '又是那一年',
          img: require('../assets/images/s3.png'),
          src: require('../assets/audio/薛之谦 - 绅士.mp3'),
          lyric: ''
        }
      ]
    }
  },
  // components: {
  //   Audio
  // },
  methods: {
    MusicPlay (songId) {
      console.log('播放歌曲' + songId)
      // console.log(this.$parent.$parent.musicLists)
      this.$axios.get('http://jsonplaceholder.typicode.com/users').then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.music_centre{
  width: 80%;
  position: relative;
  top: 50px;
  margin: auto;
}

.left_music{
  width: 75%;
  position: relative;
  display: inline-block;
  vertical-align: top;
}

.first_floor,.second_floor,.third_floor,.four_floor{
  width: 100%;
  position: relative;
}

.hot{
  width: 100%;
  height: 420px;
  overflow: hidden;
}

.hot_sing{
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.music_tip{
  font-size: 20px;
}

.more_font{
  position: absolute;
  text-decoration: none;
  right: 60px;
  font-size: 20px;
  color: #000;
}

.more_font:hover{
  color: aliceblue;
}

.left_music hr{
  width: 95%;
  position: absolute;
  left: 0;
  border: 1.2px solid #ededed;
}

.left_music li{
  width: 100%;
  height: 150px;
  list-style: none;
  /* background-color: white; */
}

.left_music li img{
  width: 100%;
  height: 100%;
  /* border: 1px solid slategrey; */
}

.left_music li img:hover{
  transform: scale3d(1.05, 1.05, 1.05);
  transition: 1s;
}

.music_bottom{
  width: 100%;
  height: 25px;
  background-color: rgba(0.13, 0.15, 0.16, 0.5);
  position: relative;
  bottom: 30px;
  display:inline-block
}

.music_title{
  width: 120px;
  height: 20px;
  padding-left: 5px;
  position: relative;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  display:inline-block;
  color: #D4D3C7;
  font-size: 14px;
}

.music_author{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: #D4D3C7;
}

.icon_play{
  font-size: 22px;
  cursor: pointer;
}

.icon_play:hover{
  color: #D4D3C7;
}

.right_side{
  width: 25%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  background: rgba(0, 0, 0, 0.3)
}

.latest_news{
  width: 100%;
  height: 300px;
  text-align: center;
  border: 1px solid #000;
  padding-top: 10px;
  color: #ededed;
}

.latest_discuss{
  width: 100%;
  height: 300px;
  text-align: center;
  border: 1px solid #000;
  padding-top: 50px;
  color: #ededed;
}

.listener_message{
  width: 100%;
  height: 300px;
  text-align: center;
  border: 1px solid #000;
  padding-top: 50px;
  color: #ededed;
}
</style>
