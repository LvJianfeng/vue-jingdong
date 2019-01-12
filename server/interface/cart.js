import Router from 'koa-router'
import Cart from '../dbs/models/cart'
// 签名
import md5 from 'crypto-js/md5'

const router = new Router({
  prefix: '/cart'
})

// 创建购物车
router.post('/create', async ctx => {
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    // ctx.request.body: post 方式获取数据
    const { params: { id, detail }} = ctx.request.body
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    // 存储到数据库里面
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

// 获取购物车
router.post('/getCart', async ctx => {
  const { id } = ctx.request.body
  try {
    const result = await Cart.findOne({ cartNo: id })
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
