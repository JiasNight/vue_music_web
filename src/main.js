import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标库
import './assets/css/Iconfont/iconfont.css'
// 导入i18n
import VueI18n from 'vue-i18n'
// 导入axios
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_cn',
  messages: {
    'zh_cn': require('../src/assets/language/zh_cn.json'),
    'en_us': require('../src/assets/language/en_us.json')
  },
  silentTranslationWarn: true
})

Vue.prototype.$axios = axios

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
