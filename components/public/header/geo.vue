<template>
  <div class="m-geo">
    <template v-if="logoType">
      <i class="el-icon-location"/>
      {{ $store.state.geo.position.city }}
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
