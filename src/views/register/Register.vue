<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" v-model="password" placeholder="请输入密码" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" v-model="ensurepassword" placeholder="请确认密码" />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message = "toastMessage"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  // 用reactive进行数据响应式应用
  const data = reactive({
    username: '',
    password: '',
    ensurepassword: ''
  })
  const handleRegister = async () => {
    try {
      // 验证用户名密码
      const { username, password, ensurepassword } = data
      if (username === '' || password === '') {
        showToast('注册的用户名或密码不能为空')
        return
      }
      if (password !== ensurepassword) {
        showToast('两次密码不一致！')
        return
      }

      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      // console.log(result)
      if (result.error === 0) {
        showToast('恭喜你！注册成功')
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 2000)
      } else {
        showToast('该用户名已被注册请更换用户名')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurepassword } = toRefs(data)
  return { username, password, ensurepassword, handleRegister }
}
// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
    const { username, password, ensurepassword, handleRegister } = useRegisterEffect(showToast) // 登录相关逻辑
    const { handleLoginClick } = useLoginEffect()
    return { handleLoginClick, username, password, ensurepassword, handleRegister, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: absolute;
//   height: 5rem;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0,0,0,0.10);
    border-radius: .06rem;
    border-radius: .06rem;
    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: #777;
      &::placeholder {
        color: #777;
      }
    }
  }
  &__register-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: #777;
  }
}
</style>
