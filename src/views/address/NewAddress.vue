<template>
    <div class="wrapper">
        <div class="title">
            <div class="title__icon iconfont" @click="handleBackClick()">&#xe600;</div>新建收货地址
            <div class="title__save" @click="createAddress">保存</div>
        </div>
        <div class="form">
            <div class="form__item">
                <div class="form__item__label">所在城市：</div>
                <input type="text" class="form__item__content" v-model="city"   placeholder="如北京市">
            </div>
            <div class="form__item">
                <div class="form__item__label">小区/大厦/学校：</div>
                <input type="text" class="form__item__content" v-model="department" placeholder="如理工大学国防科技园">
            </div>
            <div class="form__item">
                <div class="form__item__label">楼号-门牌号：</div>
                <input type="text" class="form__item__content" v-model="houseNumber" placeholder="A号楼B层">
            </div>
            <div class="form__item">
                <div class="form__item__label">收货人：</div>
                <input type="text" class="form__item__content" v-model="name" placeholder="请填写收货人的姓名">
            </div>
            <div class="form__item">
                <div class="form__item__label">联系电话：</div>
                <input type="text" class="form__item__content" v-model="phone" placeholder="请填写收货手机号">
            </div>
        </div>
        <Toast v-if="show" :message = "toastMessage"/>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

export default {
  name: 'NewAddress',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    const data = reactive({
      city: '',
      department: '',
      houseNumber: '',
      name: '',
      phone: ''
    })
    const { city, department, houseNumber, name, phone } = toRefs(data)
    console.log(city)

    const createAddress = async () => {
      const result = await post('/api/user/address/', {
        city: data.city,
        department: data.department,
        houseNumber: data.houseNumber,
        name: data.name,
        phone: data.phone
      })
      console.log(result)
      if (result.error === 0) {
        showToast('保存成功')
        setTimeout(() => {
          handleBackClick()
        }, 2000)
      }
    }

    return { handleBackClick, createAddress, city, department, houseNumber, name, phone, show, toastMessage }
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
