<template>
    <div class="top">
      <div class="top__header">
          <div
            class="top__header__back iconfont"
            @click="handleBackClick"
          >&#xe600;</div>
          确认订单
      </div>
      <div class="top__receiver">
          <div class="top__receiver__title">收货地址</div>
          <div class="top__receiver__address" v-if="userMessage[0]">{{userMessage[0].city + userMessage[0].department + userMessage[0].houseNumber}}</div>
          <div class="top__receiver__info">
            <span class="top__receiver__info__name" v-if="userMessage[0]" >{{ userMessage[0].name}}（先生）</span>
            <span class="top__receiver__info__name" v-if="userMessage[0]">{{userMessage[0].phone}}</span>
          </div>
          <span class="top__receiver__enter iconfont" @click="handleChangeAddress">&#xe602;</span>
      </div>
    </div>
</template>

<script>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { get } from '../../utils/request'
import { getUserOrderAddress } from './getUserOrderAddress'

export default {
  name: 'OrderTopToast',
  setup () {
    // 返回上一个页面
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    const handleChangeAddress = () => {
      router.push({ name: 'Address' })
    }
    // 从数据库中取出收货地址---默认是收货地址列表的第一个
    const { userMessage } = getUserOrderAddress()
    return { handleBackClick, handleChangeAddress, userMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg ,rgba(0,145,255,0) 4%,#0091ff 50%);
    background-repeat: no-repeat;
    &__header {
      position: relative;
      padding-top: .2rem;
      line-height: .24rem;
      color: #fff;
      text-align: center;
      font-size: .16rem;
      &__back {
          position: absolute;
          left: .18rem;
          font-size: .22rem;
      }
    }
    &__receiver{
      position: absolute;
      left: .18rem;
      right: .18rem;
      bottom: 0;
      height: 1.11rem;
      background: #fff;
      border-radius: .04rem;
        &__title{
            line-height: .22rem;
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: #333;
        }
        &__address{
            line-height: .2rem;
            padding: 0 .4rem 0 .16rem;
            font-size: .14rem;
            color: #333;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            @include ellipsis;
        }
        &__info{
            padding: .06rem 0 0 .16rem;
            &__name{
                margin-right: .06rem;
                line-height: .18rem;
                font-size: .12rem;
                color: #666;
            }
        }
        &__enter {
            position: absolute;
            right: .16rem;
            top: .5rem;
            color: #666;
            font-size: .2rem;
        }
    }
}
</style>
