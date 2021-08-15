import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home'
// import Shop from '../views/shop/Shop'
// import Login from '../views/login/Login'
// import Register from '../views/register/Register'

const routes = [
  {
    path: '/',
    name: 'Home',
    // 动态组件
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/cartList',
    name: 'CartList',
    // 动态组件
    component: () => import(/* webpackChunkName: "cartlist" */ '../views/cartList/CartList')
  },
  {
    path: '/search/Search',
    name: 'Search',
    // 动态组件
    component: () => import(/* webpackChunkName: "search" */ '../views/search/Search')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    // 动态组件
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/mine/Mine',
    name: 'Mine',
    // 动态组件
    component: () => import(/* webpackChunkName: "mine" */ '../views/mine/Mine')
  },
  {
    path: '/changemes/Changemes',
    name: 'Changemes',
    // 动态组件
    component: () => import(/* webpackChunkName: "changemes" */ '../views/changemes/Changemes')
  },
  {
    path: '/servicer/Servicer',
    name: 'Servicer',
    // 动态组件
    component: () => import(/* webpackChunkName: "servicer" */ '../views/servicer/Servicer')
  },
  {
    path: '/address/Address',
    name: 'Address',
    // 动态组件
    component: () => import(/* webpackChunkName: "address" */ '../views/address/Address')
  },
  {
    path: '/address/NewAddress',
    name: 'NewAddress',
    // 动态组件
    component: () => import(/* webpackChunkName: "newaddress" */ '../views/address/NewAddress')
  },
  {
    path: '/address/ChangeAddress/:id',
    name: 'ChangeAddress',
    // 动态组件
    component: () => import(/* webpackChunkName: "changeaddress" */ '../views/address/ChangeAddress')
  },
  { // 订单路由
    path: '/orderList',
    name: 'OrderList',
    // 动态组件
    component: () => import(/* webpackChunkName: "orderlist" */ '../views/orderList/OrderList')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register_123123" */ '../views/register/Register'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
