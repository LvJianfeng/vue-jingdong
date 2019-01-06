<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      :fetch-suggestions="querySearchAsync"
      placeholder="城市"
      @change="handleSelectCity"
    >
      <el-option
        v-for="item in city"
        ref="cityName"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      // 当前省份
      pvalue: '',
      city: [],
      // 当前省份下的城市
      cvalue: '',
      input: '',
      // 全国城市列表
      cities: []
    }
  },
  watch: {
    pvalue: async function(newPvalue) {
      const { status, data: { city }} = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  mounted: async function() {
    const { status, data: { province }} = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    // _.debounce() 延时函数
    querySearchAsync: _.debounce(async function(query, cb) {
      if (this.cities.length) {
        // 搜‘北’，显示所有带‘北’的数据
        cb(this.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        const { status, data: { city }} = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect(e) {
      console.log(`${e.value} ${e}`)
      this.$store.commit('geo/setCity', e.value)
      this.$store.commit('geo/setProvince', e.value)
    },
    handleSelectCity(e) {
      console.log(`${this.cvalue} ${e.value}`)
      // const city = console.log('a')
      // const city = e.target.querySelector('input').value
      console.log(this.$refs.cityName[0].value)
      // console.log(city)
      // this.$store.commit('geo/setCity', city)
      // this.$store.commit('geo/setProvince', e.value)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
