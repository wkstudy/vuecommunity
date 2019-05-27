<template>
  <main>
    <common-header></common-header>
    <div class="content">
      <aside>
        <section>
          <h4>Markdown语法参考</h4>
          <ul>
            <li>### 单行的标题/li>
            <li>**粗体**/li>
            <li>`console.log('行内代码')`</li>
            <li>```js\n code \n``` 标记代码块</li>
            <li>[内容](链接)</li>
            <li>![文字说明](图片链接)</li>
            <li>Markdown 文档</li>
          </ul>
        </section>
        <section>
          <h4>话题发布指南</h4>
          <ul>
            <li>尽量把话题要点浓缩到标题里</li>
            <li>代码含义和报错可在 SegmentFault 提问</li>
            <li>给话题选择合适的标签能增加浏览</li>
          </ul>
        </section>
      </aside>
      <div class="cnt">
        <header>
          <router-link to="/">主页</router-link>
          <span>发布话题</span>
        </header>
        <div>
          <fieldset>
            <label for="select">选择板块：</label>
            <select id="select" v-model="topicType">
              <option
                v-for="(obj, index) in arr"
                :key="index"
                :value="obj.type"
              >{{obj.name}}</option>
            </select>
          </fieldset>
          <fieldset>
            <input type="text" placeholder="标题字数10字以上" v-model="title">
          </fieldset>
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
            class="ckeditor"
          ></ckeditor>
          <div class="post">
            <button @click="publishTopic">提交</button>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
import Cookie from '@/assets/js/cookie.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: 'PublishTopic.vue',
  components: {
    CommonHeader,
    CommonFooter
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        }
      },
      arr: [
        {
          name: '请选择',
          type: 'all'
        },
        {
          name: 'weex',
          type: 'all'
        },
        {
          name: '分享',
          type: 'share'
        },
        {
          name: '问答',
          type: 'ask'
        },
        {
          name: '招聘',
          type: 'job'
        }
      ],
      topicType: 'all',
      title: ''
    }
  },
  methods: {
    publishTopic () {
      var _this = this
      if (_this.topicType === 'all') {
        alert('请选择话题(只能选择分享/问答/招聘)')
        return
      }
      if (_this.title.trim().length <= 10) {
        alert('标题不能太短')
        return
      }
      if (_this.editorData.trim() !== 0) {
        _this.postTopics()
      }
    },
    postTopics () {
      var url = 'api/v1/topics',
        _this = this,
        obj = {
          title: _this.title,
          tab: _this.topicType,
          content: _this.editorData,
          accesstoken: Cookie.get('akn')
        }
      _this.axios.post(url, obj)
        .then(function (response) {
          if (response.status === 200) {
            _this.goToTopic(response.data.topic_id)
          } else {
            alert('发送失败，请重试')
          }
        })
    },
    goToTopic (id) {
      this.$router.push({
        path: '/topic/' + id
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.cnt > div >>> .ck-content
  min-height 35rem
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
    h4
      margin 0
      color 1c6132
      border-radius 3px 3px 0 0
      background-color #f6f6f6
      font-size 1.32rem
      padding 1rem
    ul
      margin-top 0
      list-style-type none
      background-color #fff
      padding 1rem
      line-height 2rem
      font-size 1.3rem
  .cnt
    margin-right 31rem
    header
      padding 1rem
      background-color #f6f6f6
      border-radius 3px 3px 0 0
      line-height 2rem
      font-size 1.4rem
      a
        text-decoration none
        color #369219
      span:before
        content ' / '
      span
        color #999
    header + div
      background-color #fff
      fieldset
        border none
        line-height 2rem
        font-size 1.4rem
        select
          width 10rem
        input
          width 98%
          padding 4px 6px
          border 1px solid #e1e1e1
          font-size 1.3rem
          border-radius 4px
          height 2rem
      .post
        padding-top 2rem
        button
          color #ffffff
          cursor pointer
          background-color #0055cc
          letter-spacing .2rem
          border-radius 3px
          line-height 2rem
          border none
          padding 3px 1rem
          margin-left 1rem
          margin-bottom 1rem
</style>
