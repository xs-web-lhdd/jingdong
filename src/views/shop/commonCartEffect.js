import { useStore } from 'vuex'
import { toRefs, computed } from 'vue'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    // 同步修改数据
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(() => {
    const productList = cartList.value[shopId]?.productList || []
    return productList
  })

  // 获取店铺名称
  const shopName = computed(() => {
    const shopName = cartList.value[shopId]?.shopName || ''
    return shopName
  })

  // const total = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let allNum = 0
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       if (product.check) { // 如果选中了再加个数，否则是不会在购物车加个数的
  //         allNum += product.num
  //       }
  //     }
  //   }
  //   return allNum
  // })
  // console.log(total)

  return { cartList, changeCartItemInfo, productList, shopName }
}
