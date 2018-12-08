import Router from 'koa-router'
import Config from '../dbs/config'
import axios from './utils/axios'
// import Province from '../dbs/models/province'

const router = new Router({
  prefix: '/geo'
})
const sign = Config.sign

// 获取位置
router.get('/getPosition', async(ctx) => {
  const { status, data: { province, city }} = await axios.get(`${Config.requestUrl}/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取菜单数据
router.get('/menu', async(ctx) => {
  const { status, data: { menu }} = await axios.get(`${Config.requestUrl}/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

// 获取省份
router.get('/province', async(ctx) => {
  /* 操作本地数据库 */
  // let province = await Province.find();
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  /* 线上服务 */
  const { status, data: { province }} = await axios.get(`${Config.requestUrl}/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async(ctx) => {

})

export default router
