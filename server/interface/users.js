import Router from 'koa-router'
// Redis storage for koa session middleware/cache
import Redis from 'koa-redis'
// Send e-mails from Node.js – easy as cake
import nodeMailer from 'nodemailer'

import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
// Promise based HTTP client for the browser and node.js
import axios from './utils/axios'

// Routing prefix
const router = new Router({
  prefix: '/users'
})
// get redis client
const Store = new Redis().client

router.post('/signup', async ctx => {
  // get the data unload by the user (register.vue pass parameter)
  const { username, email, code, password } = ctx.request.body
  if (code) {
    // redis hget() verifycode, hget() '/sigin' Store.hset()
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // username has been register
  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return
  }
  // write into database
  const nuser = await User.create({
    username,
    password,
    email
  })
  // register success
  if (nuser) {
    const res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async(ctx, next) => {
  // (register.vue pass parameter)
  // authenticate(): invoked passport-local Strategy
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.get('/fix', async ctx => {
  // Store.hset(`test`, "name", "111");
  ctx.session.name = 'nidie'
  ctx.body = {
    code: 0
  }
})

router.post('/verify', async(ctx, next) => {
  // register.vue pass parameter
  const { username } = ctx.request.body
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  // send email config
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    // false: 监听其他端口
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // What information is sent and received
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // email msg
  const mailOptions = {
    from: `认证邮件<${Email.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团网全栈实战》注册码',
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  // send email
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err)
    } else {
      // redis save user info
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已经发送，可能会有延时，有效期1分钟'
  }
})

router.get('/exit', async(ctx, next) => {
  await ctx.logout()
  // isAuthenticated: 判断是否认证 (检测现在是否是登录状态)
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async ctx => {
  // isAuthenticated: 判断是否认证 (检测现在是否是登录状态)
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
