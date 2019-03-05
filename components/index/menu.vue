<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="navLeave"
    >
      <!-- <dt>全部分类</dt> -->
      <dd
        v-for="(item, index) in $store.state.home.menu"
        :key="index"
        @mouseenter="navEnter"
      >
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave"
    >
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '' // 记录鼠标 hover 的状态
    }
  },
  computed: {
    /**
     * 当前的分类内容, 选中左侧分类某一项后，出现对应的右侧栏数据(过滤数据)
     * @return: 过滤数据
     */
    curdetail() {
      /* 打印结果是数组，要取内容 */
      // console.log(this.menu.filter((item)=>{
      //   return item.type === this.kind
      // })[0])
      return this.$store.state.home.menu.filter(item => {
        return item.type === this.kind
      })[0]
    }
  },
  methods: {
    navEnter(e) {
      /* e.target: 当前元素 */
      /* querySelector: 获取 i 标签 */
      this.kind = e.target.querySelector('i').className
    },
    navLeave() {
      const that = this
      that._timer = setTimeout(() => {
        that.kind = ''
      }, 150)
    },
    detailEnter() {
      clearTimeout(this._timer)
    },
    detailLeave() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">
</style>
