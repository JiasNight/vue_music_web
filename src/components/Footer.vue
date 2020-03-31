<template>
    <div class="content_footer">
      <!-- copyRight@2020-Jias -->
        <footer class="foot_box">
          <div class="left">
            <span>友好链接</span>
            <a href="https://music.163.com/">
              <img src="../assets/images/neteasecloud.jpg" alt="">
            </a>
            <a href="https://y.qq.com//">
              <img src="../assets/images/QQmusic.jpg" alt="">
            </a>
            <a href="https://www.kugou.com///">
              <img src="../assets/images/kugou.jpg" alt="">
            </a>
          </div>
          <div class="centre">
            <span>个人网站 | 纯属娱乐 | 侵权即删 | 禁止商用</span>
            <span>copyRight@2020-Jias</span>
            <span class="count-number">
              访问次数：{{countNumber}} |
              <router-link class="to-admin" to="/admin">
                管理后台
              </router-link>
            </span>
          </div>
          <div class="right">
            <span>相关介绍</span>
            <a href="https://music.163.com/">
              vue.js
            </a>
            <a href="https://music.163.com/">
              Spring Boot
            </a>
            <a href="https://music.163.com/">
              element ui
            </a>
            <!-- <span>
              <a href="https://www.github.com/JiasNight">个人项目</a>
            </span> -->
          </div>
        </footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      countNumber: 124
    }
  }
}
</script>

<style scoped>

/* 底部样式 */
.content_footer{
  width: 100%;
  height: 100px;
  background-color: #aaa;
  bottom: 0;
  position: relative;
  top: 200px;
  text-align: center;
}

.foot_box{
  width: 80%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  /* background-color: aqua; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.foot_box .left{
  /* background-color: aqua; */
}

.foot_box .left span,.centre span,.right span{
  display: block;
  margin-top: 10px;
}

.foot_box .left a{
  margin-left: 20px;
  position: relative;
  top: 10px;
}

.foot_box .left a img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.foot_box .centre .to-admin,.right a{
  text-decoration: none;
  color: black;
}

.foot_box .centre .to-admin:hover{
  color: rgb(27, 12, 243);
}
</style>
