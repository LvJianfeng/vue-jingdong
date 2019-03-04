<template>
  <!-- gutter 栅格间隔 -->
  <el-row
    :gutter="0"
    class="m-header"
  >
    <!-- span 栅格占据的列数 (共24) -->
    <el-col :span="4">
      <logo/>
    </el-col>
    <el-col :span="3">
      <el-col :span="12">
        <geo/>
      </el-col>
      <el-col :span="12">
        <div>&nbsp;</div>
      </el-col>
    </el-col>
    <el-col :span="16">
      <navbar/>
    </el-col>
  </el-row>
</template>

<script>
import Logo from './logo'
import Geo from './geo'
import Navbar from './nav'
export default {
  components: {
    Logo,
    Geo,
    Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/layout.scss';
@import '@/assets/css/public/header/index.scss';
</style>
