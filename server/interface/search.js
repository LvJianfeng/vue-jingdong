import Router from 'koa-router'
// import Config from '../dbs/config'
// import axios from './utils/axios'
import Poi from '../dbs/models/poi'
import ResultsByKeywords from '../dbs/models/resultsByKeywords'
import Products from '../dbs/models/products'

const router = new Router({
  prefix: '/search'
})
// const sign = Config.sign

// 搜索商家或地点
router.get('/top', async(ctx) => {
  /* 操作本地数据库 */
  // search.js pass parameter
  try {
    const top = await Poi.find({
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
      // type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
  /* 线上服务 */
  // const { status, data: { top }} = await axios.get(`${Config.requestUrl}/search/top`, {
  //   params: {
  //     // searchbar.vue 传入的参数
  //     input: ctx.query.input,
  //     city: ctx.query.city,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   top: status === 200 ? top : []
  // }
})

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
    // {
    //   "code": 0,
    //   "result": [
    //       {
    //           "name": "十指恋时尚美甲",
    //           "type": "景点"
    //       },
    //       {
    //           "name": "水云阁水疗养生休闲会所",
    //           "type": "景点"
    //       },
    //       {
    //           "name": "流溪河国家森林公园",
    //           "type": "景点"
    //       }
    //   ]
    // }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
  /* 线上服务 */
  // const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // const { status, data: { result }} = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
  //   params: {
  //     sign,
  //     city
  //   }
  // })
  // ctx.body = {
  //   result: status === 200 ? result : []
  // }
})

// "有格调"界面
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
  /* 线上服务 */
  // const { city, keyword } = ctx.query
  // const { status, data: { count, pois }} = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
  //   params: {
  //     city,
  //     keyword,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   count: status === 200 ? count : 0,
  //   pois: status === 200 ? pois : []
  // }
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
  /* 线上服务 */
  // const keyword = ctx.query.keyword || '旅游'
  // const city = ctx.query.city || '北京'
  // const { status, data: { product, more }} = await axios.get(`${Config.requestUrl}/search/products`, {
  //   params: {
  //     keyword,
  //     city,
  //     sign
  //   }
  // })
  // http://cp-tools.cn/search/products?keyword=旅游&city=北京&sign=a3c9fe0782107295ee9f1709edd15218
  // if (status === 200) {
  //   ctx.body = {
  //     product,
  //     // isAuthenticated 是否已经登陆
  //     more: ctx.isAuthenticated() ? more : [],
  //     login: ctx.isAuthenticated()
  //   }
  // } else {
  //   ctx.body = {
  //     product: {},
  //     more: ctx.isAuthenticated() ? more : [],
  //     login: ctx.isAuthenticated()
  //   }
  // }
})

export default router
