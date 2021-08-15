<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="password" type="password" placeholder="请输入密码" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
    <Toast v-if="show" :message = "toastMessage"/>
  </div>
</template>

<script>
// 将系统级别的引入都放到顶部
// toRefs是将reactive对象中的数据转化为基本数据类型的响应式数据
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// 将自己写的都放在底部
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 处理登录相关的逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  // 用reactive进行数据响应式应用
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      // 验证用户名和密码是否为空
      const { username, password } = data
      if (username === '' || password === '') {
        showToast('用户名或密码不能为空')
        return
      }

      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })

      if (result.error === 0) {
        showToast('登录成功')
        setTimeout(() => {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        }, 1000)
      } else {
        showToast('登陆失败-用户名或密码错误')
      }
    } catch (e) {
      showToast('登录失败-请检查网络')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
// 处理注册跳转相关的逻辑
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  // setup函数里面放一些执行流程,不放具体的逻辑代码
  setup () {
    const { show, toastMessage, showToast } = useToastEffect() // 弹窗相关逻辑
    const { username, password, handleLogin } = useLoginEffect(showToast) // 登录相关逻辑
    const { handleRegister } = useRegisterEffect() // 跳转注册相关逻辑

    return { handleLogin, handleRegister, username, password, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: absolute;
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
  &__login-button {
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
  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: #777;
  }
}
</style>
