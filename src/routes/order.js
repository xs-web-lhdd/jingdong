const router = require('koa-router')()
const loginCheck = require('../middle-wares/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-models/index')
const { createOrder, getOrder } = require('../controller/order')

router.prefix('/api/order')


// 创建订单
router.post('/', loginCheck, async (ctx, next) => {
    // 获取用户信息
    const userInfo = ctx.session.userInfo
    const username = userInfo.username   
    // 获取订单数据
    const data = ctx.request.body 
    // 创建订单
    try {
        const newOrder = await createOrder(username, data)
        ctx.body = new SuccessModel(newOrder)
    } catch (err) {
        console.log(err);
        ctx.body = new ErrorModel(1005, '订单创建失败')
    }

})

// 获取订单列表
router.get('/', loginCheck, async (ctx, next) => {
    // 获取用户信息
    const userInfo = ctx.session.userInfo
    const username = userInfo.username   
    try {
        const getOrders = await getOrder(username)
        ctx.body = new SuccessModel(getOrders)
    } catch (err) {
        console.log(err);
        ctx.body = new ErrorModel(1006, '订单获取失败')
    }     
})


module.exports = router