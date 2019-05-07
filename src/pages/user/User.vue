<template>
  <main>
    <common-header></common-header>
    <div class="content" v-if="loaded">
      <common-side-bar :pageType='pageType' :pageInfo= 'pageInfo'></common-side-bar>
      <div class="cnt">
        <section>
          <header>
            <span @click="goToIndex()">主页</span>
          </header>
          <section class="author">
            <div class="name">
              <img :src="pageInfo.avatar_url" :alt="pageInfo.loginname">
              <span>{{pageInfo.loginname}}</span>
            </div>
            <div>{{pageInfo.score}} 积分</div>
            <div>注册时间：{{pageInfo.create_at|cancelTime(new Date)}}</div>
          </section>
        </section>
        <topic-list :topicType='1' :topicArr='pageInfo.recent_topics'></topic-list>
        <topic-list :topicType='2' :topicArr='pageInfo.recent_replies'></topic-list>
      </div>
    </div>
    <div v-else>
      <common-loading></common-loading>
    </div>
    <common-footer></common-footer>
  </main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import CommonSideBar from '@/common/CommonSideBar/CommonSideBar.vue'
import TopicList from '@/pages/user/components/TopicList.vue'
import CommonLoading from '@/common/CommonLoading.vue'
export default {
  name: 'User.vue',
  props: ['loginname'],
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    TopicList,
    CommonLoading
  },
  data () {
    return {
      pageType: 3,
      pageInfo: null,
      loaded: false
    }
  },
  created () {
    var _this = this,
      name = _this.$route.params.loginname
    _this.getUser(name)
  },
  beforeRouteUpdate (to, from, next) {
    var _this = this
    _this.loaded = false
    _this.getUser(to.params.loginname)
    next()
  },
  methods: {
    getUser (name) {
      var _this = this
      _this.axios.get('api/v1/user/' + name)
        .then(function (response) {
          if (response.status === 200) {
            _this.pageInfo = response.data.data
            _this.loaded = true
          }
        })
    },
    goToIndex () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
main
  background-color #e1e1e1
.content
  min-height 50rem
  width 90%
  margin 1.5rem auto
  overflow hidden
  aside
    float right
    width 30rem
  .cnt
    margin-right 31rem
    section
      margin-bottom 1rem
      header
        padding 1rem
        background-color #f6f6f6
        border-radius 3px 3px 0 0
        color #369129
        font-size 1.4rem
        span
          cursor pointer
        span:after
          content '/'
          margin-left .6rem
      .author
        background-color #fff
        padding 1rem
        div
          margin-bottom 1rem
          font-size 1.4rem
        .name
          line-height 3.5rem
          overflow hidden
          img
            width 3.5rem
            height 3.5rem
            float left
            margin-right 1rem
          span
            color #77887
      section div:last-child
        color #ababab
</style>
