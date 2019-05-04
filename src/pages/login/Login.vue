<template>
  <main>
    <common-header></common-header>
    <div class="content">
      <fieldset>
        <label for="accesstoken">accesstoken:</label>
        <input type="text" id="accesstoken" v-model.trim="accesstoken" placeholder="请输入您的accesstoken">
      </fieldset>
      <fieldset>
        <button @click="login(accesstoken)">登录</button>
      </fieldset>
    </div>
    <common-footer></common-footer>
  </main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'Login.vue',
  components: {
    CommonHeader,
    CommonFooter
  },
  data () {
    return {
      accesstoken: ''
    }
  },
  methods: {
    login (val) {
      if (val === '') {
        alert('不能为空')
      } else {
        this.postAkn(val)
      }
    },
    postAkn (akn) {
      var expire,
        _this = this
      _this.axios.post('api/v1/accesstoken', {
        accesstoken: akn
      }).then(function (response) {
        if (response.status === 200) {
          expire = new Date()
          Cookie.set('akn', akn, expire.setTime(expire.getTime() + 30 * 24 * 60 * 60 * 1000), '/', 'localhost')
          // 返回到主页
          _this.$router.push({
            path: '/'
          })
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
    background-color #fff
    fieldset
      border none
      width 60%
      min-height 3rem
      margin 4rem auto
      label
        font-size 1.3rem
      input
        min-width 15rem
        font-size 1.3rem
        line-height 2.2rem
      button
        background-color #05c
        color #fff
        padding 3px 1rem
        letter-spacing 2px
        border-radius 3px
        font-size 1.4rem
        line-height 2.2rem
        border none
</style>
