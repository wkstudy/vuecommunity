<template>
  <div>
    <header>{{title}}</header>
    <div class="panel">
      <div class="base-info">
        <img :src='pageInfo.avatar_url' alt="picture" @click="goToUser(pageInfo.loginname)">
        <span @click="goToUser(pageInfo.loginname)">{{pageInfo.loginname}}</span>
      </div>
      <div class="score">积分：{{pageInfo.score}}</div>
      <div class="signature">{{signature}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoPanel.vue',
  props: {
    pageType: {
      type: Number,
      required: true
    },
    pageInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    var _this = this
    if (_this.pageType === 1) {
      _this.title = '个人信息'
    } else {
      _this.title = '作者信息'
    }
  },
  computed: {
    signature () {
      // 由于没有返回个性签名 字段，这里只能全部使用默认值
      if (!this.pageInfo.signature) {
        return '这家伙很懒，什么个性签名都没有留下。'
      }
    }
  },
  methods: {
    goToUser (val) {
      this.$router.push({
        path: '/user/' + val
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
header
  color #51585c
  padding  1rem
  background-color #f6f6f6
  font-size 1.4rem
  border-radius 3px 3px 0 0
.panel
  padding 1rem
  background-color #fff
  .base-info
    display inline-flex
    align-items center
    justify-content flex-start
    height 5rem
    line-height 5rem
    img
      height 100%
      cursor pointer
      width 5rem
      margin-right 1rem
    span
      color #778087
      font-size 1.6rem
  .score
    font-size 1.4rem
    color #333
    margin-top 1rem
    margin-bottom .6rem
  .signature
    font-style italic
    font-size 1.3rem
    color #333
</style>
