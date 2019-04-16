<template>
<main>
  <common-header></common-header>
  <div class="content">

  </div>
  <common-footer></common-footer>
</main>
</template>
<script>
import CommonHeader from '@/common/CommonHeader.vue'
import CommonFooter from '@/common/CommonFooter.vue'
export default {
  name: 'Home.vue',
  components: {
    CommonHeader,
    CommonFooter
  }
}
</script>
<style lang="stylus" scoped>
.content
  background-color #e1e1e1
  min-height 60rem
</style>
