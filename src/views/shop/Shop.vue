<template>
  <div class="wrapper">
    <!-- 顶部搜索框 -->
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick"
      >&#xe600;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe630;</span>
        <input class="search__content__input" @click="handleChangeSearchPage" placeholder="请输入商品名称" />
      </div>
    </div>
    <!-- 中间商铺信息区域 -->
    <Shopinfo :item="item" v-show="item.imgUrl"/>
    <!-- 商铺详情 -->
    <Content :shopName="item.name"/>
    <!-- 底部结算 -->
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Shopinfo from '../../components/Shopinfo.vue'
import { get } from '../../utils/request'
import Content from '../shop/Content.vue'
import Cart from '../shop/Cart.vue'

// Shopinfo相关逻辑代码（获取当前商铺信息）
const useShopinfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result.error === 0 && result.data) {
      // 这里通过data的不同下标获取不同的数据
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
// handleBack（点击后退）相关逻辑代码
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
// 点击进入搜索页面
const useChangeSearchEffect = () => {
  const route = useRouter()
  const handleChangeSearchPage = () => {
    route.push({ name: 'Search' })
  }
  return { handleChangeSearchPage }
}

export default {
  name: 'Shop',
  components: { Shopinfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopinfoEffect()
    getItemData()
    const { handleBackClick } = useBackRouterEffect()
    const { handleChangeSearchPage } = useChangeSearchEffect()
    return { item, handleBackClick, handleChangeSearchPage }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 0.1rem .2rem;
}
.search{
  display: flex;
  margin: .04rem 0 .04rem 0;
  line-height: .32rem;
  &__back{
    width: .3rem;
    height: .32rem;
    line-height: .32rem;
    font-size: .2rem;
    color: #B6B6B6;
  }
  &__content{
    display: flex;
    flex: 1;
    line-height: .32rem;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon{
      width: .44rem;
      // background-color: blue;
      text-align: center;
      font-size: .2rem;
      color: #B7B7B7;
    }
    &__input{
      padding-right: .2rem;
      width: 100%;
      display: block;
      height: .3rem;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
      color: #333;
      &::placeholder{
        color: #333;
      }
    }
  }
}
</style>
