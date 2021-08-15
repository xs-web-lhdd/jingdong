import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  // 存到localstorage中，做持久存储
  const cartListString = JSON.stringify(cartList) // 存localstorage必须用字符串格式
  localStorage.cartList = cartListString
}

const getLocalStorage = () => {
  // 防止localStorage.cartList为空时对空进行JSON.parse转化时报错
// 第一种处理方式（对JSON常用的一种）
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (e) {
    return {}
  }
// 第二种if命令
  // if (localStorage.cartList) {
  //   return JSON.parse(localStorage.cartList)
  // } else {
  //   return {}
  // }
}

export default createStore({
  state: {

    cartList: getLocalStorage()
    // cartList: {
    //   shopId: {
    //     shopName: '',
    //     productList: {
    //       product: {
    //         id: '3',
    //         name: '黄橙子250g/份',
    //         imgUrl: 'http://www.dell-lee.com/imgs/vue3/orange.png',
    //         sales: 10,
    //         price: 33.6,
    //         oldPrice: 39.6,
    //         num: 0
    //       }
    //     }
    //   }
    // }

  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      // console.log(shopId, productId, productInfo)
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.num = 0
      }
      // 判断是加还是减
      if (product.num < 99) { // 限制最大数量是99个
        if (num === 1) {
          product.num += 1
          // 如果点加号，那么购物车里面商品数量一定不为0，那么就要让其处于被选中的状态
          product.check = true// 控制图标是否展示（Cart页面会根据值的不同返回不同icon）
        }
      }
      if (num === 0) {
        // 如果为0就不减，只有不为0时才减
        if (product.num !== 0) {
          product.num -= 1
        }
      }

      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      // 防止开始时数据为空而不存在报错
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      // 更新数据
      state.cartList[shopId] = shopInfo
      // console.log(state.cartList)
      setLocalCartList(state)
    },
    // 改变是否选中逻辑内容
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      // console.log(shopId, productId)
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清除购物车
    clearCartProduces (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      for (const i in products) {
        const product = products[i]
        product.check = true
      }
      setLocalCartList(state)
    },
    // 提交订单或取消订单后清除订单（逻辑比清除购物车一样多了一个清除店铺名称）
    clearCartList (state, payload) {
      const { shopId } = payload
      // console.log(state.cartList[shopId])
      state.cartList[shopId].productList = {}
      state.cartList[shopId] = ''
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
