<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
        <div class="order" v-for="(item,index) in list" :key="index">
          <div class="order__title">{{item.shopName}}
              <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
          </div>
          <div class="order__content">
              <div class="order__content__imgs">
                <template
                  v-for="(item,innerindex) in item.products"
                  :key="innerindex"
                >
                  <img
                  class="order__content__img"
                  :src="item.product.imgUrl"
                  v-if="innerindex < 4"
                >
                </template>
              </div>
              <span class="order__content__info">
                  <div class="order__content__price">￥{{item.allPrice.toFixed(2)}}</div>
                  <div class="order__content__num">共{{item.allNum}}件</div>
              </span>
          </div>
        </div>
    </div>
    <div class="pay" v-if="list.length > 0" @click="() => handlePayClick(true)">点击支付</div>
  </div>
  <div class="mask" v-if="payResult" @click.self="() => handlePayClick(false)">
    <div class="mask__content">
      <span class="mask__content__say iconfont">&#xe618;欢迎添加店主微信进行支付</span>
      <img src="../../assets/微信支付.png" class="mask__content__business">
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/reactivity'
import { get } from '../../utils/request'
import Docker from '../home/Docker.vue'

// 处理订单逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getorderlist = async () => {
    const result = await get('/api/order')
    // console.log(result)
    data.list = result.data
    if (result.error === 0 && result.length !== 0) {
      // 将附件商家的数据列表进行更新---用get到的数据进行替换
      const productList = result.data
      // <--- 订单总件数和钱数求和
      productList.forEach(element => {
        let allNum = 0
        let allPrice = 0
        const products = element.products || []
        // console.log(products)
        products.forEach(element => {
          allNum += (element?.orderSales || 0)
          allPrice += ((element?.product?.price * element?.orderSales) || 0)
        })
        element.allPrice = allPrice
        element.allNum = allNum
      })
      // 订单 --->
    }
  }
  getorderlist()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    const payResult = ref(false)
    const handlePayClick = (value) => {
      payResult.value = value
    }
    return { list, payResult, handlePayClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: rgb(248, 248, 248)
//   padding: 0 .18rem .2rem .18rem;
}
.title{
    line-height: .44rem;
    background-color: #fff;
    font-size: .16rem;
    color: #333;
    text-align: center;
}
.order{
  padding: .16rem;
  margin: .16rem .18rem;
  background: #fff;
  &__title{
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .14rem;
    color: #333;
  }
  &__status{
    float: right;
    font-size: .14rem;
    color: #999;
  }
  &__content{
    display: flex;
    &__imgs{
      display: flex;
    }
    &__img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info{
      position: absolute;
      right: .21rem;
      display: inline-block;
      width: .7rem;
      text-align: center;
    }
    &__price{
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: #E93B3B;
    }
    &__num{
      font-size: .12rem;
      color: #333;
      text-align: center;
    }
  }
}
.pay {
  width: 3.39rem;
  height: .3rem;
  background-color: #0091ff;
  margin: 0 auto;
  border-radius: .2rem;
  text-align: center;
  line-height: .3rem;
  color: #fff;
}
.mask{
  position: absolute;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
  &__content{
    width: 2.5rem;
    height: 1.5rem;
    background-color: #fff;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: .06rem;
    &__say{
      display: inline-block;
      font-size: .14rem;
      margin: .1rem 0;
      width: 100%;
      text-align: center;
      color: red;
    }
    &__business{
      display: block;
      width: 1rem;
      height: 1rem;
      margin: 0 auto;
    }
  }
}

</style>
