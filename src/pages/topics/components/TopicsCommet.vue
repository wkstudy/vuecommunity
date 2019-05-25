<template>
  <div v-show="islogin">
    <h2>添加回复</h2>
    <textarea
      rows="10"
      v-model="cnt"
    ></textarea>
    <br>
    <button
    @click="handleClick"
    >回复</button>
  </div>
</template>
<script>
export default {
  name: 'TopicsCommet.vue',
  props: {
    islogin: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      cnt: ''
    }
  },
  methods: {
    handleClick ($event) {
      var _this = this
      if (_this.cnt.length !== 0) {
        _this.$emit('commet', undefined, _this.cnt)
        $event.target.classList.add('forbid')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.forbid
  cursor not-allowed
div
  background-color #fff
  h2
    padding 10px
    background-color #f6f6f6
    border-radius 3px 3px 0 0
    font-size 1.4rem
    color #1c6132
    font-weight normal
  textarea
      margin-left .5rem
      width 80%
      resize vertical
  button
    margin-left .5rem
    color #ffffff
    cursor pointer
    border none
    background-color #05c
    font-size 1.4rem
    line-height 2rem
    letter-spacing .5rem
    padding 3px 10px
</style>
