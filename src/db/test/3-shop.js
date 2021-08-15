const Shop = require('../../modles/Shop')

// http://localhost:3000/images/shop/near.png
!(async () => {

    // 创建连个商店
    // await Shop.create({
    //     name: '沃尔玛',
    //     imgUrl: '/images/shop/near.png',
    //     sales: '1000',
    //     expressLimit: '0',
    //     expressPrice: '5',
    //     slogan: 'VIP尊享满89减4元运费券'
    // })
    // await Shop.create({
    //     name: '山姆会员商店',
    //     imgUrl: '/images/shop/near.png',
    //     sales: '5000',
    //     expressLimit: '10',
    //     expressPrice: '25',
    //     slogan: '联合利华洗护满10减5'
    // })

    // 获取商店列表(获取所有商店列表)
    // const shopList = Shop.find().sort({ sales: -1 })
    // console.log(shopList);

    // 获取商店详情
    // const id = '60f5199176542711806d9823'
    // const shop = await Shop.findById(id)
    // console.log(shop);

})()