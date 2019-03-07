<template>
  <div class="m-geo">
    <template v-if="logoType">
      <div class="nav">
        <div class="list">
          <nuxt-link to="/">
            <i class="el-icon-location"/>
            {{ $store.state.geo.position.city }}
          </nuxt-link>
          <dl>
            <dd><nuxt-link to="/order">帮助中心</nuxt-link></dd>
          </dl>
        </div>
      </div>
    </template>
    <template v-else>&nbsp;</template>
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
