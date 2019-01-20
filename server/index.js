import Koa from 'koa'
import mongoose from 'mongoose'
// Elegant Console Logger for Node.js and Browser
import consola from 'consola'
// A body parser for koa, base on co-body. support json, form and text type body.
// 解析 body 的中间件，在 koa 中 this.body 就能直接获取到数据。post 参数获取
import bodyParser from 'koa-bodyparser'
// Generic session middleware for koa,
// easy use with custom stores such as redis or mongo,
// supports Delay session getter.
import session from 'koa-generic-session'
// Redis storage for koa session middleware/cache.
import Redis from 'koa-redis'
// JSON pretty-printed response middleware.
import json from 'koa-json'

import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import category from './interface/category'
import cart from './interface/cart'
import order from './interface/order'

const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// session
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)

// post handle
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)
app.use(json())

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
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use(order.routes()).use(order.allowedMethods())
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
