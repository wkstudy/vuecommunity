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
      <common-pagination
      :totalPage=totalPage
      :currentPage=currentPage
      v-on:current-change='currentChange'
      ></common-pagination>
    </div>
  </div>
  <common-footer></common-footer>
</main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import CommonPagination from '@/common/CommonPagination.vue'
import HomeList from '@/pages/home/components/HomeList.vue'
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
      pageType: 1, // 1表示首页，2表示话题页, 3表示用户页
      pageInfo: {},
      pages: {
        all: 41,
        good: 1,
        weex: 1,
        ask: 28,
        share: 11,
        job: 2
      }, // 预置各个分类的页数
      totalPage: 0,
      currentPage: 0
    }
  },
  components: {
    CommonHeader,
    CommonFooter,
    HomeList,
    CommonSideBar,
    CommonPagination
  },
  beforeRouteUpdate (to, from, next) {
    var _this = this,
      old = from.query.tab,
      latest = to.query.tab,
      page = to.query.page
    if (latest === undefined) {
      _this[old] = false
      _this['all'] = true
      _this.totalPage = _this.pages.all
    } else {
      if (old === undefined) {
        _this['all'] = false
      } else {
        _this[old] = false
      }
      _this[latest] = true
      _this.totalPage = _this.pages[latest]
    }
    // 设置当前页数
    if (page === undefined) {
      _this.currentPage = 1
    } else {
      _this.currentPage = Number(page) // 坑,从url中获得的是字符串，一直提示我currentPage是字符串，我都找不到是什么原因
    }
    next()
  },
  created () {
    var _this = this,
      tab = _this.$route.query.tab,
      page = _this.$route.query.page,
      akn
    // 设置tab及其页数
    if (tab === undefined) {
      _this['all'] = true
      _this.totalPage = _this.pages.all
    } else {
      _this[tab] = true
      _this.totalPage = _this.pages[tab]
    }
    // 设置当前页数
    if (page === undefined) {
      _this.currentPage = 1
    } else {
      _this.currentPage = Number(page) // 坑,从url中获得的是字符串，一直提示我currentPage是字符串，我都找不到是什么原因
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
    },
    currentChange (num) {
      var _this = this,
        obj = JSON.parse(JSON.stringify(_this.$router.currentRoute.query)) // 这里我们需要的应该是值，因此必须转为深拷贝
      Object.assign(obj, {page: num})
      _this.current = num
      _this.$router.push({
        query: obj
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
