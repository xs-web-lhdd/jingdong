// description 登录验证中间件
// author 刘豪讲师
const { ErrorModel } = require('../res-models/index')

module.exports = async(ctx, next) => {
    const session = ctx.session
    if (session && session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(1003, '登录验证失败')
}