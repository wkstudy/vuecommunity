<template>
  <aside>
    <div v-if="showInfo" class="login-panel">
      <button @click="pageToLogin()">请登录</button>
    </div>
    <info-panel v-else :pageType='pageType' :pageInfo='pageInfo'></info-panel>
    <div v-if="pageType != 2 && $store.state.username" class="publish-topic">
      <button
        @click='goToTopicCreate'
      >发布话题</button>
    </div>
    <aside class="advertisement">
      <img src="@/assets/logo.png" alt="picture" title="vuejs中文社区" @click="goToWeb()">
    </aside>
    <topic-panel :topicList='pageInfo.recent_topics.slice(0, 5)' :topicType='"recent"' v-if="!showInfo && pageType === 1 || pageType === 2"></topic-panel>
    <topic-panel :topicList='noReplyLIst.slice(0, 5)' :topicType='"noreply"' v-if="pageType != 3"></topic-panel>
  </aside>
</template>
<script>
/**
  * pageType: 1 代表首页(/) 2 代表话题页(/topic) 3 代表用户页(/user)
  * <topic-panel> recent_topics: pageType 登录状态的1 、2 显示,3不显示
  * <topic-panel> noreply: pageType 1、2显示，3不显示
*/
import InfoPanel from './components/InfoPanel.vue'
import TopicPanel from './components/TopicPanel.vue'
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'CommonSideBar.vue',
  props: {
    pageType: {
      required: true,
      type: Number
    },
    pageInfo: {
      required: true
    }
  },
  data () {
    return {
      showInfo: true, // 显示登录框还是 信息面板
      noReplyLIst: []
    }
  },
  components: {
    InfoPanel,
    TopicPanel
  },
  beforeCreate () {
    //  由于没有无人回复话题的api,统一在这获取5个话题
    var _this = this
    _this.axios.get('/api/v1/topics', {
      params: {
        tab: 'all',
        limit: 5
      }
    }).then(function (response) {
      if (response.status === 200) {
        _this.noReplyLIst = response.data.data
      }
    })
  },
  created () {
    var _this = this
    if (_this.pageType === 1 && !Cookie.get('akn')) {
      // 只有首页没登录的情况才设为true,其他都是false
      _this.showInfo = true
    } else {
      _this.showInfo = false
    }
  },
  methods: {
    goToWeb () {
      window.location.href = 'https://www.vue-js.com/'
    },
    pageToLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    goToTopicCreate () {
      this.$router.push({
        path: '/topic/create'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-panel
  background-color #fff
  text-align center
  height 4rem
  line-height 4rem
  font-size 1.4rem
  button
    cursor pointer
.publish-topic
  margin-top 1.3rem
  padding 1rem
  background-color #fff
  button
    color #ffffff
    font-size 1.4rem
    background-color #369219
    line-height 2rem
    padding 3px 1rem
    border none
    letter-spacing 2px
    cursor pointer
    width 8rem
    border-radius 0 0 3px 3px
.advertisement
  margin-top 1.3rem
  background-color #ffffff
  text-align center
  height 12rem
  img
    height  100%
</style>
