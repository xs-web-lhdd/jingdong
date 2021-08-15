<template>
    <div class="wrapper">
        <div class="title">
            <div class="title__icon iconfont" @click="handleBackClick()">&#xe600;</div>编辑个人信息
            <div class="title__save" @click="createAddress">保存</div>
        </div>
        <div class="form">
            <div class="form__item">
                <div class="form__item__label">昵称：</div>
                <input type="text" class="form__item__content" placeholder="请输入你的昵称">
            </div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NewAddress',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
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
