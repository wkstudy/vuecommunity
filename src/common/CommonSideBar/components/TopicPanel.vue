<template>
  <div>
    <header>{{title}}</header>
    <ul>
      <li v-for="(list, index) in topicList" :key="index">
        <a href="javascript:void(0)" @click="goToTopic(list.id)">{{list.title}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TopicPanel.vue',
  props: {
    topicList: {
      type: Array,
      required: true
    },
    topicType: {
      type: String, // 'recent'代表最近回复话题 'noreply'代表无人回复话题
      required: true
    }
  },
  computed: {
    title () {
      if (this.topicType === 'recent') {
        return '作者其他话题'
      } else {
        return '无人回复话题'
      }
    }
  },
  methods: {
    goToTopic (id) {
      this.$router.push({
        path: '/topic',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
div
  margin-top  1rem
  header
    color #51585c
    border-radius 3px 3px 0 0
    background-color #f6f6f6
    font-size 1.3rem
    padding 1rem
  ul
    padding 1rem
    margin 0
    list-style-type none
    background-color #ffffff
    li
      line-height 2rem
      a
        text-decoration none
        color #778087
        font-size 1.4rem
</style>
