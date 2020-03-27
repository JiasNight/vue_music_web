<template>
  <div class="containts">
    <router-view></router-view>
    <div class="stars">
      <div v-for="(item,index) in starsCount" :key="index" ref="star" class="star">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      starsCount: 800, // 星星数量
      distance: 800 // 间距
    }
  },
  created () {

  },
  mounted () {
    this.starsBackgroundFun()
  },
  methods: {
    // HTML星星背景方法
    starsBackgroundFun () {
      let _this = this
      let starArr = this.$refs.star
      // 遍历添加样式
      starArr.forEach(item => {
        var sf = 0.2 + (Math.random() * 1)
        var thisDistance = _this.distance + (Math.random() * 300)
        item.style.transformOrigin = `0 0 ${thisDistance}px`
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${sf},${sf})`
        item.style.borderRadius = '50%'
      })
    }
  }
}
</script>

<style scoped>
.containts{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
