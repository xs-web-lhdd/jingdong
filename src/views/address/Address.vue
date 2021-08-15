<template>
    <div class="wrapper">
        <div class="title">
            <div class="title__icon iconfont" @click="handleBackClick()">&#xe600;</div>收货地址
            <div class="title__new" @click="handleNewAddress()">新建</div>
        </div>
        <div
          class="address"
          v-for="item in userMessage"
          :key="item.id"
        >
            <div class="address__info">
                <div class="address__info__user">{{item.name}}</div>
                <div class="address__info__phone">{{item.phone}}</div>
            </div>
            <div class="address__detail">{{item.city+item.department+item.houseNumber}}</div>
            <router-link :to="`/address/ChangeAddress/${item._id}`">
              <div class="address__icon iconfont" >&#xe602;</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

// 获取地址列表页面
const useGetAddressEffect = () => {
  const userMessage = ref([])
  const getuserAddress = async () => {
    const result = await get('/api/user/address/')
    if (result.error === 0 && result.length !== 0) {
      userMessage.value = result.data
    }
  }
  getuserAddress()
  return { getuserAddress, userMessage }
}
export default {
  name: 'Address',
  setup () {
    const { getuserAddress, userMessage } = useGetAddressEffect()
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    // 跳转页面
    const handleNewAddress = () => {
      router.push({ name: 'NewAddress' })
    }
    return { handleBackClick, handleNewAddress, userMessage, getuserAddress }
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
    // background-color: red;
}
.title{
    position: relative;
    line-height: .44rem;
    background: #fff;
    font-size: .16rem;
    color: #333;
    text-align: center;
    font-family: PingFangSC-Regular;
    &__icon{
        position: absolute;
        left: .18rem;
        top: 0;
        font-size: .2rem;
    }
    &__new{
        position: absolute;
        top: 0;
        right: .18rem;
    }
}
.address{
    position: relative;
    margin: .16rem .18rem 0 .18rem;
    padding: .18rem .64rem .18rem .16rem;
    background: #fff;
    border-radius: .04rem;
    &__info{
        display: flex;
        line-height: .2rem;
        font-size: .14rem;
        color: #999;
        &__user{
            width: .94rem;
        }
        &__phone{
            flex: 1;
        }
    }
    &__detail{
        margin-top: .08rem;
        line-height: .2rem;
        font-size: .14rem;
        color: #333;
    }
    &__icon{
        position: absolute;
        right: .2rem;
        top: .31rem;
        font-size: .2rem;
        color: #999;
    }
}
</style>
