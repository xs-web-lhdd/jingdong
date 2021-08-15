// mongoose 连接数据库
// author liuhao
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'testdb' // 数据库名称

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// 开始连接 如果不设置useNewUrlParser: true,useUnifiedTopology: true那么会在
// 链接成功上面有一段代码,代码的意思就是要加上这两个可选参数
mongoose.connect(`${url}/${dbName}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// 连接对象
const db = mongoose.connection

db.on('error', err => {
    console.error('mongoose connection error', err)
})

db.once('open', () => {
    console.log('mongoose 连接成功')
})

module.exports = mongoose
