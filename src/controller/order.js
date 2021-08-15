
const Order = require('../modles/Order')
const Address = require('../modles/Address')
const Product = require('../modles/Product')
// username 用户
// data 订单数据

// 创建订单
async function createOrder(username, data) {
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false, // 默认值
        products: []        // 默认值
    } = data

    // 根据addresId获取地址信息
    // console.log('这是地址id',addressId._id)
    const address = await Address.findById(addressId._id) 
    // 获取商品id
    const pIds = data.products.map(item => item.id)
    const productList = await Product.find({
        shopId: shopId,
        _id: {
            $in: pIds
        }
    })

    // 整合订单数量
    const productListWidthSales = productList.map(item => {
        const id = item._id.toString()
        const filterProducts = data.products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            throw Error('找不到数量')
        }
        return {
            product: item,
            orderSales: filterProducts[0].num
        }
    })

    const newOrder = await Order.create({
        username: username,
        shopId: shopId,
        address: address,
        isCanceled: isCanceled,
        shopName: shopName,
        products: productListWidthSales
    })

    return newOrder

}

// 获取订单列表
async function getOrder(username) {
    const getOrders = await Order.find({
        username
    }).sort({updatedAt: -1})
    return getOrders
}




module.exports = {
    createOrder,
    getOrder
}