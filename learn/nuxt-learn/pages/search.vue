<template>
  <section class="container">
    Page is search
  </section>
</template>

<script>
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  }
  /*
  asyncData: nuxt 生命周期,
  ssr 服务器把编译好的内容下发给你
  异步获取的数据同时给浏览器端
  */
}
</script>
