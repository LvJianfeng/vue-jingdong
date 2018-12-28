const router = require('koa-router')()
const Person = require('../dbs/models/person')

/* redis */
const Redis = require('koa-redis')
const Store = new Redis().client

/* 路由前缀 */
router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
})

// 定位到 http://localhost:3000/users/bar 路由, 控制台输出
router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
})

/* 增加数据 */
router.post('/addPerson', async(ctx, next) => {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    /* save: 增加数据 */
    await person.save()
    code = 0
  } catch (error) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

/* 查询数据 */
router.post('/getPerson', async(ctx, next) => {
  /* findOne: 找出一条 */
  const result = await Person.findOne({
    name: ctx.request.body.name
  })
  /* find: 找出所有 */
  const results = await Person.find({
    name: ctx.request.body.name
  })
  ctx.body = {
    code: 0,
    result,
    results
  }
})

/* 修改数据 */
router.post('/updatePerson', async function(ctx) {
  /* where: 定位数据 */
  /* update: 修改数据 */
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0,
    result
  }
})

/* 删除数据 */
router.post('/removePerson', async function(ctx) {
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove()
  ctx.body = {
    code: 0,
    result
  }
})

/* redis */
/* 不经过 session 直接读取 redis */
router.get('/fix', async(ctx, next) => {
  /* key, k-v */
  const st = await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0,
    st
  }
})

module.exports = router
