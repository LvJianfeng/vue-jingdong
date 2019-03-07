<template>
  <div class="m-geo">
    <template v-if="logoType">
      <div class="nav">
        <div class="list">
          <nuxt-link to="/">
            <i class="el-icon-location"/>
            {{ $store.state.geo.position.city }}
          </nuxt-link>
          <dl
            v-for="item in block"
            :key="item"
          >
            <dd><nuxt-link to="/order">{{ item }}</nuxt-link></dd>
          </dl>
        </div>
      </div>
    </template>
    <template v-else>&nbsp;</template>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      block: []
    }
  },
  computed: {
    logoType() {
      return this.$route.name === 'index'
    }
  },
  async mounted() {
    // const blocks = []
    const { status, data: { city }} = await this.$axios.get('/geo/city')
    if (status === 200) {
      // let p
      // let c
      // const d = {}
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        this.block = wantArray[0].province
        console.log(this.block, 2)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
