<template>
  <section>
    <h3>
      <router-link v-show="topicType === 1" to="/">主页</router-link>
      <span>{{topicName}}</span>
      <span
        v-show="topicType === 1 && topicArr.length !== 0"
        class="mark"
        @click='markAll'
      >标记已读</span>
    </h3>
    <ul v-if="topicArr.length !== 0">
      <li v-for="(list,index) in topicArr" :key='index'>
        <img :src="list.author.avatar_url" :alt="list.author.loginname" :title='list.author.loginname' @click="goToUser(list.author.loginname)">
        <a href="javascript:void(0)" @click="goToTopic(list.id)">{{list.title}}</a>
        <span class="time">{{list.last_reply_at|cancelTime(new Date())}}</span>
      </li>
    </ul>
    <p v-else>
      无消息
    </p>
  </section>
</template>
<script>
/**
 * topicType: 1代表新消息，2 代表过往消息
 */
export default {
  name: 'MessageList.vue',
  props: {
    topicType: {
      required: true,
      type: Number
    },
    topicArr: {
      required: true,
      type: Array
    }
  },
  computed: {
    topicName () {
      var _this = this,
        str
      switch (_this.topicType) {
        case 1: str = '新消息'
          break
        case 2: str = '过往信息'
          break
        default:
          console.log(_this.topicType)
      }
      return str
    }
  },
  methods: {
    goToUser (name) {
      this.$router.push({
        path: '/user/' + name
      })
    },
    gotoUserInterest (val) {
      var _this = this,
        str
      if (val === 1) {
        str = 'topics'
      } else {
        str = 'replies'
      }
      _this.$router.push({
        path: '/user/' + _this.$parent.loginname + '/' + str
      })
    },
    goToTopic (id) {
      this.$router.push({
        path: '/topic/' + id
      })
    },
    markAll () {
      this.$emit('mark-all')
    }
  }
}
</script>
<style lang="stylus" scoped>
h3
  position relative
  padding 1rem
  background-color #f6f6f6
  border-radius 3px 3px 0 0
  color #999
  font-size 1.4rem
  font-weight normal
  margin-bottom 0
  margin-top 0
  a
    text-decoration none
    color #1c6132
    margin-right .5rem
  .mark
    position absolute
    right 1rem
    cursor pointer
    color #1c6132
ul
  list-style-type none
  margin 0
  padding 0
  background-color #ffffff
  li
    font-size 1.4rem
    padding 1rem 0 1rem 1rem
    position relative
    height 3rem
    line-height 3rem
    border-bottom 1px solid #f0f0f0
    overflow hidden
    img
      float left
      width 3rem
      height 3rem
      margin-right 1rem
      cursor pointer
    a
      font-size 1.6rem
      color #08c
      text-decoration none
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    a:hover
      text-decoration underline
    .time
      float right
      margin-right 2rem
      font-size 1.1rem
      color #777
  .more
    padding-top .5rem
    padding-bottom .5rem
    color #666
    font-size 1.4rem
    cursor pointer
p
  line-height 2rem
  padding 1rem
  background-color #fff
  border-radius 0 0 3px 3px
  margin-top 0
</style>
