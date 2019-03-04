<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="user">
        <template v-if="user">
          <nuxt-link
            class="exit"
            to="/exit">退出</nuxt-link>
          <nuxt-link
            class="username"
            to="/order">{{ user }}</nuxt-link>
        </template>
        <template v-else>
          <nuxt-link
            class="register"
            to="/register"
          >免费注册</nuxt-link>
          <nuxt-link
            class="login"
            to="/login"
          >请登录</nuxt-link>
        </template>
      </li>
      <li>
        <nuxt-link to="/">我的订单</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">我的京东</nuxt-link>
      </li>
      <li class="list">
        <nuxt-link to="/">京东会员</nuxt-link>
        <dl>
          <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
          <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
          <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/">企业采购</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/">客户服务</nuxt-link>
        <dl class="bd-sub">
          <dt>特色主题</dt>
          <dd><nuxt-link to="/">帮助中心</nuxt-link></dd>
          <dd><nuxt-link to="/">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="/">免费手机</nuxt-link></dd>
          <dd><nuxt-link to="/">申请开票</nuxt-link></dd>
        </dl>
        <dl class="bd-sub">
          <dt>特色主题2</dt>
          <dd><nuxt-link to="/">商家中心</nuxt-link></dd>
          <dd><nuxt-link to="/">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="/">手机开店</nuxt-link></dd>
          <dd><nuxt-link to="/">申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/">网站导航</nuxt-link>
        <div class="subContainer">
          <!-- dl 有 dt, 能标识标题 -->
          <dl class="hotel">
            <dt>特色主题</dt>
            <dd>京东试用</dd>
            <dd>京东金融</dd>
            <dd>全球售</dd>
            <dd>国际站</dd>
            <dd>京东会员</dd>
            <dd>京东预售</dd>
            <dd>买什么</dd>
            <dd>俄语站</dd>
            <dd>装机大师</dd>
            <dd>0元评测</dd>
            <dd>港销售</dd>
            <dd>优惠券</dd>
          </dl>
          <dl class="hotel2">
            <dt>行业频道</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
          <dl class="hotel2">
            <dt>生活服务</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
          <dl class="hotel2">
            <dt>更多精选</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
        </div>
      </li>
      <li>
        <nuxt-link to="/">手机京东</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  async mounted() {
    const { status, data: { user }} = await this.$axios.get('/users/getUser')
    if (status === 200) {
      this.user = user
    }
  }
}
</script>

<style scoped lang="scss">
</style>
