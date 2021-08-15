const Product = require('../../modles/Product')


!(async () => {

    // 创建商品
    // http://localhost:3000/images/shop/near.png
    // await Product.create({
    //     shopId: '60f5199176542711806d9823', //沃尔玛
    //     name: '桃子',
    //     imgUrl: '/images/shop/near.png',
    //     sales: '3',
    //     price: '3',
    //     oldPrice: '37',
    //     tabs: ['all', 'fruit']
    // })

    await Product.create({
        shopId: '60f5199176542711806d9823',
        name: '香梨',
        imgUrl: '/images/shop/near.png',
        sales: '5',
        price: '8',
        oldPrice: '6',
        tabs: ['all', 'vegetable']
    })

    await Product.create({
        shopId: '60f5199176542711806d9826',
        name: '西瓜',
        imgUrl: '/images/shop/near.png',
        sales: '300',
        price: '30',
        oldPrice: '35',
        tabs: ['all', 'vegetable']
    })

    // await Product.create({
    //     shopId: '60f5199176542711806d9823',
    //     name: '肉',
    //     imgUrl: '/images/shop/near.png',
    //     sales: '300',
    //     price: '333',
    //     oldPrice: '399',
    //     tabs: ['all', 'meat']
    // })

    // 查询某个商店，某个 tab 的商品列表
    // const list = await Product.find({
    //     shopId: '60f5199176542711806d9823',
    //     tabs: {
    //         $in: 'all' // 秒杀
    //     }
    // })
    // console.log(list)

})()