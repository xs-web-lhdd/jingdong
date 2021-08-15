// 新建收货地址

const Address = require('../modles/Address')

async function createAddress(username, data) {
    const address = await Address.create({
        username,
        ...data
    })
    return address
}

async function getAddress(username) {
    const list = await Address.find({username}).sort({updatedAt: -1})
    return list
}

async function getAddressById(id) {
    const address = await Address.findById(id)
    return address
}

async function updateAddress(id, username, data) {
    const address = await Address.findOneAndUpdate(
        { _id: id, username},
        { username, ...data},
        { new: true }
    ).sort({updatedAt: -1})
}

module.exports = {
    createAddress,
    getAddress,
    getAddressById,
    updateAddress
}