<template>
<main>
  <common-header></common-header>
  <div class="content">
    <common-side-bar :pageType='pageType' :pageInfo= 'pageInfo'></common-side-bar>
    <div class="cnt">
      <nav>
        <a href="javascript:void(0)" v-bind:class="{active: all}" @click="goToPage()">全部</a>
        <a href="javascript:void(0)" v-bind:class="{active: good}" @click="goToPage('good')">精华</a>
        <a href="javascript:void(0)" v-bind:class="{active: weex}" @click="goToPage('weex')" >weex</a>
        <a href="javascript:void(0)" v-bind:class="{active: share}" @click="goToPage('share')">分享</a>
        <a href="javascript:void(0)" v-bind:class="{active: ask}" @click="goToPage('ask')">问答</a>
        <a href="javascript:void(0)" v-bind:class="{active: job}" @click="goToPage('job')">招聘</a>
      </nav>
      <home-list></home-list>
      <home-page></home-page>
    </div>
  </div>
  <common-footer></common-footer>
</main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import HomeList from '@/pages/home/components/HomeList.vue'
import HomePage from '@/pages/home/components/HomePage.vue'
import CommonSideBar from '@/common/CommonSideBar/CommonSideBar.vue'
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'Home.vue',
  data () {
    return {
      all: false,
      good: false,
      weex: false,
      ask: false,
      share: false,
      job: false,
      pageType: 1, // 1表示首页，二表示话题页
      pageInfo: null
    }
  },
  components: {
    CommonHeader,
    CommonFooter,
    HomeList,
    HomePage,
    CommonSideBar
  },
  beforeRouteUpdate (to, from, next) {
    var _this = this,
      old = from.query.tab,
      latest = to.query.tab
    if (latest === undefined) {
      _this[old] = false
      _this['all'] = true
    } else {
      if (old === undefined) {
        _this['all'] = false
      } else {
        _this[old] = false
      }
      _this[latest] = true
    }
    next()
  },
  created () {
    var _this = this,
      tab = _this.$route.query.tab,
      akn
    if (tab === undefined) {
      _this['all'] = true
    } else {
      _this[tab] = true
    }
    //  获取作者信息
    if (Cookie.get('akn')) {
      akn = Cookie.get('akn')
      _this.axios.post('/api/v1/accesstoken ', {
        accesstoken: akn
      }).then(function (response) {
        var data = response.data
        if (data.success) {
          _this.axios.get('api/v1/user/' + data.loginname)
            .then(function (response) {
              if (response.status === 200) {
                _this.pageInfo = response.data.data
              }
            })
        }
      })
    }
  },
  methods: {
    goToPage (val) {
      if (val === undefined) {
        this.$router.push('/')
      } else {
        this.$router.push({
          path: '/',
          query: {
            tab: val
          }
        })
      }
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
    nav
      padding 1rem
      font-size 1.4rem
      background-color #f6f6f6
      border-radius 3px 3px 0 0
      a
        margin 0 1rem
        color #369219
        text-decoration none
      a:hover,
      a:active
        color #005580
      a.active
        background-color #369219
        color #fff
        padding 3px 4px
        border-radius 3px
      .router-link-active
        color gray
      .router-link-exact-active
        color red
</style>
