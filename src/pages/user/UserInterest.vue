<template>
  <main>
    <common-header></common-header>
    <div class="content">
      <common-side-bar :pageType='pageType' :pageInfo= 'pageInfo'></common-side-bar>
      <div class="cnt">
        <header>
          <span @click="goToIndex()">主页</span>
          <span @click="goToUser()">{{loginname}}的主页</span>
        </header>
        <topic-list :topicType='3' :topicArr='pageInfo.recent_topics' :loginname='loginname'></topic-list>
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
import CommonSideBar from '@/common/CommonSideBar/CommonSideBar.vue'
import TopicList from '@/pages/user/components/TopicList.vue'
export default {
  name: 'UserInterest.vue',
  props: ['loginname'],
  components: {
    CommonHeader,
    CommonFooter,
    CommonPagination,
    CommonSideBar,
    TopicList
  },
  data () {
    return {
      pageType: 3,
      pageInfo: {},
      topicType: 0,
      topicArr: [],
      totalPage: 0,
      currentPage: 0
    }
  },
  beforeRouteUpdate (to, from, next) {
    var _this = this,
      page = to.query.page
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
      page = this.$route.query.page
    _this.getUser(_this.loginname)
    _this.totalPage = 1 // 由于每个用于参与多少话题的api，因此这里统一设为1页
    // 设置当前页数
    if (page === undefined) {
      _this.currentPage = 1
    } else {
      _this.currentPage = Number(page) // 坑,从url中获得的是字符串，一直提示我currentPage是字符串，我都找不到是什么原因
    }
  },
  methods: {
    getUser (name) {
      var _this = this
      _this.axios.get('api/v1/user/' + name)
        .then(function (response) {
          if (response.status === 200) {
            _this.pageInfo = response.data.data
            if (_this.$route.path.indexOf('topics') === -1) {
              _this.topicType = 4
              _this.topicArr = _this.pageInfo.recent_replies
            } else {
              _this.topicType = 3
              _this.topicArr = _this.pageInfo.recent_topics
            }
          }
        })
    },
    goToUser () {
      var _this = this
      _this.$router.push({
        path: '/user/' + _this.loginname
      })
    },
    goToIndex () {
      this.$router.push({
        path: '/'
      })
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
    header
        padding 1rem
        background-color #f6f6f6
        border-radius 3px 3px 0 0
        color #369129
        font-size 1.4rem
        margin-bottom 1rem
        span
          cursor pointer
        span:first-child:after
          content '/'
          margin-left .6rem
</style>
