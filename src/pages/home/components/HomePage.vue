<template>
  <ul>
    <li :class="{clickable: isClickAble('first')}" @click="changePage(1)">&laquo;</li>
    <li v-show="leftEllipsis">...</li>
    <li class="clickable" @click="changePage(current - 4)" v-show="effective(current - 4)">{{current - 4}}</li>
    <li class="clickable" @click="changePage(current - 3)" v-show="effective(current - 3)">{{current - 3}}</li>
    <li class="clickable" @click="changePage(current - 2)" v-show="effective(current - 2)">{{current - 2}}</li>
    <li class="clickable" @click="changePage(current - 1)" v-show="effective(current - 1)">{{current - 1}}</li>
    <li class="clickable active" @click="changePage(current)">{{current}}</li>
    <li class="clickable" @click="changePage(current + 1)" v-show="effective(current + 1)">{{current + 1}}</li>
    <li class="clickable" @click="changePage(current + 2)" v-show="effective(current + 2)">{{current + 2}}</li>
    <li class="clickable" @click="changePage(current + 3)" v-show="effective(current + 3)">{{current + 3}}</li>
    <li class="clickable" @click="changePage(current + 4)" v-show="effective(current + 4)">{{current + 4}}</li>
    <li v-show="rightEllipsis">...</li>
    <li :class="{clickable: isClickAble('last')}" @click="changePage(total)">&raquo;</li>
  </ul>
</template>
<script>
export default {
  name: 'HomePage.vue',
  data () {
    return {
      total: 2,
      current: 1,
      list: 5
    }
  },
  computed: {
    leftEllipsis () {
      return this.total > 5 && this.current > 3
    },
    rightEllipsis () {
      return this.total > 5 && this.current < this.total - 2
    }
  },
  watch: {
    '$route.query' (obj) {
      var _this = this
      switch (obj.tab) {
        case 'all':
          _this.total = 41
          break
        case 'good':
          _this.total = 1
          break
        case 'weex':
          _this.total = 1
          break
        case 'share':
          _this.total = 11
          break
        case 'ask':
          _this.total = 28
          break
        case 'job':
          _this.total = 2
          break
        default:
          _this.total = 41 // 如果没有tab，表示时默认的all
      }
      if (obj.page === undefined) {
        _this.current = 1
      } else {
        _this.current = obj.page
      }
      console.log(22)
    }
  },
  methods: {
    effective (num) {
      return num >= 1 && num <= this.total && Math.abs(num - this.current) <= 2
    },
    changePage (num) {
      var _this = this,
        obj = JSON.parse(JSON.stringify(_this.$router.currentRoute.query)) // 这里我们需要的应该是值，因此必须转为深拷贝
      Object.assign(obj, {page: num})
      _this.current = num
      _this.$router.push({
        query: obj
      })
    },
    isClickAble (val) {
      if (val === 'first') {
        return this.current !== 1
      } else {
        return this.current !== this.total
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
ul
  margin-top 0
  padding-top 1rem
  padding-left 1rem
  list-style-type none
  font-size 0
  background-color #fff
  li
    display inline-block
    color #778087
    font-size 1.4rem
    padding 4px 1.2rem
    line-height 2rem
    background-color #fff
    border 1px solid #ddd
  li + li
    border-left none
  .active
    color #369219
  .clickable
    cursor pointer
</style>
