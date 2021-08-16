#### 项目初始化：

###### 安装koa：

npm i koa-generator -g

koa2 jingdong -server（初始化koa开发环境）

###### 进入该目录：

cd jingdong

然后运行 npm install

此时可以启动项目了：npm run dev

#### 数据库如何操作：

##### 插入文档1：

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败  playground是数据库名称
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})
// 使用规则创建集合           第一个参数：集合名称，第二个参数：规则     返回的Course是一个对象
const Course = mongoose.model('Course', courseSchema) // courses

// 实例对象
const course = new Course({
    name: 'Node.js基础',
    author: '刘豪讲师',
    isPublished: true
})
// 保存数据 --- 也就是将上面数据插入到数据库
course.save()


```

##### 插入文档2：

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败  playground是数据库名称
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})
// 使用规则创建集合           第一个参数：集合名称，第二个参数：规则     返回的Course是一个对象
const Course = mongoose.model('Course', courseSchema) // courses

// 利用creat进行插入文档 （大家会发现这是异步操作）
// Course.create({name: 'JavaScript', author: '刘豪讲师', isPublished: true}, (err, result) => {
//     // 错误对象
//     console.log(err);
//     // 当前插入的文档
//     console.log(result);
// })

// 因为是异步所以也支持Promise对象的方式
Course.create({name: 'CSS', author: '刘豪讲师', isPublished: false})
      .then(result => {
          console.log(result);
      })
```


##### mongoDB导入数据

用导入文件的方式进行导入

```js
mongoimport -d playground -c users --file ./data.json
// playground 是数据库名称 users是导入的集合名称 ./data.json是文件路径（要导入的数据文件）
// 成功后返回代码：
2021-07-18T21:41:38.917+0800    connected to: mongodb://localhost/
2021-07-18T21:41:38.965+0800    1 document(s) imported successfully. 0 document(s) failed to import.
```

##### 查询文档（find）

```js
// 根据条件查找文档（条件为空则查询所有文档）
Course.find().then(result => { console.log(result); })
// 该指令返回的是一个对象，里面是查询出来的数据（也就是文档集合）
```

##### 查询文档其他操作，以及细节点（find findOne）

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败  playground是数据库名称
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})
// 使用规则创建集合    
const Course = mongoose.model('Course', courseSchema)
// find里面没有参数代表查询所有，有参数就查询参数对应的数据
Course.find().then(result => console.log(result))
// 通过_id查询文档
Course.find({_id: '60f424eddfc0fe228470a19b'}).then(result => console.log(result))
// 当查询单挑数据时返回的是一个数组，如果没有查询到就返回空数组
//findOne() // 返回一条文档 默认当前集合中的第一条数据
Course.findOne({name: 'CSS'}).then(result => { console.log(result) })
// find返回的都是数组，然后里面有对象，findOne返回的是一个对象，不是数组的形式，还有就是findOne也可以写入查询条件
Course.find({name: 'CSS'}).then(result => { console.log(result) })
```

##### 查询大于小于

```js
Course.find({age: {$gt:20, $lt:50}}).then(result => { console.log(result) })
// 查询年龄大于20 小于50的数据
```

##### 查询包含

```js
Course.find({hobbies: {$in: ['敲代码']}}).then(result => { console.log(result) })
```

##### 选择要查询的字段

```js
Course.find().select('name email').then(result => { console.log(result) })
// 这个查询的是name email这两个字段，如果不想查询某个字段就在前面加上 - 就可以了
Course.find().select('-email').then(result => { console.log(result) })
// 不想查询-email那么除了email的所有值都会查询出来
```

##### 查询进行排序

```js
Course.find().sort('age').then(result => { console.log(result) })
// 这个就是对年龄进行升序排列
// 降序排列只需要在age前面加上一个 - 就可以了
Course.find().sort('-age').then(result => { console.log(result) })
```

##### 跳过和限制

```js
Course.find().skip(2).limit(2).then(result => { console.log(result) })
// 跳过所有文档中前两个,然后结果限制返回2条数据
```

##### 删除单挑数据

```js
// 删除单挑数据
Course.findOneAndDelete({name: 'lisi'}).then(result => { console.log(result) })
// name是参数,如果查询出来有多条lisi的数据,则默认删除第一条数据
```

##### 删除多条数据

```js
// 删除所有数据
Course.deleteMany({}).then(result => { console.log(result) })
// 注意:要写参数,如果不写参数将会删除Course下的所有数据
```

##### 更新文档

更新一条

```js
Course.updateOne({查询条件}, {要修改的值}).then(result => { console.log(result) })
// 比如:
Course.updateOne({name: '张三'}, {name: '李四'}).then(result => { console.log(result) })
```

更新多条

```js
Course.updateMany({}, {要修改的值}).then(result => { console.log(result) })
// 举例:
Course.updateMany({}, {age: '60'}).then(result => { console.log(result) })
// 该语句将所有文档的age更新为60
```

##### mongoose验证

在创建集合规则时，可以设置当前字段的验证规则，验证失败则就插入失败

```js
required: true // 必传字段 默认可以传也可以不传
// 举例
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '请传入文章标题'] // 设置为必传
    }

})
// 如果不传，那么控制台会报错，会说required是必传但没有传
```

required还可以传入一个数组，数组第一个是一个布尔值，用于决定是否必传，第二个参数是用来自定于错误信息

```js
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'] // 设置为必传
    }

})
```

minlength, maxlength:
见名知义这两个是字符串传入的最小长度和最大长度，是对字符串传入长度的验证

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'], // 设置为必传
        minlength: 2,
        maxlength: 5
    }

})

const Post = mongoose.model('Post', postSchema)

Post.create({title: 'a'}).then(result => console.log(result))
// 这里又报错，原因是传入的数据长度小于2
```

