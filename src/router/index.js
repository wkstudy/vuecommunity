import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'

import '@/assets/styles/normalize.css'
import '@/assets/styles/animate.css'
import '@/assets/styles/base.css'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
