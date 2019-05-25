<template>
  <div class="topic-header">
      <div class="title">
        <div
          class="col"
          :class="{'de_collect':collect, 'collect': !collect}"
          v-show="login"
          @click="$emit('cancel-collect')"
        >{{collectTxt}}</div>
        <span v-if="topicCnt.top" class="top">置顶</span>
        <span v-else-if="topicCnt.good" class="top">精华</span>
        <h2>{{topicCnt.title}}</h2>
      </div>
      <ul>
        <li>发布于{{topicCnt.create_at|cancelTime(now)}}</li>
        <li>作者： {{topicCnt.author.loginname}}</li>
        <li>{{topicCnt.visit_count}}次浏览</li>
        <li>最后一次编辑是{{topicCnt.last_reply_at|cancelTime(now)}}</li>
        <li>来自{{topicCnt.tab|category}}</li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'TopicsContent.vue',
  props: {
    topicCnt: {
      required: true,
      type: Object
    },
    collect: {
      type: Boolean
    },
    login: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      now: new Date()
    }
  },
  filters: {
    category (val) {
      switch (val) {
        case 'share':
          return '分享'
        case 'good':
          return '精华'
        case 'weex':
          return 'weex'
        case 'ask':
          return '问答'
        case 'job':
          return '招聘'
      }
    }
  },
  computed: {
    collectTxt () {
      if (this.collect) {
        return '取消收藏'
      } else {
        return '收藏'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.topic-header
  background-color #fff
  border-bottom 1px solid #e5e5e5
  .title
    position relative
    .top
      background-color #369219
      padding 2px 4px
      font-size 1.2rem
      color #fff
      margin-left .8rem
    h2
      display inline-block
      font-size 2.2rem
      font-weight 700
      margin 8px 0 8px 8px
    .col
      position absolute
      width 6rem
      text-align center
      line-height 2rem
      padding 3px 10px
      font-size 1.4rem
      transition all .2s ease-in-out
      cursor pointer
      letter-spacing 2px
      box-shadow none
      border-radius 3px
      right 8px
      top .9rem
    .de_collect
      background-color #e5e5e5
    .collect
      color #fff
      background-color #369219
  ul
    list-style-type disc
    margin-left .8rem
    padding 0
    li
      display inline-block
      font-size 1.2rem
      line-height 2rem
      color #838383
    li:before
      content ''
      display inline-block
      width .4rem
      height .4rem
      border-radius .2rem
      vertical-align middle
      background-color #838383
      margin-right .3rem
      margin-left .4rem
</style>
