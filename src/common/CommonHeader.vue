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
      <li>
        <router-link to="/">未读消息</router-link>
      </li>
      <li>
        <router-link to="/">My GitHub</router-link>
      </li>
      <li>
        <router-link to="/">登录</router-link>
      </li>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'CommonHeader.vue'
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
  font-size: 2.8rem;
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
</style>
