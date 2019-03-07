import Router from 'koa-router'
import Categroy from '../dbs/models/category'

const router = new Router({
  prefix: '/category'
})

// products.vue
router.get('/crumbs', async ctx => {
  /* 操作本地数据库 */
  const result = await Categroy.findOne({
    city: ctx.query.city
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})

export default router
