<template>
    <div
      class="mask"
      v-if="showCart && total > 0"
      @click="handleCartShowChange"
    ></div>
    <div class="cart">
      <div class="produce"  v-if="showCart && total > 0">
        <div class="produce__header">
          <div
            class="produce__header__all"
            @click="() => setCartItemsChecked(shopId)"
          >
            <span
              class="produce__header__all__icon iconfont"
              v-html="allChecked ? '&#xe6f9;' : '&#xe60c;'"
            ></span>
            全选
          </div>
          <div
            class="produce__header__clear iconfont"
          >
            <span
              class="produce__header__clear__btn iconfont"
              @click="() => clearCartProduces(shopId)"
            >&#xed44;清空购物车</span>
          </div>
        </div>
        <template
          v-for="(item) in productList"
          :key="item._id"
        >
          <div v-if="item.num > 0" class="produce__item" >
            <div
              class="produce__item__checked iconfont"
              v-html="item.check ? '&#xe6f9;' : '&#xe60c;'"
              @click="() => changeCartItemCheck(shopId, item._id)"
            >
            </div>
            <img :src="item.imgUrl" class="produce__item__img">
            <div class="produce__item__detail">
              <h4 class="produce__item__title">{{item.name}}</h4>
              <p class="produce__item__price">
                <span class="produce__item__yen">&yen;{{item.price}}</span>
                <span class="produce__item__origin">&yen;{{item.oldPrice}}</span>
              </p>
            </div>
            <div class="produce__number">
              <span
                class="produce__number__minus"
                @click="() => { changeCartItemInfo(shopId, item.id, item, 0) }"
              >-</span>
              <!-- 因为这里已经有item.num了所以直接用item.num就可以了，  0 就是减函数，1 就是加函数 -->
              {{item.num || 0}}
              <span
                class="produce__number__plus"
                @click="() => { changeCartItemInfo(shopId, item.id, item, 1) }"
              >+</span>
            </div>
          </div>
        </template>
      </div>
      <div class="check">
        <div class="check__icon">
          <img src="http://localhost:3000/images/shop/basket.png" class="check__icon__img" @click="handleCartShowChange"  title="购物车">
          <div class="check__icon__tag">{{total}}</div>
        </div>
        <div class="check__price">总结：
          <span class="check__price__number">&yen; {{allPrice}}</span>
        </div>
        <div class="check__all" v-if="total">
          <router-link :to="{path: `/orderConfirmation/${shopId}`}">
            去结算
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

// 购物总数量和钱数总和相关逻辑代码
const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let allNum = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) { // 如果选中了再加个数，否则是不会在购物车加个数的
          allNum += product.num
        }
      }
    }
    return allNum
  })
  const allPrice = computed(() => {
    const productList = cartList[shopId]?.productList
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

  // 是否所有都被选中
  const allChecked = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.num > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })
  // 点击全部不选中
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })

  const changeCartItemCheck = (shopId, productId) => {
    // 同步修改数据
    console.log(productId)
    store.commit('changeCartItemCheck', {
      shopId, productId
    })
  }
  const clearCartProduces = (shopId) => {
    store.commit('clearCartProduces', { shopId })
  }
  return { total, allPrice, productList, changeCartItemCheck, clearCartProduces, allChecked, setCartItemsChecked }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { total, allPrice, cartList, productList, changeCartItemCheck, clearCartProduces, allChecked, setCartItemsChecked } = useCartEffect(shopId)
    const { changeCartItemInfo } = useCommonCartEffect(shopId)
    return { shopId, total, allPrice, cartList, productList, changeCartItemCheck, clearCartProduces, allChecked, setCartItemsChecked, showCart, handleCartShowChange, changeCartItemInfo }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1;
}
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
}
.check{
  display: flex;
  height: .49rem;
  border-top: .01rem solid #f1f1f1;
  line-height: .49rem;
  &__icon{
    position: relative;
    width: .84rem;
    &__img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag{
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: #e93b3b;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__price{
    flex: 1;
    color: #333;
    font-size: .12rem;
    &__number{
      line-height: .49rem;
      color: #e93b3b;
      font-size: .18rem;
    }
  }
  &__all{
    width: .98rem;
    background-color: #0091ff;
    text-align: center;
    font-size: .14rem;
    a{
      text-decoration: none;
      color: #fff;
    }
  }
}
.produce{
    flex: 1;
    overflow-y: scroll;
    background-color: #FFF;
    &__header{
      display: flex;
      line-height: .5rem;
      border-bottom: .01rem solid #F1F1F1;
      font-size: .14rem;
      color: #333;
      &__all{
        width: 1.4rem;
        &__icon{
          display: inline-block;
          margin: 0 .16rem 0 .16rem;
          vertical-align: top;
          color: #0091ff;
          font-size: .2rem;
        }
      }
      &__clear{
        flex: 1;
        // width: 1rem;
        margin-right: .16rem;
        text-align: right;
        font-size: .14rem;
        &__btn{
          display: inline-block;
        }
      }
    }
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #E1E1E1;
        &__detail{
            overflow: hidden;
        }
        &__checked{
          height: .5rem;
          line-height: .5rem;
          margin-right: .2rem;
          font-size: .2rem;
          color: #0091FF;
        }
        &__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .12rem;
            color: #333;
            @include ellipsis;
        }
        &__price{
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .12rem;
            color: #E93B3B;
        }
        &__yen{
            font-size: 0.12rem;
        }
        &__origin{
            line-height: .2rem;
            font-size: .12rem;
            color: #999;
            text-decoration: line-through;
            margin-left: .12rem;
        }
    }
    &__number{
        position: absolute;
        right: 0;
        bottom: .26rem;
        line-height: .18rem;
        &__minus,&__plus{
            display: inline-block;
            width: .12rem;
            height: .12rem;
            border-radius: 50%;
            text-align: center;
            line-height: .10rem;
        }
        &__minus{
            border: .01rem solid #666;
            color: #666;
            margin-right: .05rem;
        }
        &__plus{
            margin-left: 0.05rem;
            background-color: #0091FF;
            color: #fff;
            border: 0.01rem solid #0091FF;
        }
    }
}
</style>
