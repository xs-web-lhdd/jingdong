const Shop = require('../modles/Shop')
const Product = require('../modles/Product')


async function getHostList(ctx, next) {
    const list = await Shop.find().sort({ _id: -1 })
    return list
} 

async function getShopInfo(id) {
    const shop = await Shop.findById(id)
    return shop
}

async function getProductsByShopId(shopId, tab = 'all') {
    const list = await Product.find({
        shopId,
        tabs: {
            $in: tab
        }
    })
    return list
}

// 获取商店搜索结果函数
async function getSearchList(searchValue) {
    const value = searchValue.search
    const list = await Shop.find({
        name: value
    }).sort({ _id: -1 })
    return list
} 

module.exports = {
    getHostList,
    getShopInfo,
    getProductsByShopId,
    getSearchList
}