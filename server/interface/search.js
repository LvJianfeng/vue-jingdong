import Router from 'koa-router'
import Config from '../dbs/config'
import axios from './utils/axios'
// import Poi from '../dbs/models/poi'

const router = new Router({
  prefix: '/search'
})
const sign = Config.sign

// 获取搜索内容
router.get('/top', async(ctx) => {
  const { status, data: { top }} = await axios.get(`${Config.requestUrl}/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

// 热门搜索
router.get('/hotPlace', async(ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result }} = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
    params: {
      city: city,
      sign
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

// s
router.get('/resultsByKeywords', async(ctx) => {
  const { city, keyword } = ctx.query
  const { status, data: { count, pois }} = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

export default router
