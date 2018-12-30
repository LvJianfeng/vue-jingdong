import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'
// import Categroy from '../dbs/models/categroy'

const router = new Router({
  prefix: '/category'
})
const sign = Config.sign

router.get('/crumbs', async(ctx) => {
  /* 操作本地数据库 */
  // let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '北京'})
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
  /* 线上服务 */
  const { status, data: { areas, types }} = await axios.get(`${Config.requestUrl}/categroy/crumbs`, {
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
