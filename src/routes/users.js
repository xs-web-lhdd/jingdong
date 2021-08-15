const router = require('koa-router')()
const { register, login } = require('../controller/User')
const { SuccessModel, ErrorModel } = require('../res-models/index')

// 前缀
router.prefix('/api/user')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// 注册
router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body
  // 新建用户
  try {
    const newUser = await register(username,password)
    // ctx.body = {
    //   error: 0,
    //   data: newUser
    // }
    ctx.body = new SuccessModel(newUser)
  } catch(error) {
    console.log(error)
    // ctx.body = {
    //   error: 10001,
    //   message: `注册失败 - ${error.message}`
    // }
    ctx.body = new ErrorModel(10001, `注册失败 - ${error.message}`)
  }
})

// 登录
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  // 查询单个用户
  const res = await login(username, password)
  if (res) {
    // 登录成功
    ctx.session.userInfo = { username } // 设置session
    ctx.body = new SuccessModel()
  } else {
    // 登录失败
    ctx.body = new ErrorModel(10002, `登录验证失败`)
  }
})

module.exports = router
