﻿import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
// import search from './modules/search'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // 将服务端的一些数据传到客户端
    async nuxtServerInit({ commit }, { req, app }) {
      {
        const { status, data: { province, city }} = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
      }
      {
        const { status, data: { menu }} = await app.$axios.get('/geo/menu')
        commit('home/setMenu', status === 200 ? menu : [])
      }
    }
  }
})

export default store