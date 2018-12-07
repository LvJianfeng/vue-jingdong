import Router from 'koa-router'
// redis 用来存储 session 的数据库, key-value 类型快
import Redis from 'koa-redis'
// nodemailer: 用自己账号给用户发邮件
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

// 路由前缀
const router = new Router({
  prefix: '/users'
})
// 获取 redis 客户端
const Store = new Redis().client

/**
 * -----注册接口-----
 */
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body // post 方式
  // 验证码
  if (code) {
    // redis 获取数据
    // hget 不经过 session 直接读取 redis
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
  // 用户名
  const user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return
  }
  const nuser = await User.create({
    username,
    password,
    email
  })
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

/**
 * -----登录接口-----
 */
router.post('/signin', async(ctx, next) => {
  // authenticate: 执行 passport-local 策略, 调用授权页面
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
        // ctx.login(user) 登录用户（序列化用户）
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

// 添加路由
router.get('/fix', async ctx => {
  // Store.hset(`test`, "name", "111");
  ctx.session.name = 'nidie'
  ctx.body = {
    code: 0
  }
})

/**
 * -----邮箱发送接口-----
 */
router.post('/verify', async(ctx, next) => {
  const username = ctx.request.body.username
  // 处理验证码过期时间
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  // 发邮件
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // 对外发送什么信息, 接收方式是什么
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 邮件显示什么内容
  const mailOptions = {
    from: `认证邮件<${Email.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团网全栈实战》注册码',
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  // 发送邮件
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err)
    } else {
      // redis 存储用户信息
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
  // 响应
  ctx.body = {
    code: 0,
    msg: '验证码已经发送，可能会有延时，有效期1分钟'
  }
})

/**
 * 退出登录
 */
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

/**
 * 获取用户信息
 */
router.get('/getUser', async ctx => {
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
