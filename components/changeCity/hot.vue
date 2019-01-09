<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click="handleSelect(item.name)"
      >{{ item.name }}</dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    const { status, data: { city }} = await this.$axios.get('/geo/hotCity')
    // console.log(status, city, 'hostCity')
    if (status === 200) {
      const cityArray = city.map(item => {
        return {
          item
        }
      })
      // console.log(cityArray, 0)
      let wantArray
      for (const value of cityArray) {
        wantArray = [...value.item.value]
        // wantArray.map(item => {
        //   return item
        // })
        // console.log(wantArray, 1)
        for (const value of wantArray) {
          // value.filter(item => {
          //   return item.hot === true
          // })
          // console.log(value, 2)
          if (value.hot === true) {
            this.list.push(value)
            // console.log(this.list, 3)
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    handleSelect(cityName) {
      console.log(cityName)
      this.$store.commit('geo/setCity', cityName)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
</style>
