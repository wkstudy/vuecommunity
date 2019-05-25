<template>
  <ul
    @click="handleClick"
  >
    <div class="header">{{replies.length}} 回复</div>
    <li
      v-for="(reply, index) in replies"
      :key="reply.id"
    >
    <div>
      <img
        :src="reply.author.avatar_url"
        alt="author"
        :data-img="reply.author.loginname"
      >
      <span class="info">{{reply.author.loginname}}</span>
      <span class="pos-time">{{index + 1}} 楼 ·{{reply.create_at|cancelTime(now)}}</span>
      <span
        v-show="islogin"
        class="iconfont up"
        :data-id="reply.id"
        :class="{'hidden': reply.ups.length === 0, 'uped': reply.ups.indexOf(authorId) !== -1}"
      >&#xe65c;</span>
      <span
        class="ups-num"
        v-show="reply.ups.length !== 0 && islogin"
      >{{reply.ups.length}}</span>
      <span
        class="commet iconfont"
        v-show="islogin"
        :data-index='index'
      >&#xe60a;</span>
    </div>
    <div v-html="reply.content"></div>
    <div
      class="commet-content"
      v-show="commetArr[index]"
    >
      <textarea
        rows="10"
        v-model="commets[index]"
      ></textarea>
      <br>
      <button
        :data-replyid='reply.id'
        :data-replyindex='index'
      >提交</button>
    </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'TopicReply.vue',
  props: {
    replies: {
      required: true,
      type: Array
    },
    authorId: {
      required: true,
      type: String
    },
    islogin: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      now: new Date(),
      commetArr: [], // 用于弹出回复框
      commets: [] // 回复内容
    }
  },
  mounted () {
    var _this = this,
      len = _this.replies.length,
      i
    //  初始化回复框里的内容
    for (i = 0; i < len; i++) {
      _this.commets[i] = `@${_this.replies[i].author.loginname}`
    }
  },
  methods: {
    handleClick ($event) {
      var _this = this,
        ds = $event.target.dataset,
        id = ds.id,
        name = ds.img,
        index = ds.index
      if (id) {
        // 点赞
        _this.$emit('reply-up', id)
      } else if (name) {
        //  链接图片
        _this.$emit('reply-img', name)
      } else if (index) {
        // 评论
        if (_this.commetArr[index]) {
          _this.$set(_this.commetArr, index, false)
        } else {
          _this.$set(_this.commetArr, index, true)
        }
      } else if ($event.target.nodeName.toLowerCase() === 'button') {
        _this.$emit('reply-commet', ds.replyid, _this.commets[ds.replyindex])
        $event.target.classList.add('forbid')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.hidden
  visibility hidden
.forbid
  cursor not-allowed
ul
  margin .8rem 0 0 0
  background-color #fff
  padding 0
  .header
    padding 1rem
    background-color #f6f6f6
    border-radius 3px 3px 0 0
    color #1c6132
    font-size 1.4rem
  li:hover .up
    visibility visible
  li
    font-size 1.4rem
    padding 1rem 1rem 1rem .8rem
    border-top 1xp solid #f0f0f0
    position relative
    div:first-child
      line-height 3rem
      img
        cursor pointer
        float left
        width 3rem
        height 3rem
        margin-right .5rem
      .commet
        position absolute
        right 1.5rem
        top 1.8rem
        cursor pointer
      .up
        position absolute
        right 4.5rem
        top 1.8rem
        cursor pointer
      .uped
        font-style italic
        font-size 2.2rem
        color black
      .ups-num
        position absolute
        top 1.8rem
        right 3.5rem
      .pos-time
        font-size 1.1rem
        color #08c
    textarea
      width 80%
      resize vertical
    button
      color #ffffff
      cursor pointer
      border none
      background-color #3374de
      font-size 1.4rem
      line-height 2rem
      letter-spacing .5rem
      padding 3px 10px
</style>
