<template>
  <main>
    <common-header></common-header>
    <div class="content">
      <common-side-bar :pageType='pageType' :pageInfo= 'pageInfo'></common-side-bar>
      <div class="cnt">
        <topic-content
          :topicCnt='topicInfo'
          :collect = 'collect'
          :login = 'login'
          v-on:cancel-collect = 'cancelCollect'
        ></topic-content>
        <article v-html="topicInfo.content"></article>
        <topics-reply
          v-show="topicInfo.replies.length !== 0"
          :replies='topicInfo.replies'
          :authorId='authorid'
          :islogin='login'
          v-on:reply-up='ups'
          v-on:reply-img='goToUser'
          v-on:reply-commet='commet'
        ></topics-reply>
        <topics-commet
          :islogin='login'
          v-on:commet='commet'
        >
        </topics-commet>
      </div>
    </div>
    <common-footer></common-footer>
  </main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import CommonSideBar from '@/common/CommonSideBar/CommonSideBar.vue'
import TopicContent from '@/pages/topics/components/TopicsContent.vue'
import TopicsReply from '@/pages/topics/components/TopicsReply.vue'
import TopicsCommet from '@/pages/topics/components/TopicsCommet.vue'
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'Topics.vue',
  props: ['id'],
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    TopicContent,
    TopicsReply,
    TopicsCommet
  },
  data () {
    return {
      pageType: 2, // 1表示首页，2表示话题页, 3表示用户页
      pageInfo: {},
      topicInfo: null,
      collect: false,
      login: false,
      collectArr: [],
      authorid: '5cb484a2b8826a093280af23' // 只给了点赞的用户的id数组，没给本用户的id，自己试出来应该是这个
    }
  },
  created () {
    var _this = this
    _this.getTopic(_this.id)
    // 查看是否登录
    if (Cookie.get('akn')) {
      _this.login = true
      _this.getUser(_this.$store.state.username, _this.storageCollectArr) // 用于之后获取用户的收藏列表
    } else {
      _this.login = false
    }
  },
  watch: {
    topicInfo (val) {
      var _this = this,
        user = _this.topicInfo.author.loginname
      _this.getUser(user, _this.storageTopicInfo)
    }
  },
  methods: {
    getTopic (id) {
      var _this = this
      _this.axios.get('api/v1/topic/' + id)
        .then(function (response) {
          if (response.status === 200) {
            _this.topicInfo = response.data.data
          }
        })
    },
    getUser (name, fn) {
      var _this = this
      _this.axios.get('api/v1/user/' + name)
        .then(function (response) {
          if (response.status === 200) {
            fn(response.data.data)
          }
        })
    },
    goToUser (name) {
      this.$router.push({
        path: '/user/' + name
      })
    },
    ups (id) {
      var url = 'api/v1/reply/' + id + '/ups',
        akn = Cookie.get('akn'),
        _this = this
      _this.axios.post(url, {
        accesstoken: akn
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data,
              index = _this.topicInfo.replies.findIndex(obj => obj.id === id), // 改评论的id
              pos
            if (data.success && data.action === 'up') {
              _this.topicInfo.replies[index].ups.push(_this.authorid)
            } else if (data.success && data.action === 'down') {
              pos = _this.topicInfo.replies[index].ups.indexOf(_this.authorid)
              _this.topicInfo.replies[index].ups.splice(pos, 1)
            }
          }
        })
    },
    storageTopicInfo (data) {
      // 用于右侧栏
      this.pageInfo = data
    },
    storageCollectArr (data) {
      // 将用户收藏话题存储起来
      console.log(data)
      var arr = data.collect_topics,
        _this = this,
        id = _this.topicInfo.id
      arr.forEach(element => {
        _this.collectArr.push(element.id)
      })
      if (_this.collectArr.findIndex((ele) => ele === id) === -1) {
        _this.collect = false
      } else {
        _this.collect = true
      }
    },
    cancelCollect () {
      var _this = this,
        url,
        obj = {
          accesstoken: Cookie.get('akn'),
          topic_id: _this.topicInfo.id,
          mdrender: true
        }
      if (_this.collect) {
        url = 'api/v1/topic/de_collect'
      } else {
        url = 'api/v1/topic/collect'
      }

      _this.axios.post(url, obj)
        .then(function (response) {
          if (response.status === 200) {
            _this.collect = !_this.collect
            if (_this.collect) {
              _this.collectArr.push(_this.topicInfo.id)
            } else {
              _this.collectArr.splice(_this.collectArr.indexOf(_this.topicInfo.id), 1)
            }
          }
        })
    },
    commet (id, cnt) {
      console.log(`id = ${id},,cnt= ${cnt}`)
      var _this = this,
        url = 'api/v1/topic/' + _this.id + '/replies',
        obj = {
          accesstoken: Cookie.get('akn'),
          reply_id: id,
          content: cnt
        }
      _this.axios.post(url, obj)
        .then(function (response) {
          if (response.status === 200) {
            _this.$router.go(0)
          }
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
    article
      background-color #fff
      padding-top 2rem
      padding-left .8rem
      padding-bottom 2rem
</style>
