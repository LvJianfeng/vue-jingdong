<template>
  <div class="m-logo">
    <ul class="nav">
      <li class="list">
        <template v-if="logoType">
          <dl>
            <dd>
              <nuxt-link to="/">
                <img
                  src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
                  alt="美团"
                >
              </nuxt-link>
            </dd>
          </dl>
        </template>
        <template v-else>
          <i class="el-icon-location"/>
          {{ $store.state.geo.position.city }}
        </template>
      </li>
    </ul>
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
