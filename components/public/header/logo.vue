<template>
  <div class="m-logo">
    <div class="nav">
      <template v-if="logoType">
        <div class="home-logo">
          <nuxt-link to="/">
            <img
              src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
              alt="美团"
            >
          </nuxt-link>
        </div>
      </template>
      <template v-else>
        <i class="el-icon-location"/>
        {{ $store.state.geo.position.city }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logoType() {
      return this.$route.name === 'index'
    }
  }
}
</script>

<style lang="scss">
</style>
