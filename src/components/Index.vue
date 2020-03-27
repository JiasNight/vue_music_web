<template>
  <div class="content_index">

    <!-- *********头部********* -->
    <v-header></v-header>

    <!-- **********中间内容********** -->
    <router-view></router-view>

    <!-- **********底部********** -->
    <v-footer></v-footer>

    <!--  播放组件 -->
    <v-audio></v-audio>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Audio from './AudioPlayer.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'v-audio': Audio
  },
  methods: {
  }
}

</script>

<style scoped>
.content_index{
  width: 100%;
  height: 100%;
}
</style>
