<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__changeMes iconfont" @click="handleChangeMes">&#xe636;</div>
      <div class="top__bgc">
          <img src="../../assets/小程序图标.jpg" class="top__bgc__img" title="热心市民刘先生" />
          <div class="top__bgc__name">热心市民刘先生
              <span class="top__bgc__name__icon iconfont">&#xe691;16</span>
          </div>
          <div class="top__bgc__id">ID：387192833</div>
          <hr>
          <div class="top__bgc__bottom">
              <div
                class="top__bgc__one"
                v-for="(item,index) in Person"
                :key="index"
              >
                  <div class="top__bgc__one__one">{{item.name}}</div>
                  <div class="top__bgc__one__two">{{item.value}}</div>
              </div>
          </div>
      </div>
      <div class="main">
          <div class="main__content">
              <div class="main__content__left iconfont">&#xe603;</div>
              <div class="main__content__title">我的钱包</div>
              <div class="main__content__icon iconfont">&#xe602;</div>
          </div>
          <div class="main__content" @click="handleMyAddress()">
              <div class="main__content__left iconfont">&#xe60e;</div>
              <div class="main__content__title">我的地址</div>
              <div class="main__content__icon iconfont">&#xe602;</div>
          </div>
          <div class="main__content" @click="handleServicer">
              <div class="main__content__left iconfont">&#xe673;</div>
              <div class="main__content__title">客服与帮助</div>
              <div class="main__content__icon iconfont">&#xe602;</div>
          </div>
      </div>
      <div class="logout" @click="handleOutClick">退出登录</div>
    </div>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import { useRouter } from 'vue-router'
import Docker from '../home/Docker.vue'

const Person = [
  { name: '我的钱包', value: '218' },
  { name: '优惠卷', value: '12' },
  { name: '仙豆', value: '666' },
  { name: '白条', value: '1000' }
]
export default {
  name: 'Mine',
  components: { Docker },
  setup () {
    const router = useRouter()
    // 点击进入修改个人信息页面
    const handleChangeMes = () => {
      router.push({ name: 'Changemes' })
    }
    // 点击进入我的地址
    const handleMyAddress = () => {
      router.push({ name: 'Address' })
    }
    // 点击进入客服页面
    const handleServicer = () => {
      router.push({ name: 'Servicer' })
    }
    // 退出登录
    const handleOutClick = () => {
      window.localStorage.removeItem('isLogin')
      router.push({ name: 'Login' })
    }
    return { Person, handleMyAddress, handleOutClick, handleServicer, handleChangeMes }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: rgb(248, 248, 248);
}
.top{
    position: relative;
    background-size: 100% 2.5rem;
    width: 3.75rem;
    height: 2.5rem;
    background-image: linear-gradient(239deg,#3a6ff3,#50c7fb);
    &__changeMes{
        position: absolute;
        top: .1rem;
        right: .1rem;
        border-radius: .03rem;
        font-size: .25rem;
        color: #fff;
    }
    &__bgc{
        position: absolute;
        top: 1.09rem;
        right: .18rem;
        left: .18rem;
        width: 3.39rem;
        height: 2.03rem;
        background-color: #fff;
        box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
        border-radius: .08rem;
        &__img{
            position: absolute;
            top: -0.47rem;
            left: 1.23rem;
            border-radius: 50%;
            width: .94rem;
            height: .94rem;
        }
        &__name{
            margin-top: .59rem;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #262628;
            letter-spacing: .02rem;
            line-height: .36rem;
            &__icon{
                // padding-top: .05rem;
                display: inline-block;
                width: .35rem;
                line-height: .15rem;
                background-color: #BEE700;
                font-family: Helvetica;
                font-size: .12rem !important;
                color: #FFFFFF;
                letter-spacing: -0.035rem;
                border-radius: .2rem;
            }
        }
        &__id{
            margin: .02rem 0 .12rem 0;
            font-family: PingFangSC-Regular;
            font-size: .14rem;
            color: #C1C0C9;
            text-align: center;
            line-height: .17rem;
        }
        &__bottom{
            display: flex;
        }
        &__one{
            flex: 1;
            text-align: center;
            margin: .12rem 0 .16rem 0;
            &__one{
                margin-bottom: .03rem;
                font-family: PingFangSC-Regular;
                font-size: .12rem;
                color: #C1C0C9;
            }
            &__two{
                font-family: PingFangSC-Regular;
                font-size: .2rem;
                color: #262628;
            }
        }
    }
}
.main{
    position: absolute;
    top: 3.27rem;
    left: .18rem;
    right: .18rem;
    width: 3.39rem;
    height: 1.46rem;
    background: #FFFFFF;
    box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    &__content{
        display: flex;
        // padding: .17rem 0;
        margin: 0.17rem .16rem 0.17rem .16rem;
        // height: .48rem;
        line-height: .26rem;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
        color: #262626;
        &__left{
            margin-top: .02rem;
            width: .22rem;
            height: .22rem;
            background-color: #32C5FF;
            text-align: center;
            line-height: .22rem;
            border-radius: .08rem;
        }
        &__title{
            margin-left: .12rem;
        }
        &__icon{
            position: absolute;
            right: .2rem;
        }
    }
}
.logout{
    position: absolute;
    top: 4.8rem;
    left: 0rem;
    right: 0rem;
    margin: .18rem;
    line-height: .32rem;
    background: #0091ff;
    color: #fff;
    text-align: center;
    border-radius: .04rem;
}
</style>
