<template>
    <div class="position">
      <span class="iconfont position__icon">&#xe604;</span>
      河南理工大学计算机学院2楼206
      <span class="iconfont position__bell">&#xe6bb;</span>
    </div>
    <div class="search">
      <span class="iconfont search__search">&#xe630;</span>
      <input class="search__search__input" @click="handleChangeSearchPage" type="text" placeholder="山姆会员优惠商铺">
    </div>
    <div class="banner">
      <Swiper />
    </div>
    <div class="icons" @click="handleEnterMaket">
      <div
        class="icons__item"
        v-for="(item,index) in StaticPartList"
        :key="index"
      >
        <img class="icons__item__img"
          :src="item.imgUrl"
          :title="item.text"
        >
        <p class="icons__item__desc">{{item.text}}</p>
      </div>
    </div>
    <div class="gap"></div>
    <Toast v-if="show" :message = "toastMessage"/>
</template>

<script>
import { useRouter } from 'vue-router'
// 引入弹框组件
import Toast, { useToastEffect } from '../../components/Toast.vue'
// 引入Swiper组件
import Swiper from '../../components/Swiper.vue'

const StaticPartList = [
  { imgUrl: 'http://localhost:3000/images/shop/超市.png', text: '超市便利' },
  { imgUrl: 'http://localhost:3000/images/shop/菜市场.png', text: '菜市场' },
  { imgUrl: 'http://localhost:3000/images/shop/水果店.png', text: '水果店' },
  { imgUrl: 'http://localhost:3000/images/shop/鲜花.png', text: '鲜花绿植' },
  { imgUrl: 'http://localhost:3000/images/shop/医药健康.png', text: '医药健康' },
  { imgUrl: 'http://localhost:3000/images/shop/家居.png', text: '家居时尚' },
  { imgUrl: 'http://localhost:3000/images/shop/蛋糕.png', text: '烘焙蛋糕' },
  { imgUrl: 'http://localhost:3000/images/shop/签到.png', text: '签到' },
  { imgUrl: 'http://localhost:3000/images/shop/大牌免运.png', text: '大牌免运' },
  { imgUrl: 'http://localhost:3000/images/shop/鲜花.png', text: '超市便利' }
]
// 点击进入搜索页面
const useChangeSearchEffect = () => {
  const route = useRouter()
  const handleChangeSearchPage = () => {
    route.push({ name: 'Search' })
  }
  return { handleChangeSearchPage }
}

export default {
  name: 'StaticPart',
  components: { Toast, Swiper },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
    const handleEnterMaket = () => {
      showToast('该模块尚未开放')
    }
    const { handleChangeSearchPage } = useChangeSearchEffect()
    return { StaticPartList, handleEnterMaket, show, toastMessage, handleChangeSearchPage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/fontsize.scss';
.position {
  color:$content-fontsize;
  overflow: hidden;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  .position__icon{
    font-size: .18rem;
  }
  .position__bell{
    position: absolute;
    top: .16rem;
    right: 0;
    padding-right: .2rem;
    font-size: .2rem;
  }
}

.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  background-color: #F5F5F5;
  color: #B7B7B7;
  border-radius: .16rem;
  height: .32rem;
  font-size: .14rem;
  &__search{
    padding: 0 .08rem 0 .12rem;
    display: inline-block;
    font-size: .16rem;
    &__input{
      width: 83%;
      background-color: #F5F5F5;
      outline: none;
      border: none;
      line-height: .3rem;
      color:#333;
    }
  }
}

.banner {
  // 三行代码防抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; // 撑开屏幕宽度的25.4% 就不会抖动了
  // 三行代码防抖动
  &__img{
    width: 100%;
  }
}

.icons {
  color: $content-fontsize;
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
    }
  }
}
.gap{
  height: .1rem;
  margin: 0 -.18rem;
  background-color: $content-bgcolor;
}
</style>