trim：去除字符串两边的空格

在返回值中将字符串两边的空格去除掉了

min: 2 数值最小是2
max: 100 数值最大是100

publishDate:
这个是代表插入的时间，可以传也可以不传，如果不传则会默认执行默认选项：

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'], // 设置为必传
        // minlength: [2, '文章长度不能小于2'],
        // maxlength: [5, '文章长度不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    publishDate:{
        type: Date,
        // 默认值
        default: Date.now()
    }

})

const Post = mongoose.model('Post', postSchema)

Post.create({title: 'aaa', age: 60}).then(result => console.log(result))
// 这里没有传，默认执行 default 这个选项，将当前时间传入进去
```

enum: 枚举，是一个数组，将限制的放入该数组中，如果传入的数据不在该数组中将会报错

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'], // 设置为必传
        // minlength: [2, '文章长度不能小于2'],
        // maxlength: [5, '文章长度不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    publishDate:{
        type: Date,
        default: Date.now()
    },
    category:{
        type: String,
        // 枚举
        enum: ['html', 'css', 'javascript', 'node.js']
    }

})

const Post = mongoose.model('Post', postSchema)

Post.create({title: 'aaa', age: 60, category: 'java'}).then(result => console.log(result))
// 这里会报错，原因是 java 不在枚举的范围内
```

自定义验证：

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'], // 设置为必传
        // minlength: [2, '文章长度不能小于2'],
        // maxlength: [5, '文章长度不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    publishDate:{
        type: Date,
        default: Date.now()
    },
    category:{
        type: String,
        // 枚举
        enum: ['html', 'css', 'javascript', 'node.js']
    },
    author:{
        type: String,
        validate: {
            validator: v => {
                // 返回布尔值，返回true代表验证成功，返回false验证失败
                // v 是要进行验证的值
                return v && v.length > 4
            },
            // message 是自定义错误信息
            message: '传入的数据不满足自定义规则'
        }
    }

})

const Post = mongoose.model('Post', postSchema)

Post.create({title: 'aaa', age: 60, category: 'html', author: 'bd'}).then(result => console.log(result))
// 这里报错因为自定义长度要大于4
```

##### 打印错误信息：

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题未传'], // 设置为必传
        // minlength: [2, '文章长度不能小于2'],
        // maxlength: [5, '文章长度不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    publishDate:{
        type: Date,
        default: Date.now()
    },
    category:{
        type: String,
        // 枚举
        enum: ['html', 'css', 'javascript', 'node.js']
    },
    author:{
        type: String,
        validate: {
            validator: v => {
                // 返回布尔值，返回true代表验证成功，返回false验证失败
                // v 是要进行验证的值
                return v && v.length > 4
            },
            // message 是自定义错误信息
            message: '传入的数据不满足自定义规则'
        }
    }

})

const Post = mongoose.model('Post', postSchema)

Post.create({title: 'aaa', age: 60, category: 'java', author: 'bd'})
    .then(result => console.log(result))
    .catch(error => {
        // 获取错误信息对象
        const err = error.errors
        // 循环错误信息对象
        for (var attr in err) {
            // 打印错误信息
            console.log(err[attr]['message'])
        } 
    })
// 这个例子中enum没有指定自定义错误信息，可以改一下enum，改为如下代码
category:{
    type: String,
    // 枚举
    enum: {
        values: ['html', 'css', 'javascript', 'node.js'], // 值
        message: '分类名称要在一定的范围内才可以' // 自定义的错误信息
    }
}
```

##### 集合关联：

例如：文章信息和用户信息存储在不同集合中，但文章是某个用户发表的，要查询文章的所有信息包括发表用户，就需要用到集合关联
1、使用id对集合进行关联
2、使用populate方法进行关联集合查询

```js
const mongoose = require('mongoose')

// 链接地址错误会链接失败
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库让带的参数
.then(() => { 
    console.log('链接成功') 
})
.catch((err) => {
    console.log(err, '数据库连接失败')
})

// 用户集合：
const User = mongoose.model('User', new mongoose.Schema({
    name: {type: String}
}))
// 文章集合：
const Post = mongoose.model('Post', new mongoose.Schema({
    title: {type: String},
    // 使用ID将作者集合和文章集合进行关联
    // 用户下划线id的类型有特殊写法：mongoose.Schema.Types.ObjectId
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}))

// 创建用户
User.create({name: 'itheima'}).then(result => console.log(result))
// 创建文章
Post.create({title: '123', author: "60f4dbf28e1ec62bb87e0e2f"}).then(result => console.log(result))


// // 联合查询：
Post.find()
    .populate('author')
    .then((err, result) => console.log(result))
```

#### 业务数据操作流程：

###### 1、连接数据库：（写法比较固定）

```js
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
```

###### 2、数据库模型设计：

按照数据库中数据要存储需求进行设计：

```js
const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String,
        require: true, // 必填
        unique: true // 唯一，不可重复
    },
    password: String,
}, { timestamps: true })

const User = mongoose.model('user',Schema)

module.exports = User
```

 	在模型设计完成后可以进行测试，这样有两个好处：1、验证所写的模型是否正确  2、在数据库中会有一些原始数据的积累，后期不需要可以再删

```js
// 用户数据操作

const User = require('../../modles/User')


!(async() => {
    // 注册：创建一个新的用户
    await User.create({
        username: 'zhangsan',
        password: '123'
    })

    // 再创建一个用户
    await User.create({
        username: 'lisi',
        password: 'loveyou'
    })   

    // 登录：查询单个用户
    const zhangsan = await User.findOne({
        username: 'zhangsan',
        password: '123'
    })
    console.log(zhangsan);

})()
```

###### 3、根据需求的不同增、删、改、查数据库：

```js
 /**
  * 登录
  * @param {string} username 用户名
  * @param {string} password 密码
  */
  async function login(username, password) {
     // 保存到数据库
     const user = await User.findOne({ username, password })
     if (user != null) {
         return true
     }
     return false
 }
```

#### 服务端总流程：

1、初始化环境：Koa

2、路由！！！路由只管路由的事情，接收数据（接口），返回数据

3、业务逻辑层：对逻辑进行判断

4、数据库层：对数据库进行增删改查



之间会穿插一些登录验证的中间件，数据库模型的测试，统一返回的封装等



总结一点：看似麻烦，其实是在为后期的维护打基础

待完善：该项目没有用到md5密码加密，在实际中是会加密的

总之该项目不是很复杂，主要理解服务端的操作流程！！！

