import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    // 将服务端的一些数据传到客户端时
    async nuxtServerInit({ commit }, { req, app }) {
      {
        const { status, data: { province, city }} = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
      }
    }
  }
})

export default store
