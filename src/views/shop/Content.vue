<template>
  <div class="content">
    <div class="category">
        <div
          class="category__item"
          :class="{'category__item': true, 'category__item--active': currentTab === item.tab ? true : false}"
          v-for="item in categories"
          :key="item.tab"
          @click="() => handleTabClick(item.tab)"
        >
          {{item.name}}
        </div>
    </div>
    <div class="produce">
        <div
          class="produce__item"
          v-for="(item) in list"
          :key="item.id"
        >
            <img :src="item.imgUrl" class="produce__item__img">
            <div class="produce__item__detail">
              <h4 class="produce__item__title">{{item.name}}</h4>
              <p class="produce__item__sales">月售{{item.sales}}件</p>
              <p class="produce__item__price">
                <span class="produce__item__yen">&yen;{{item.price}}</span>
                <span class="produce__item__origin">&yen;{{item.oldPrice}}</span>
              </p>
            </div>
            <div class="produce__number">
              <span
                class="produce__number__minus"
                @click="() => { changeCartItem(shopId, item._id, item, 0, shopName) }"
              >-</span>
              <!-- 刚开始找不到所以默认为0 -->
              {{cartList?.[shopId]?.productList?.[item._id]?.num || 0}}
              <span
                class="produce__number__plus"
                @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }"
              >+</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from './commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruits' },
  { name: '休闲食品', tab: 'food' },
  { name: '时令蔬菜', tab: 'vegetable' },
  { name: '肉蛋家禽', tab: 'meat' }
]

// 和 tab 切换的相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab) // 默认currntTab是全部商品
  const handleTabClick = (tab) => { // 随着点击不同的列表currentTab发生切换（这里的tab是由外部传递进去的）
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取商品列表
const useCurrentListEffect = (currentTab, shopId) => {
  // 对应商铺的内容
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value }) // tab 是get请求url后面携带的参数
    if (result.error === 0 && result.data.length) {
      content.list = result.data
    }
  }
  // 当首次页面进行加载以及监听的数据发生变化时就会执行 --- 巧妙
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

// 购物车相关内容
const useCartEffect = () => {
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  return { cartList, changeShopName, changeCartItem }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id // 获取商店对应的id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem } = useCartEffect()
    return { shopId, cartList, changeCartItem, categories, currentTab, handleTabClick, list }
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content{
    display: flex;
    position: absolute;
    top: 1.3rem;
    right: 0;
    bottom: .5rem;
    left: 0;
}
.category{
    overflow-y: scroll;
    width: .66rem;
    background-color: #F5F5F5;
    height: 100%;
    &__item{
        text-align: center;
        line-height: .4rem;
        font-size: .14rem;
        color: #333;
        &--active{
            background-color: #fff;
        }
    }
}
.produce{
    flex: 1;
    overflow-y: scroll;
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #E1E1E1;
        &__detail{
            overflow: hidden;
        }
        &__img{
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
            @include ellipsis;
        }
        &__sales{
            margin: .06rem 0;
            font-size: .12rem;
            line-height: .2rem;
            color: #333;
        }
        &__price{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
        }
        &__yen{
            font-size: .12rem;
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
        bottom: .12rem;
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
