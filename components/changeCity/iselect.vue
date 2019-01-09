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
      ref="currentCity"
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
      @visible-change="ShandleSelect"
    >
      <el-option
        v-for="item in city"
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
        // 要实现本地化数据，要穿参数过去，然后 server 接受后修改代码
        // const { status, data: { city }} = await this.$axios.get('/geo/city', { params: { city: this.cvalue }})
        const { status, data: { city }} = await this.$axios.get('/geo/city')
        if (status === 200) {
          const cityArray = city.map(item => {
            return {
              item
            }
          })
          // console.log(cityArray)
          let wantArray
          const wantCityArray = []
          for (const value of cityArray) {
            wantArray = [...value.item.value]
            // console.log(wantArray)
            wantArray.map(item => {
              // console.log(item.name)
              wantCityArray.push(item.name)
              // console.log(wantCityArray)
            })
          }
          // console.log(wantCityArray)
          this.cities = wantCityArray.map(item => {
            return {
              value: item
            }
          })
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect(e) {
      this.$store.commit('geo/setCity', e.value)
    },
    ShandleSelect: async function() {
      // console.log(this.$refs.currentCity.value)
      const temp = this.$refs.currentCity.value
      const id = Math.floor(temp / 10000) * 10000
      // commons.app.js:331 GET http://localhost:3000/geo/province/0 500 (Internal Server Error)
      const { status, data: { city }} = await this.$axios.get(`/geo/province/${id}`)
      if (status === 200) {
        const provinceCity = city.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        // console.log(provinceCity)
        const currentCity = provinceCity.filter(item => {
          return item.id === temp
        })
        // console.log(currentCity[0].name)
        this.$store.commit('geo/setCity', currentCity[0].name)
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
