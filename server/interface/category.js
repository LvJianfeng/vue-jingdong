import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'
// import Province from '../dbs/models/province'

const router = new Router({ prefix: '/category' })
const sign = Config.sign

router.get('/crumbs', async(ctx) => {
  // let result = await Category.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }
  const { status, data: { areas, types }} = await axios.get(`${Config.requestUrl}/category/crumbs`, {
    params: {
      city: ctx.query.city.replace('市', '') || '北京',
      sign
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

export default router
