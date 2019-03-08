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
            <dd
              v-for="item in block"
              :key="item"
              @click="handleSelect(item)"
            ><nuxt-link to="/">{{ item }}</nuxt-link></dd>
          </dl>
        </div>
      </div>
    </template>
    <template v-else>&nbsp;</template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    const blocks = []
    const { status, data: { city }} = await this.$axios.get('/geo/city')
    if (status === 200) {
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        blocks.push(wantArray[0].province)
      }
      blocks.splice(4, 1, '内蒙古')
      blocks.splice(17, 1, '广西')
      this.block = blocks
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    handleSelect(cityName) {
      // console.log(cityName)
      this.$store.commit('geo/setCity', cityName)
    }
  }
}
</script>

<style lang="scss">
</style>
