// 收货地址
const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../res-models/index')
const loginCheck = require('../middle-wares/loginCheck')
const { createAddress, getAddress, getAddressById, updateAddress } = require('../controller/address')

router.prefix('/api/user/address')


// 创建收获地址
router.post('/', loginCheck, async function(ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body

    // 创建数据
    try {
        const newAddress = await createAddress(username, data)
        ctx.body = new SuccessModel(newAddress)
    } catch(err) {
        console.log(err)
        ctx.body = new ErrorModel(1004, '创建收货地址失败')
    }
} )



// 获取收获地址列表
router.get('/', loginCheck, async function(ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    const list = await getAddress(username)
    ctx.body = new SuccessModel(list)
})

// 获取单个收获地址
router.get('/:id', loginCheck, async function(ctx, next) {
    const id = ctx.params.id // 获取id
    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
})

// 更新收货地址
router.patch('/:id', loginCheck, async function(ctx, next) {
    const id = ctx.params.id
    const data = ctx.request.body
    const userInfo = ctx.session.userInfo
    const username = userInfo.username    

    const newAddress = await updateAddress(id, username, data)
    ctx.body = new SuccessModel(newAddress)
})





module.exports = router