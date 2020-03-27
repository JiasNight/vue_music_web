import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import Register from '../components/Register.vue'
import Bodyer from '../components/Bodyer.vue'
import TopMusic from '../components/TopMusic.vue'
import TopSinger from '../components/TopSinger.vue'
import TopSheet from '../components/TopSheet.vue'
import MyMusic from '../components/MyMusic.vue'
import Audio from '../components/AudioPlayer.vue'

Vue.use(VueRouter)
Vue.component(Audio)

const routes = [
  {
    path: '/',
    name: '',
    component: Index,
    children: [
      {
        path: '',
        name: 'index',
        component: Bodyer
      },
      {
        path: '/topmusic',
        name: 'topMusic',
        component: TopMusic
      },
      {
        path: '/topsinger',
        name: 'TopSinger',
        component: TopSinger
      },
      {
        path: '/topsheet',
        name: 'TopSheet',
        component: TopSheet
      },
      {
        path: '/mymusic',
        name: 'MyMusic',
        auth: false,
        component: MyMusic
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/audio',
    name: 'audio',
    component: Audio
  }
]

const router = new VueRouter({
  routes
})

export default router
