<template>
  <main>
    <common-header></common-header>
    <div class="content" v-if="loaded">
      <common-side-bar :pageType='pageType' :pageInfo= 'pageInfo'></common-side-bar>
      <div class="cnt">
        <message-list
          :topicType='1'
          :topicArr='notRedMsg'
          v-on:mark-all='markAll'
        ></message-list>
        <message-list
          :topicType='2'
          :topicArr='readedMsg'
          v-on:mark-all='markAll'
        ></message-list>
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
import MessageList from '@/pages/message/components/MessageList.vue'
import CommonLoading from '@/common/CommonLoading.vue'
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'Message.vue',
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    MessageList,
    CommonLoading
  },
  data () {
    return {
      pageType: 4,
      pageInfo: null,
      loaded: false,
      readedMsg: [],
      notRedMsg: []
    }
  },
  created () {
    var _this = this,
      name = _this.$store.state.username
    _this.getUser(name)
    _this.getMessages()
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
    },
    getMessages () {
      var _this = this
      _this.axios.get('api/v1/messages?accesstoken=' + Cookie.get('akn'))
        .then(function (response) {
          if (response.status === 200) {
            _this.readedMsg = response.data.data.has_read_messages
            _this.notRedMsg = response.data.data.hasnot_read_messages
          }
        })
    },
    markAll () {
      var _this = this
      _this.axios.post('api/v1/message/mark_all', {
        accesstoken: Cookie.get('akn')
      })
        .then(function (response) {
          if (response.status === 200) {
            alert('标记成功')
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
</style>
