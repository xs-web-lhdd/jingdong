const router = require('koa-router')()
const { getHostList, getShopInfo, getProductsByShopId, getSearchList } = require('../controller/shop')

const { SuccessModel, ErrorModel } = require('../res-models/index')


router.prefix('/api/shop')

// 商店列表
router.get('/hot-list', async function(ctx, next) {
    // 获取列表
    const list = await getHostList()
    ctx.body = new SuccessModel(list)
})

// 单个商店信息
router.get('/:id', async function(ctx, next) {
    const id = ctx.params.id // 获取id
    const shop = await getShopInfo(id)
    ctx.body = new SuccessModel(shop)
})  

// 获取商店的商品
router.get('/:id/products', async function(ctx, next) {
    const shopId = ctx.params.id
    const tab = ctx.query.tab || 'all'
    // 获取商品
    const products = await getProductsByShopId(shopId, tab)
    ctx.body = new SuccessModel(products)
})

// 获取商店搜索结果
router.post('/search', async function(ctx, next) {
    // 获取列表
    const searchValue = ctx.request.body
    const list = await getSearchList(searchValue)
    ctx.body = new SuccessModel(list)
})



module.exports = router