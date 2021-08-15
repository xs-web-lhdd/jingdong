<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <div class="all">
      <div
        class="productsList"
        v-for="(item,index,z) in cartList"
        :key="z"
      >
        <!-- z是下标 -->
        <div v-if="alltotal[z] > 0" class="productsList__name">{{item.shopName}}</div>
          <div
            v-for="(inneritem,innerdex) in item.productList"
            :key="innerdex"
          >
            <div class="produce__item" v-if="inneritem.num">
              <img :src="inneritem.imgUrl" class="produce__item__img">
              <div class="produce__item__detail">
                <h4 class="produce__item__title">{{inneritem.name}}</h4>
                <p class="produce__item__price">
                  <span class="produce__item__price__single">
                      <span class="produce__item__yen">￥{{inneritem.price}} × {{inneritem.num}}</span>
                  </span>
                  <span class="produce__item__price__total">
                      <span class="produce__item__yen">&yen; {{(inneritem.price*inneritem.num).toFixed(2)}}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import { useStore } from 'vuex'
import Docker from '../home/Docker.vue'

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList
    // 通过数组收集每一项的shopId
    var a = []
    for (var i in cartList) {
      a.push(i)
    }
    // 通过数组以及刚刚收集的shopId得出每一商店对应货物的总数量（数组内每一项获取数量要和商店id在位置上要对应上）
    var alltotal = []
    for (var j in cartList) {
      const productList = cartList[j]?.productList
      let allNum = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (product.check) {
            allNum += product.num
          }
        }
      }
      alltotal.push(allNum)
    }
    // 将得到的含有商店商品总数量的数组导出去，然后根据index下标找到对应的商品总数量，根据总数量是否大于0来判断商店名称是否要展示

    return { cartList, alltotal }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #f8f8f8;
}
.title{
    position: relative;
    line-height: .44rem;
    background: #fff;
    font-size: .16rem;
    color: #333;
    text-align: center;
    font-family: PingFangSC-Regular;
}
.all{
  overflow-y: scroll;
  position: absolute;
  top: .45rem;
  right: 0;
  bottom: .5rem;
  left: 0;
}
.productsList{
  width: 3.39rem;
  background: #FFFFFF;
  border-radius: .04rem;
  margin: .16rem .18rem;
  &__name{
    margin-left: .16rem;
    padding-top: .16rem;
    font-family: PingFangSC-Medium;
    font-size: .16rem;
    color: #333333;
  }
}

.produce{
    position: absolute;
    top: 1.9rem;
    bottom: .5rem;
    left: 0;
    right: 0;
    margin: .16rem .18rem .2rem .18rem;
    // background-color: red;
    overflow-y: scroll;
    &__item{
        position: relative;
        display: flex;
        padding: .16rem .16rem .16rem .16rem;
        background-color: #fff;
        &__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__detail{
            flex: 1;
            overflow: hidden;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        &__price{
            display: flex;
            margin: .06rem 0 0 0;
            line-height: .22rem;
            font-size: .14rem;
            color: #e93b3b;
            &__total{
                flex: 1;
                text-align: right;
                color: #000;
            }
            &__yen{
                font-size: .12rem;
            }
        }
    }
}
</style>
