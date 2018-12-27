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
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    pvalue: async function(newPvalue) {
      const that = this
      const { status, data: { city }} = await that.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        that.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        that.cvalue = ''
      }
    }
  },
  mounted: async function() {
    const that = this
    const { status, data: { province }} = await that.$axios.get('/geo/province')
    if (status === 200) {
      that.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    // _.debounce() 延时函数
    querySearchAsync: _.debounce(async function(query, cb) {
      const that = this
      if (that.cities.length) {
        // 搜‘北’，显示所有带‘北’的数据
        cb(that.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        const { status, data: { city }} = await that.$axios.get('/geo/city')
        if (status === 200) {
          that.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(that.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect: function(item) {
      console.log(item.value)
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
