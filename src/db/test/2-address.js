// 用户数据操作

const Address = require('../../modles/Address')


!(async() => {
    // 创建收货地址
    // await Address.create({
    //     username: 'zhangsan', // 和用户关联起立
    //     city: '北京市',
    //     department: 'xxx小区',
    //     houseNumber: '门牌号1',
    //     name: '张三',
    //     phone: '18677778887'
    // })

    // await Address.create({
    //     username: 'zhangsan', // 和用户关联起立
    //     city: '北京市',
    //     department: '河南理工小区',
    //     houseNumber: '门牌号999',
    //     name: '张三',
    //     phone: '10292909939'
    // })

    // updatedAt: -1 进行逆序排序
    // 获取收获地址列表（获取 zhangsan 的）
    // const addressList = await Address.find({
    //     username: 'zhangsan'
    // }).sort({ updatedAt: -1 })
    // console.log(addressList)

    // 根据id获取单个收货地址
    // const id = '60f51455bd47d6249868e40f'
    // const address = await Address.findById(id)
    // console.log(address)

    // 更新收获地址
    const id = '60f51455bd47d6249868e40f'
    const newData = {
        username: 'zhangsan', // 和用户关联起立
        city: '河南省',
        department: '河南理工小区411',
        houseNumber: '门牌号411',
        name: '张三',
        phone: '6666'
    }
    const address = await Address.findOneAndUpdate(
        { _id: id, username: 'zhangsan' },
        newData,
        {
            new: true // 返回更新之后的最新数据（默认是false返回更新之前的数据）
        }
    )
})()