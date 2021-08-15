// 订单数据操作


const Order = require('../../modles/Order')
const Address = require('../../modles/Address')
const Product = require('../../modles/Product')

!(async () => {
    // 创建订单
    const requestBody = {
        addressId: '60f51455bd47d6249868e40f',
        shopId: '60f5199176542711806d9823',
        shopName: '沃尔玛',
        isCanceled: false,
        products: [
            {
                id: '60f51d5313517b2024744169',
                num: 3
            },
            {
                id: '60f51d5313517b202474416c',
                num: 5
            }
        ]
    }

    // 获取地址
    const address = await Address.findById(requestBody.addressId)
    // 获取商品id
    const pIds = requestBody.products.map(item => item.id)
    const productList = await Product.find({
        shopId: requestBody.shopId,
        _id: {
            $in: pIds
        }
    })
    // console.log(pIds);
    // console.log(productList);
    // 整合订单数量
    const productListWidthSales = productList.map(item => {
        const id = item._id.toString()
        const filterProducts = requestBody.products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            throw Error('找不到数量')
        }
        return {
            product: item,
            orderSales: filterProducts[0].num
        }
    })
    // console.log(productListWidthSales);

    Order.create({
        username: 'zhangsan',
        shopId: requestBody.shopId,
        address: address,
        isCanceled: requestBody.isCanceled,
        shopName: requestBody.shopName,
        products: productListWidthSales
    })

})()