<template>
<div>
    <div class="shade" v-if="showSuccess || showError"></div>
    <div class="order">
        <div class="order__price">实付金额<b>￥ {{allPrice}}</b></div>
        <div
          class="order__btn"
          @click="() => handleSubmitClick(true)"
        >提交订单</div>
    </div>
    <div
      class="mask"
      v-if="showConfirm"
      @click="() => handleSubmitClick(false)"
    >
      <div class="mask__content" @click.stop >
        <div class="mask__content__title">确认离开收银台吗？</div>
        <p class="mask__content__desc">请尽快完成支付</p>
        <div class="mask__content__btns">
          <div
            class="mask__content__btn--first"
            @click="handleConfirmOrder(true);handleErrorOrder(true)"
          >取消订单</div>
          <div
            class="mask__content__btn--last"
            @click="handleConfirmOrder(false);handleSuccessOrder(true)"
          >确认支付</div>
        </div>
      </div>
    </div>
<!-- 提交成功弹窗 -->
    <div class="success" v-if="showSuccess">
      <div class="success__success iconfont">&#xe60a;</div>
      <div class="success__title">订单提交成功</div>
    </div>
<!-- 提交失败弹窗 -->
    <div class="success" v-if="showError">
      <div class="success__success iconfont">&#xe7da;</div>
      <div class="success__title">订单取消成功</div>
    </div>
</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { post, get } from '../../utils/request'
import { useCommonCartEffect } from '../shop/commonCartEffect'

// 和下单有关的逻辑
const useMakeOrderEffect = (shopId) => {
  const router = useRouter()
  const store = useStore()
  const { cartList, shopName, productList } = useCommonCartEffect(shopId)
  // 111111111111111111111111111111111111111
  // 获取当前地址 --- 发送订单的时候带上该地址
  const userMessage = ref([])
  const getAddress = async () => {
    const result = await get('/api/user/address/')
    if (result.error === 0 && result.length !== 0) {
      userMessage.value = result.data
    }
  }
  getAddress()
  // 1111111111111111111111111111111111111111111
  // 确认、取消订单
  console.log(productList)
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      // products.push({ id: productList.value[i].id, num: productList.value[i].num })
      // 如果直接提交会有小bug：当在购物时对商品先从零加1，再从1减到0，这个按理说该商品的id和num不应该被提交过去，但它会提交过去，而且提交时的num为0，因此加上一个判断语句能防止bug出现
      if (productList.value[i].num > 0) {
        products.push({ id: productList.value[i]._id, num: productList.value[i].num })
      }
    }
    console.log(shopId)
    try {
      const result = await post('/api/order', {
        addressId: userMessage.value[0],
        shopId: shopId, // 将字符串转化为数字
        shopName: shopName.value, // shopName是计算属性，需要从value中拿到名字，可以自己打印shopName出来看看
        isCanceled: isCanceled,
        products
      })
      // console.log('发送订单信息', result)
      if (result.error === 0) {
        // // store.commit('clearCartProduces', { shopId }) // 派发清除购物车的逻辑
        // store.commit('clearCartList', { shopId }) // 逻辑跟清除购物车一样
        setTimeout(() => {
          router.push({ name: 'OrderList' })
          // store.commit('clearCartProduces', { shopId }) // 派发清除购物车的逻辑
          store.commit('clearCartList', { shopId }) // 逻辑跟清除购物车一样
        }, 2000)
      }
    } catch (e) {
      // showToast('下单失败')
    }
  }

  return { handleConfirmOrder, cartList }
}

// 是否展示mask相关逻辑
const useShowConfirmEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (value) => {
    showConfirm.value = value
  }
  const showSuccess = ref(false)
  const handleSuccessOrder = (value) => {
    showSuccess.value = value
    showConfirm.value = !showConfirm.value
  }
  const showError = ref(false)
  const handleErrorOrder = (value) => {
    showError.value = value
    showConfirm.value = !showConfirm.value
  }

  return { showConfirm, handleSubmitClick, handleSuccessOrder, showSuccess, showError, handleErrorOrder }
}

export default {
  name: 'OrderResult',
  setup () {
    // 店铺id
    const route = useRoute()
    const shopId = route.params.id

    // 实付金额
    const allPrice = computed(() => {
      const productList = cartList.value[shopId]?.productList
      // console.log(productList)
      let Price = 0
      if (productList) { // 如果选中了再加钱数，否则是不会在购物车加钱数的
        for (const i in productList) {
          const product = productList[i]
          if (product.check) {
            Price += (product.num * product.price)
          }
        }
      }
      return Price.toFixed(2) // 小数点后精确2位
    })

    const { handleConfirmOrder, cartList } = useMakeOrderEffect(shopId)
    const { showConfirm, handleSubmitClick, handleSuccessOrder, showSuccess, showError, handleErrorOrder } = useShowConfirmEffect()
    return { allPrice, handleConfirmOrder, showConfirm, handleSubmitClick, handleSuccessOrder, showSuccess, showError, handleErrorOrder }
  }
}
</script>

<style lang="scss" scoped>
.shade{
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}
.order{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: .49rem;
    line-height: .49rem;
    background-color: #fff;
    &__price{
        flex: 1;
        height: 100%;
        text-indent: .24rem;
        font-size: .14rem;
        // text-align: center;
        color: #333;
        // border: #fff solid .01rem;
    }
    &__btn{
        width: .98rem;
        font-size: .14rem;
        background-color: #4FB0F9;
        color: #fff;
        text-align: center;
        border: none;
    }
}

.mask{
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.5rem;
    background-color: #fff;
    text-align: center;
    border-radius: .1rem;
    &__title{
      margin-top: .24rem;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }
    &__desc{
      margin-top: .08rem;
      font-size: .14rem;
      color: #666;
    }
    &__btns{
      display: flex;
      margin: .24rem .58rem 0 .58rem;
    }
    &__btn{
      flex: 1;
      &--first{
        width: .8rem;
        height: .32rem;
        line-height: .32rem;
        border: .01rem solid #4FB0F9;
        border-radius: .16rem;
        margin-right: .2rem;
        color: #4FB0F9;
        font-size: .14rem;
      }
      &--last{
        width: .8rem;
        height: .32rem;
        line-height: .32rem;
        border: .01rem solid #4FB0F9;
        border-radius: .16rem;
        margin-left: .2rem;
        background-color: #4FB0F9;
        color: #fff;
        font-size: .14rem;
      }
    }
  }
}
.success{
  position: absolute;
  width: 3.01rem;
  height: 1.56rem;
  background-color: #fff;
  // background-color: red;
  border-radius: .04rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  &__error{
    position: absolute;
    top: .1rem;
    right: .1rem;
    font-size: .14rem;
    color: #666;
  }
  &__success{
    padding: .42rem 1.28rem .24rem 1.29rem;
    font-size: .3rem;
    line-height: .32rem;
  }
  &__title{
    text-align: center;
    line-height: .25rem;
    font-family: PingFangSC-Medium;
    font-size: .18rem;
    color: #333333;
  }
}
</style>
