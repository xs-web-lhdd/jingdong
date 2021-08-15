<template>
    <div class="wrapper">
        <div class="title">
            <div class="title__icon iconfont" @click="handleBackClick()">&#xe600;</div>编辑收货地址
            <div class="title__save" @click="createAddress">保存</div>
        </div>
        <div class="form">
            <div class="form__item">
                <div class="form__item__label">所在城市：</div>
                <input type="text" class="form__item__content" v-if="userMessage" v-model.lazy="city"   :placeholder="userMessage.city">
            </div>
            <div class="form__item">
                <div class="form__item__label">小区/大厦/学校：</div>
                <input type="text" class="form__item__content" v-if="userMessage" v-model.lazy="department" :placeholder="userMessage.department">
            </div>
            <div class="form__item">
                <div class="form__item__label">楼号-门牌号：</div>
                <input type="text" class="form__item__content" v-if="userMessage" v-model.lazy="houseNumber" :placeholder="userMessage.houseNumber">
            </div>
            <div class="form__item">
                <div class="form__item__label">收货人：</div>
                <input type="text" class="form__item__content" v-if="userMessage" v-model.lazy="name" :placeholder="userMessage.name">
            </div>
            <div class="form__item">
                <div class="form__item__label">联系电话：</div>
                <input type="text" class="form__item__content" v-if="userMessage" v-model.lazy="phone" :placeholder="userMessage.phone">
            </div>
        </div>
        <Toast v-if="show" :message = "toastMessage"/>
    </div>
</template>
<script>
import { reactive, toRefs, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { patch, get } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 更新地址
const useUpAddressDataEffect = (showToast, router) => {
  const data = reactive({
    city: '',
    department: '',
    houseNumber: '',
    name: '',
    phone: ''
  })
  const { city, department, houseNumber, name, phone } = toRefs(data)
  const route = useRoute()
  const createAddress = async () => {
    if (city === ' ') {
      alert('输入不能为空')
      return
    }
    const result = await patch(`/api/user/address/${route.params.id}`, {
      city: data.city,
      department: data.department,
      houseNumber: data.houseNumber,
      name: data.name,
      phone: data.phone
    })
    if (result.error === 0) {
      showToast('保存成功')
      setTimeout(() => {
        router.back()
      }, 2000)
    }
    return { result }
  }
  return { city, department, houseNumber, name, phone, createAddress }
}
export default {
  name: 'NewAddress',
  components: { Toast },
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }

    const route = useRoute()
    const userMessage = ref()
    const getUserOneAddress = async () => {
      const result = await get(`/api/user/address/${route.params.id}`)
      if (result.error === 0 && result.length !== 0) {
        userMessage.value = result.data
      }
    }
    getUserOneAddress()
    console.log(userMessage)
    const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
    const { city, department, houseNumber, name, phone, createAddress } = useUpAddressDataEffect(showToast, router)
    return { handleBackClick, createAddress, city, department, houseNumber, name, phone, userMessage, show, toastMessage, showToast }
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
    &__icon{
        position: absolute;
        left: .18rem;
        top: 0;
        font-size: .2rem;
    }
    &__save{
        position: absolute;
        top: 0;
        right: .18rem;
    }
}
.form{
    padding: 0 .2rem;
    margin-top: .12rem;
    background: #fff;
    border-top: .01rem solid #f1f1f1;
    border-bottom: .01rem solid #f1f1f1;
    &__item{
        display: flex;
        padding: .12rem 0;
        line-height: .2rem;
        font-size: .14rem;
        border-bottom: .01rem solid #f1f1f1;
        &__label{
            margin-right: .05rem;
            color: #666;
        }
        &__content{
            flex: 1;
            border: none;
            outline: none;
            color: #3f3f3f;
        }
    }
}
</style>
