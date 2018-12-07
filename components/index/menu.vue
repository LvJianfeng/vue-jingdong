<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="navLeave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="navEnter">
        <i :class="item.type"/>
        {{ item.name }}
        <span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星际',
              child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }
          ]
        }
      ]
    }
  },
  computed: {
    curdetail() {
      /* 打印结果是个数组，要取内容 */
      // console.log(this.menu.filter((item)=>{
      //   return item.type === this.kind
      // })[0])
      return this.menu.filter(item => {
        return item.type === this.kind
      })[0]
    }
  },
  methods: {
    navLeave() {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    navEnter(e) {
      /* 获取 i 标签 className */
      this.kind = e.target.querySelector('i').className
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
