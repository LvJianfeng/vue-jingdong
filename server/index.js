import Koa from 'koa'
import mongoose from 'mongoose'
// 适用于Node.js和浏览器的优雅控制台记录器
import consola from 'consola'
// 解析 body 的中间件，在 koa 中 this.body 就能直接获取到数据。
import bodyParser from 'koa-bodyparser'
// session 内存存储, 支持延迟会话
import session from 'koa-generic-session'
// redis 用来存储 session 的数据库
import Redis from 'koa-redis'
// JSON 美观输出数据
import json from 'koa-json'

import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import category from './interface/category'
// import cart from './interface/cart'

const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// redis
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)

// post 处理
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)
app.use(json())

// 连接数据库
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)

// 开启 koa-passport 对 session 的支持
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // 引进路由
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(category.routes()).use(category.allowedMethods())
  // app.use(cart.routes()).use(cart.allowedMethods())
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
