<template>
  <section class="container">Page is search
    <ul>
      <li v-for="(item, idx) in $store.state.navbar.app" :key="idx">{{item}}</li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";
export default {
  layout: "search",
  data() {
    return {
      list: []
    };
  }
  /*
  asyncData: nuxt 生命周期,
  ssr 服务器把编译好的内容下发给你
  异步获取的数据同时给浏览器端
  */
  // async mounted() {}
  // async asyncData() {
  // 	let {
  // 		status,
  // 		data: { list }
  // 	} = await axios.get('http://127.0.0.1:3000/city/list')
  // 	if (status === 200) {
  // 		return {
  // 			list
  // 		}
  // 	}
  // }
};
</script>
