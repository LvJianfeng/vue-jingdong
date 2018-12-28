const router = require('koa-router')()

router.get('/', async(ctx, next) => {
  global.console.log('index2')
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async(ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookie: ctx.cookies.get('pvid')
  }
})

/* await 后面跟着 promise 对象(如果不是则转化为 Promise), await 等待结果才执行下面代码, 能使代码依次执行 */
router.get('/testAsync', async ctx => {
  global.console.log('start', new Date().getTime())
  const a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      global.console.log('async a', new Date().getTime())
      resolve('ab')
    }, 1000)
  })
  const b = await 123
  ctx.body = {
    a,
    b
  }
})

module.exports = router
