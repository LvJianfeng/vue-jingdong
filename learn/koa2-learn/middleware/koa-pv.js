function pv(ctx) {
  /* redis */
  // session: 区分不同用户
	ctx.session.count++
	global.console.log('pv', ctx.path)
}

module.exports = function() {
	return async (ctx, next) => {
		pv(ctx)
		await next()
	}
}
