import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/login/Login.vue'
import User from '@/pages/user/User.vue'
import Message from '@/pages/message/Message.vue'
import Topics from '@/pages/topics/Topics.vue'
import UserInterest from '@/pages/user/UserInterest.vue'
import PublishTopic from '@/pages/publish/PublishTopic.vue'

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
    },
    {
      path: '/topic/create',
      name: 'PublishTopic',
      component: PublishTopic
    },
    {
      path: '/topic/:id',
      name: 'Topics',
      component: Topics,
      props: true
    },
    {
      path: '/my/message',
      name: 'Message',
      component: Message
    }
  ]
})
