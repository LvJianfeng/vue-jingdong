import Router from 'koa-router'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'
import Positon from '../dbs/models/position'

const router = new Router({
  prefix: '/geo'
})

// http://localhost:3000/geo/getPosition
router.get('/getPosition', async ctx => {
  /* 操作本地数据库 */
  const result = await Positon.findOne()
  ctx.body = {
    province: result.province,
    city: result.city
  }
})

// http://localhost:3000/geo/menu
router.get('/menu', async ctx => {
  /* 操作本地数据库 */
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})

// http://localhost:3000/geo/province
router.get('/province', async ctx => {
  /* 操作本地数据库 */
  const result = await Province.find()
  ctx.body = {
    province: result.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

// http://localhost:3000/geo/province/110000
// 获取对应省份城市
router.get('/province/:id', async ctx => {
  /* 操作本地数据库 */
  const result = await City.findOne({ id: ctx.params.id })
  ctx.body = {
    code: 0,
    city: result.value.map(item => {
      return { province: item.province, id: item.id, name: item.name }
    })
  }
})

// http://localhost:3000/geo/city
router.get('/city', async ctx => {
  /* 操作本地数据库 */
  const result = await City.find()
  ctx.body = {
    city: result.map(item => {
      return {
        value: item.value
      }
    })
  }
})

// http://localhost:3000/geo/city
router.get('/hotCity', async ctx => {
  /* 操作本地数据库 bug! 没有返回完全的城市名 */
  const result = await City.find()
  ctx.body = {
    city: result.map(item => {
      const value = item.value
      const valueArray = [...value]
      return {
        value: valueArray
      }
    })
  }
})

export default router
