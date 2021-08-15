<template>
    <div class="produce">
        <div class="produce__title">{{shopName}}</div>
        <div
          class="produce__list"
          v-for="item in productList"
          :key="item.id"
        >
            <div class="produce__item" v-if="item.num > 0" >
                <img :src="item.imgUrl" class="produce__item__img">
                <div class="produce__item__detail">
                  <h4 class="produce__item__title">{{item.name}}</h4>
                  <p class="produce__item__price">
                    <span class="produce__item__price__single">
                        <span class="produce__item__yen">{{item.price}} × {{item.num}}</span>
                    </span>
                    <span class="produce__item__price__total">
                        <span class="produce__item__yen">&yen;{{(item.price*item.num).toFixed(2)}}</span>
                    </span>
                  </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../shop/commonCartEffect'

export default {
  name: 'OrderProductList',
  setup () {
    //   店铺id
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
.produce{
    position: absolute;
    top: 1.9rem;
    bottom: .5rem;
    left: 0;
    right: 0;
    margin: .16rem .18rem .2rem .18rem;
    // background-color: red;
    overflow-y: scroll;
    &__title{
        padding: .16rem .16rem 0 .16rem;
        font-size: .16rem;
        color: #333;
        background-color: #fff;
    }
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
            line-height: .2rem;
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
