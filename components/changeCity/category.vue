<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="(c, index) in item.city"
          :key="index"
          @click="handleSelect(c)"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import pyjs from 'js-pinyin'
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted() {
    const blocks = []
    const { status, data: { city }} = await this.$axios.get('/geo/city')
    if (status === 200) {
      let p
      let c
      const d = {}
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        console.log(wantArray[0].province, 1)
        for (const value of wantArray) {
          // console.log(value, 2)
          // p: 城市首字母小写拼音
          p = pyjs
            .getFullChars(value.name)
            .toLocaleLowerCase()
            .slice(0, 1)
          // 首字母小写拼音对应 ascii
          c = p.charCodeAt(0)
          // a-z
          if (c > 96 && c < 123) {
            if (!d[p]) {
              d[p] = []
            }
            d[p].push(value.name)
          }
        }
      }
      // console.log(d, 4)
      // 获取对应的键值对
      for (const [k, v] of Object.entries(d)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      // 排序
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
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
@import "@/assets/css/changeCity/categroy.scss";
</style>
