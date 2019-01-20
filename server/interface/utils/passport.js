// Passport middleware for Koa
import passport from 'koa-passport'
// Passport strategy for authenticating with a username and password.
import LocalStrategy from 'passport-local'
// mongodb
import UserModel from '../../dbs/models/users'

// [Configure Strategy](https://www.npmjs.com/package/passport-local)
passport.use(
  new LocalStrategy(async function(username, password, done) {
    const where = { username }
    const result = await UserModel.findOne(where)
    if (result !== null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)

// 用户信息保留在 session 存储中, defulat
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport
