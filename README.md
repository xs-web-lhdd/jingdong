### 仿京东电商前台项目 ：

##### 项目介绍：

该项目前端用到了Vue3，用scss写样式，样式全程手写，后端用的Koa框架，数据库选用了mongodb

##### 前端相关知识点梳理以及一些包的安装：

项目启动：
```base
npm run serve
```
###### 项目开始前样式准备：
安装不同浏览器统一样式的包：
```base
npm install normalize.css --save
```

在main.js里面全局引入normalize：```import 'normalize.css'```

在base.scss里面声明全局样式：
```css
html {
    font-size: 100px; // 在移动端中1rem就是100px
}

body {
    font-size: .12rem;
}
```
并且在全局中引入：```import './style/base.scss' ```
另外：在该项目中引用大量图标，因此引用阿里的iconfont这个库，全局引入：
```js 
import './style/iconfont.css'
```
iconfont只需这两个部门即可：
```css
@font-face {
  font-family: 'iconfont';  /* Project id 2620307 */
  src: url('//at.alicdn.com/t/font_2620307_3t8iy2lgbwd.woff2?t=1627312036432') format('woff2'),
       url('//at.alicdn.com/t/font_2620307_3t8iy2lgbwd.woff?t=1627312036432') format('woff'),
       url('//at.alicdn.com/t/font_2620307_3t8iy2lgbwd.ttf?t=1627312036432') format('truetype');
}
  
.iconfont {
  font-family: "iconfont" !important;
  font-size: .16rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

在该项目中用到了css预处理器：scss，命名规范采用xxx__xx-x的形式，代表含义是xx是xxx下的子元素。

#### 请求细节优化：

未修改之前：

```javascript
        const result = await 											axios.post('https://www.fas1tmock.site/mock/c5d0565bfa454a9e486b470cf5fc7aeb/login/api/login', {
          username: data.username,
          password: data.password
        })
//        console.log(result)
        if (result.data.error === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          console.log('登录失败')
        }
```

这样写是判断是否用来登录，如果后端返回error是0就说明没有错误那就进行登录，如果不是0就说明有错误就打印出来登录失败，但这位样写有一些bug，就是如果发送的请求地址有错误的情况下axios.post就会报错，那么逻辑就执行不到if判断语句那里，所以就不会有任何报错提示，解决方法可以是将上面代码写道try catch语句里面：

```javascript
      try {
        const result = await axios.post('https://www.fas1tmock.site/mock/c5d0565bfa454a9e486b470cf5fc7aeb/login/api/login', {
          username: data.username,
          password: data.password
        })
        console.log(result)
        if (result.data.error === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          console.log('登录失败')
        }
      } catch (e) {
        alert('请求失败')
      }
```

#### axios下面post，get请求封装：

在使用axios前记得安装axios

```bash
npm i axios --save
```

```javascript
import axios from 'axios'

// 创建一个axios的实例：
const instance = axios.create({
  // baseURl会自动将请求地址拼到url前面
  // baseURL: 'https://www.fastmock.site/mock/c5d0565bfa454a9e486b470cf5fc7aeb/login',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000
})

// 封装get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

// 封装post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

```

```vue
使用时调用：
import { post, get } from '../../utils/request'
即可
```

router-link是VUE中的一个跳转组件，如果要在原有循环组件外面包上router-link那么需要将循环指令v-for v-key 都移到router-link里面去。另外router-link需要有一个to的属性，目的是告诉程序跳到哪一个页面，

在setup函数数据导出的时候return {  } 要记得加{} ，否则可能会出bug：

```javascript
    const item = {
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送￥0', '基础运费￥5'],
      desc: 'vip尊享满98元减4元（免运费）'
    }
    return { item } // 细节
```

可以用是否向子组件传值的方式来控制CSS结构：

```html
<div
 :class="{'shop__content':true , 'shop__content--bordered': hideBorder ? true : false}"
>
    
</div>
<-- shop__content--bordered 控制有无下划线 -->
```

在这个例子中通过hideBorder的有无来控制shop__content--bordered的class名是否有无，同时会在该组件接收prop的传值：

```javascript
  props: ['item', 'hideBorder']
```

如果Shop.vue引用Shopinfo.vue这个组件同时没有传 hideBorder这个值，那么Shop.vue中加载出来的Shopinfo.vue这个组件中就没有下划线，Nearby.vue引用Shopinfo.vue这个组件并且传hideBorder这个值，那么Nearby.vue中引用Shopinfo.vue的组件中就会有下划线

```html
      <Shopinfo
        v-for="item in nearbyList"
        :key="item.id"
        :item="item"
        :hideBorder="true" <-- 核心 -->
      />
```

返回上一个页面用router中的back方法即可：

```javascript
// 引入
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBackClick = () => {
  router.back() // 返回上一个页面
}
```

根据不同商店跳转到不同页面的实现：

```javascript
// 1、需要在router里进行设置：
path: '/shop/:id' 				// 在shop后面加上 /:id 

// 2、在router-link里面进行设置
:to="`/shop/${item.id}`"        // 因为to里面是JS表达式所以记得要在to前面加上:，里面用模板字符串
```

从useroute获取路由的一些信息：例如可以从useroute回去路由的id等，但这里有个细节就是，在定义路由的时候id用什么名字那么那么在用useroute下面params下面也要用id：

```javascript
    path: '/shop/:rush',  // 定义路由时用rush
        
// 引入
import { useRouter, useRoute } from 'vue-router'
// 实例化
const route = useRoute()
// 打印id
console.log(route.params.rush) // 定义路由时用的rush，因此获取时也用route.params.rush
```

在书写的时候还有一个不太好的地方就是，如果网速慢得情况下会出现劣图得情况带来的用户体验不太好，解决方案是在组件中加上v-if=“item.imgUrl”一条指令：（当imgUrl加载出来后才展示节点）

```html
<Shopinfo :item="item" v-show="item.imgUrl"/>
```

给循环的item绑定事件，并且事件会进行进行传参：

```html
        <div
          class="category__item"
          v-for="item in categories"
          :key="item.tab"
          @click="() => handleCategoryClick(item.tab)"
        >
          {{item.name}}
		</div>
<-- 在这个循环中绑定了事件，该事件是一个匿名箭头函数，只有点击了绑定的item才会执行这匿名函数，而匿名函数中会执行handleCategoryClick这个函数并且把参数传递过去，然后向参数的地址发送请求获取数据，这个写法极妙 -->
```

```javascript
    const getContentData = async (tab) => {
      const result = await get(`/api/shop/id/content/${tab}`, { tab })
      if (result.error === 0 && result.data.length) {
        data.contentList = result.data
      }
    }
    const handleCategoryClick = (tab) => {
      getContentData(tab)
    }
```

学了一个vs Code快捷键 Ctrl + D，全选一个内容

##### 路由守卫实现基础登录校验功能：

```js
// beforeEach是在每一次路由跳转之前都会执行的方法，to是要跳转到的路由，from是从那里跳转的，next就好比node.js中的一个中间件
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
// 该段代码就是如果没有登录而且跳转的页面不是登录页面也不是注册页面那么就跳转到登录页面
```

与之类似的还有一个：

```js
//   beforeEnter是在进入这个路由前执行的
{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login_123123" */ '../views/login/Login'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
// 这个是防止用户在登陆后再跳到登录页面，如果用户登陆了并且想跳转到登录界面，那么就让他跳转到Home页面
```

在路由里面还有一个动态加载的知识点：

```js
component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
// 就是按需加载，这样在进首页的时候速度就会快一些
```

Toast组件的开发：

```vue
<template>
    <div class="Toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.toastMessage = message
    toastData.show = true
    setTimeout(() => {
      toastData.toastMessage = ''
      toastData.show = false
    }, 2000)
  }

  const { show, toastMessage } = toRefs(toastData)

  return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped>
.Toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius:.05rem;
  color: #FFF;
}
</style>

```

使用方法：

```vue
// 在模板使用：
<Toast v-if="show" :message = "toastMessage"/>
// 在script中引入：
import Toast, { useToastEffect } from '../../components/Toast.vue'
在setup函数里调用:
const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
在所需地方调用：如：
showToast('用户名或密码不能为空')
```

商家详情部分：

点击不同商品分类时会发送不同的get请求，然后后端根据tab带的参数不同去数据库查不同的商品并将其返回回来，前端再根据后端返回的商品展示出来

购物车：



