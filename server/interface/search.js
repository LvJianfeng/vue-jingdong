import Router from 'koa-router'
import Poi from '../dbs/models/poi'
import ResultsByKeywords from '../dbs/models/resultsByKeywords'
import Products from '../dbs/models/products'

const router = new Router({
  prefix: '/search'
})

// http://localhost:3000/search/top?input=十指恋时尚美甲&city=广州
// 搜索商家或地点
router.get('/top', async(ctx) => {
  /* 操作本地数据库 */
  try {
    const top = await Poi.find({
      // ctx.query.input & ctx.query.city: searchbar.vue pass parameter
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

// http://localhost:3000/search/hotPlace?city=广州&type=景点
router.get('/hotPlace', async(ctx) => {
  /* 操作本地数据库 */
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    const result = await Poi.find({
      city,
      type: ctx.query.type || '景点'
    }).limit(10)
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

// "有格调"界面
// http://localhost:3000/search/resultsByKeywords
router.get('/resultsByKeywords', async(ctx) => {
  /* 操作本地数据库 */
  try {
    const result = await ResultsByKeywords.findOne()
    ctx.body = {
      count: result.count,
      pois: result.pois
    }
  } catch (e) {
    ctx.body = {
      count: 0,
      pois: []
    }
  }
})

router.get('/products', async(ctx) => {
  /* 操作本地数据库 */
  // const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  try {
    const result = await Products.findOne({ city })
    // ctx.isAuthenticated() 是否已经登录?
    ctx.body = {
      keyword: result.keyword,
      product: result.product,
      more: ctx.isAuthenticated() ? result.more : [],
      login: ctx.isAuthenticated(),
      type: result.type
    }
  } catch (e) {
    ctx.body = {
      keyword: '',
      product: {},
      more: [],
      login: false,
      type: ''
    }
  }
})

export default router
