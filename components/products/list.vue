<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="(item, index) in nav"
        :key="item.name"
        :class="[item.acitve === true ? 's-nav-active' : '']"
        @click="navSelect(item.txt, index)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item, idx) in list"
        :key="idx"
        :meta="item"
      />
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: false
        },
        {
          name: 's-price',
          txt: '价格最低',
          active: true
        },
        {
          name: 's-visit',
          txt: '人气最高',
          active: false
        },
        {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  // async asyncData({ app }) {
  //   const { data } = await app.$axios.get('searchList')
  //   return { items: data.list }
  // },
  methods: {
    navSelect(txt, index) {
      if (txt === '价格最低') {
        // 价格
        this.list.sort((a, b) => a.price - b.price)
        this.nav.active = false
        this.nav[index].active = true
        console.log(index)
      } else if (txt === '人气最高') {
        // 评论数量
        this.list.sort((a, b) => b.comment - a.comment)
        this.nav.active = false
        this.nav[index].active = true
        console.log(index)
      } else if (txt === '评价最高') {
        // 评分
        this.list.sort((a, b) => b.rate - a.rate)
        this.nav.active = false
        this.nav[index].active = true
        console.log(index)
      } else if (txt === '智能排序') {
        // 名字字母顺序
        this.list.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
        this.nav.active = false
        this.nav[index].active = true
        console.log(index)
      }
    }
  }
}
</script>
