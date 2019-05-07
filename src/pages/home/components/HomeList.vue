<template>
  <div>
    <ul v-if="isLoading">
      <li v-for="list in lists" :key="list.id">
        <img :src="list.author.avatar_url" :alt="list.author.loginname" @click="goToUser(list.author.loginname)">
        <span class="list-reply">{{list.reply_count}}/{{list.visit_count}}</span>
        <span v-show="list.top" class="list-top">置顶</span>
        <a href="javascript:void(0)" @click="goToTopic(list.id)" class="list-title">{{list.title}}</a>
        <span class="list-time">{{list.create_at|cancelTime(now)}}</span>
      </li>
    </ul>
    <div v-else id="loading-bg">
      <common-loading></common-loading>
    </div>
  </div>
</template>
<script>
import CommonLoading from '@/common/CommonLoading.vue'
export default {
  name: 'HomeList.vue',
  components: {
    CommonLoading
  },
  data () {
    return {
      isLoading: false,
      lists: [],
      now: null
    }
  },
  watch: {
    '$route.query' (obj) {
      var _this = this

      _this.isLoading = false
      _this.getHomeData(obj)
    }
  },
  methods: {
    getHomeData (obj) {
      var _this = this,
        url = '/api/v1/topics'

      _this.axios.get(url, {
        params: obj
      })
        .then((response) => {
          _this.lists = response.data.data
          _this.isLoading = true
        }).catch((err) => {
          console.log(err)
        })
    },
    goToTopic (val) {
      this.$router.push({
        path: '/topic/' + val
      })
    },
    goToUser (name) {
      this.$router.push({
        path: '/user/' + name
      })
    }
  },
  beforeCreate () {
    console.log('bc')
  },
  created () {
    console.log('c')
    this.now = new Date()
  },
  beforeMount () {
    console.log('bm')
  },
  mounted () {
    console.log('m')
    var _this = this,
      tab = _this.$route.query.tab
    if (tab === undefined) {
      _this.getHomeData(undefined)
    } else {
      _this.getHomeData(tab)
    }
  },
  beforeUpdate () {
    console.log('bu')
  },
  updated () {
    console.log('u')
  },
  beforeDestroy () {
    console.log('bd')
  },
  destroyed () {
    console.log('d')
  }
}
</script>
<style lang="stylus" scoped>
ul
  list-style-type none
  padding-left 0
  margin-top 0
  margin-bottom 0
  li
    padding 1rem
    background-color #fff
    position relative
    border-bottom 1px solid #f0f0f0
    img
      width 3rem
      height 3rem
      cursor pointer
    a.list-title
      font-size 1.6rem
      color #333
      position relative
      top -1.1rem
      left 3rem
      text-decoration none
    a.list-title:visited
      color #888
    a.list-title:hover,
    a.list-title:active
      text-decoration underline
    .list-reply
      color: #b4b4b4
      font-size 1.4rem
      position relative
      top -1.1rem
      left 1rem
    .list-top
      background-color #369219
      padding 2px 4px
      color #fff
      left 2rem
      position relative
      top -1.1rem
      font-size 1.2rem
      text-align right
    .list-time
      position absolute
      right 1rem
      font-size 1.2rem
      top 1.9rem
#loading-bg
  min-height 50rem
</style>
