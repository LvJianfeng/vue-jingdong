<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      <nuxt-link to="/exit">退出</nuxt-link>
    </template>
    <template v-else>
      <nuxt-link
        class="login"
        to="/login">立即登录</nuxt-link>
      <nuxt-link
        class="register"
        to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    const {
      status,
      data: { user }
    } = this.$axios.get('/users/getUser').then()
    // await 后面是 promise 对象
    if (status === 200) {
      this.user = user
    }
  }
}
</script>

<style scoped lang="scss">
</style>
