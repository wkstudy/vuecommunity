// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/index.js'

import '@/assets/styles/normalize.css'
import '@/assets/styles/animate.css'
import '@/assets/styles/base.css'
import '@/assets/styles/iconfont.css'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.filter('cancelTime', function (old, now) {
  /**
   * @param(Date) old 话题创建的时间
   * @param(Date) now 访问页面的时间
   * return (String) 时间差
   */
  old = new Date(old)
  var dateDiff = now.getTime() - old.getTime(),
    y = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)), // 假定每年365天
    m = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30)), // 假定每月30天
    d = Math.floor(dateDiff / (1000 * 60 * 60 * 24)),
    h = Math.floor(dateDiff / (1000 * 60 * 60)),
    min = Math.floor(dateDiff / (1000 * 60))
  if (y > 0) {
    return y + '年前'
  } else if (m > 0) {
    return m + '个月前'
  } else if (d > 0) {
    return d + '天前'
  } else if (h > 0) {
    return h + '小时前'
  } else {
    return min + '分钟前'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
