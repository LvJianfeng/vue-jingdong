function pv(ctx) {
  /* redis, session: 用户访问多少次 */
  ctx.session.count++
  global.console.log('pv', ctx.path)
}

module.exports = function() {
  return async(ctx, next) => {
    /* ctx: 上下文 */
    pv(ctx)
    /* next(): 下一个中间件 */
    await next()
  }
}
