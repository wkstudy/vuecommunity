<template>
  <header>
    <div>
      <div class="header-img">
        <img src="@/assets/logo.png" alt="vuecommunity">
      </div>
      <div class="header-search">
        <span class="iconfont">&#xe609;</span>
        <input type="text" id="search">
      </div>
    </div>
    <nav>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li v-show='status === 1'>
        <router-link to="/my/message">未读消息</router-link>
      </li>
      <li>
        <a href='javascript:void(0)' @click="showModal">My GitHub</a>
      </li>
      <li>
        <router-link to="/login" v-if="status === 0">登录</router-link>
        <a v-else href='javascript:void(0)' @click="clearCookie()">退出</a>
      </li>
    </nav>
    <!-- 模态框 -->
    <transition>
      <div class="modal" @click="hideModal" v-show="show"></div>
    </transition>
    <transition name="fade" :duration="{leave: 200}">
      <div
        class="modal-body"
        v-show="show"
      >
      <div>
        <img
          src="@/assets/imgs/githubicon.svg"
          alt="wkstudy"
          title="click it"
          @click="goToGithub"
        >
      </div>
      <h3>welcome to my GitHub</h3>
      </div>
    </transition>
  </header>
</template>
<script>
import Cookie from '@/assets/js/cookie.js'
export default {
  name: 'CommonHeader.vue',
  data () {
    return {
      status: 0, // 0 代表未登录， 1代表已登录,
      show: false
    }
  },
  created () {
    if (Cookie.get('akn')) {
      this.status = 1
    } else {
      this.status = 0
    }
  },
  methods: {
    clearCookie () {
      Cookie.unset('akn')
      Cookie.unset('username')
      this.$store.commit('setUser') // 设置state中username为undefined
      this.status = 0
      //  刷新页面
      this.$router.go(0)
    },
    showModal () {
      this.show = true
    },
    hideModal () {
      this.show = false
    },
    goToGithub () {
      location.href = 'https://github.com/wkstudy'
    }
  }
}
</script>
<style scoped>
header {
  background-color: #1c6132;
  padding: .5rem 10%;
  overflow: hidden;
  height: 5rem;
}
header > div {
  float: left;
  margin-right: 5rem;
}
header > div{
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-img {
  width: 5rem;
  margin-right: 3rem;
}
.header-img img {
  width: 100%;
  height: 100%;
}
.header-search {
  background-color: #fff;
  border-radius: 1rem;
  padding-left: 5px;
  height: 2.5rem;
  width: 17rem;
  line-height: 2.5rem;
}
.header-search span {
  font-size: 1.8rem;
}
.header-search input {
  border: none;
  box-sizing: border-box;
  height: 70%;
  font-size: 1.6rem;
  width: 75%;
  outline:none;
  padding: 0;
}
nav {
  float: right;
  line-height: 5rem;
  width: 60%;
  overflow: hidden;
  list-style-type: none;
}
nav li {
  display: inline-block;
  font-size: 0;
  text-align: center;
  width: 24%;
}
nav li a {
  text-decoration: none;
  font-size: 1.6rem;
  color: #fff;
}
.modal {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  z-index: 1;
  position: fixed;
  background-color: #000;
  opacity: .5;
}
.modal-body {
  width: 20rem;
  height: 20rem;
  border-radius: 7px;
  background-color: #fff;
  position: fixed;
  text-align: center;
  z-index: 2;
  top: 30%;
  left: calc(50% - 10rem);
}
.modal-body img {
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  position: absolute;
  top: 5rem;
  left: 6rem;
}
.modal-body h3 {
  position: absolute;
  bottom: 1rem
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to {
  top: 0%;
}
</style>
