import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/login/Login.vue'
import User from '@/pages/user/User.vue'
import UserInterest from '@/pages/user/UserInterest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component: User,
      props: true
    },
    {
      path: '/user/:loginname/topics',
      name: 'UserInterest',
      component: UserInterest,
      props: true
    },
    {
      path: '/user/:loginname/replies',
      name: 'UserInterest',
      component: UserInterest,
      props: true
    }
  ]
})
