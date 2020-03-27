<template>
  <div class="content_header">
        <!-- **********头部********** -->
    <header>
      <!-- 头部导航 -->
      <nav class="header_nav">
        <!-- logo -->
        <div class="logo">
          <router-link to="/">
            <img src="../assets/images/logo.png" alt="logo">
          </router-link>
        </div>
        <div class="logo_font">
          <router-link to="/" class="logo_title">
            <span>JiasMusic</span>
          </router-link>
        </div>
        <!-- 搜索框 -->
        <div class="search_box">
          <el-form>
            <el-form-item class="search_form">
              <el-input class="search_input" placeholder="输入关键词搜索！" prefix-icon="el-icon-search" v-model="searchFormDate" @keydown.enter.native="searchEnterFun">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 导航栏标签 -->
        <div class="top_music">
          <router-link to="/topmusic" class="to_top_music">音乐榜单</router-link>
          <!-- <hr class="nav_bottom_hr"> -->
        </div>
        <div class="top_singer">
          <router-link to="/topsinger" class="to_top_singer">歌手榜单</router-link>
        </div>
        <div class="sheet_music">
          <router-link to="/topsheet" class="to_sheet_music">音乐歌单</router-link>
        </div>
        <div class="my_music">
          <router-link to="/mymusic" class="to_my_music">我的音乐</router-link>
        </div>
        <div class="is_login">
          <router-link to="/login" class="to_is_login">未登录</router-link>
        </div>
      </nav>
    <!-- 导航栏下方分割线 -->
    <hr class="nav_hr">

      <!-- **********轮播图片********* -->
      <div class="rotation_images">
        <div class="img_list" @mouseout="imgPlay" @mouseover="imgPause">
          <ul>
            <li v-for="(imgs,index) in imgList" :key="index" :class="setClass(index)" :style="setBGImg(imgs.src)">
              <img :src="imgs.src" />
            </li>
          </ul>
          <!--下面的横线按钮-->
          <div class="btn_dots">
            <span v-for="(item, index) in dotsList" :key="index" :style="setActiveDot(index)" @mouseover="currentIndex = index"></span>
          </div>
          <!-- 左右按钮 -->
          <i class="el-icon-arrow-left pre_btn" @click="prevBtn()" v-show="showBtn"></i>
          <i class="el-icon-arrow-right next_btn" @click="nextBtn()" v-show="showBtn"></i>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchFormDate: '',
      imgList: [
        {
          src: require('../assets/images/roateImgs/1.jpg')
        },
        {
          src: require('../assets/images/roateImgs/2.jpg')
        },
        {
          src: require('../assets/images/roateImgs/3.jpg')
        },
        {
          src: require('../assets/images/roateImgs/4.jpg')
        },
        {
          src: require('../assets/images/roateImgs/5.jpg')
        }
      ],
      currentIndex: 0,
      dotsList: 5,
      showBtn: false,
      timer: null
    }
  },
  mounted () {
    this.imgPlay()
  },
  methods: {
    // 搜索框方法
    searchEnterFun () {
      // console.log(this.searchFormDate)
      // this.$router.replace('/login')
      this.$message({
        message: this.searchFormDate,
        type: 'warning',
        center: true
      })
    },
    setClass (i) {
      let prev = this.currentIndex === (this.dotsList - 1) ? 0 : this.currentIndex + 1
      let next = this.currentIndex === 0 ? (this.dotsList - 1) : this.currentIndex - 1
      switch (i) {
        case this.currentIndex:
          return 'active'
        case next:
          return 'next'
        case prev:
          return 'prev'
        default:
          return ''
      }
    },
    setBGImg (src) {
      return {
        backgroundImage: `url(${src})`
      }
    },
    setActiveDot (index) {
      return index === this.currentIndex ? {
        backgroundColor: this.color
      } : {
        backgroundColor: '#ccc'
      }
    },
    prevBtn () {
      this.currentIndex = this.currentIndex === 0 ? this.dotsList - 1 : this.currentIndex - 1
    },
    nextBtn () {
      this.currentIndex = ++this.currentIndex % this.dotsList
    },
    imgPause () {
      clearInterval(this.timer)
      this.showBtn = true
    },
    imgPlay () {
      this.timer = setInterval(this.nextBtn, 6000)
      this.showBtn = false
    }
  }
}
</script>

<style scoped>
.content_header{
    width: 100%;
    /* height: 100%; */
}

/* ************首页公告组件样式************* */

.logo{
  grid-area: logo;
  height: 80px;
  justify-self: end;
}

.logo img{
  height: 100%;
}

.logo_font{
  grid-area: logo_font;
  justify-self: start;
  align-self: center;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 50px;
}

.logo_title{
  text-decoration: none;
}

.logo_font span{
  color: #eee;
}

.search_box{
  grid-area: search_box;
  align-self: flex-end;
  justify-self: center;
}

.search_input >>> .el-input__inner{
  width: 100%;
  height: 30px;
  border-radius: 15px;
  color: black;
  background-color: rgba(238, 238, 238, 0.658);
}

.search_input >>> .el-input__inner:hover{
  background-color: #5E476F;
}

.top_music,.top_singer,.sheet_music,.my_music,.is_login{
  align-self: center;
  justify-self: center;
}

.top_music{
  grid-area: top_music;
}

.top_singer{
  grid-area: top_singer;
}

.sheet_music{
  grid-area: sheet_music;
}

.my_music{
  grid-area: my_music;
}

.is_login{
  grid-area: is_login;
}

.to_top_music,.to_top_singer,.to_sheet_music,.to_my_music,.to_is_login{
  text-decoration: none;
  color: #ededed;
}

.to_top_music:hover,.to_top_singer:hover,.to_sheet_music:hover,.to_my_music:hover,.to_is_login:hover{
  color: #aaa;
}

.nav_hr{
  width: 100%;
  margin: auto;
  border: solid 1.2px #ededed;
}

/* 链接文字颜色 */
.router-link-active{
  color:aqua;
}

/* 轮播图样式 */
.img_list ul li {
  width: 50%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 10px;
  list-style: none;
  transform: translate(-50%);
}

.img_list ul li img{
  width: 100%;
  height: 100%;
}

.img_list i{
  width: 20px;
  height: 50px;
  position: absolute;
  top: 50%;
  font-size: 50px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  z-index: 20;
}

.pre_btn{
  left: 5%;
}

.next_btn{
  right: 5%;
  transform: translate(-30px);
}

.img_list i:hover{
  color: rgba(255, 255, 255, 0.8);
}

.img_list .active{
  transform: translate3d(-50%, 0, 0) scaleX(1.05) scaleY(1.03);
  transition: 1s;
  z-index: 20;
}
.img_list .prev{
  transform: translate3d(-90%, 0, -200px) scaleY(0.9);
  transition: 1.5s;
  opacity: 0.5;
  z-index: 19;
}
.img_list .next{
  transform: translate3d(-10%, 0, -200px) scaleY(0.9);
  transition: 1.5s;
  opacity: 0.5;
  z-index: 19;
}

.btn_dots span{
  width: 100%;
  height: 60%;
  float: left;
  display: block;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  background-color: red;
}
</style>
