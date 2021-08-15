<template>
  <div class="wrapper">
    <!-- 顶部搜索框 -->
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick"
      >&#xe600;
      </div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe630;</span>
        <input class="search__content__input" v-model="inputValue" placeholder="请输入商品名称" />
      </div>
      <div
        class="search__success"
        @click="handleSearchClick"
      >确定
      </div>
    </div>
    <router-link
      :to="`/shop/${item._id}`"
      v-for="item in searchList.value"
      :key="item.id"
    >
      <Shopinfo
        :item="item"
      />
    </router-link>
    <div class="default" v-if="show">搜索结果为空</div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Shopinfo from '../../components/Shopinfo.vue'

export default {
  name: 'Search',
  components: { Shopinfo },
  setup () {
    const route = useRouter()
    const handleBackClick = () => {
      route.back()
    }
    // 获取搜索结果
    const show = ref(true)
    const inputValue = ref('')
    const searchList = reactive([])
    const handleSearchClick = async () => {
      const result = await post('/api/shop/search', {
        search: inputValue.value
      })
      searchList.value = result.data
      if (result.data.length > 0) {
        show.value = false
      }
    }

    return { handleBackClick, handleSearchClick, inputValue, searchList, show }
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.wrapper{
  padding: 0.1rem .2rem;
}
.search{
  display: flex;
  margin: .04rem 0 .04rem 0;
  line-height: .32rem;
  &__back{
    font-size: .2rem;
  }
  &__success{
    width: .3rem;
    height: .32rem;
    line-height: .32rem;
    font-size: .14rem;
    margin-left: .1rem;
    color: #0091ff;
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
.default{
  width: 100%;
  font-size: .14rem;
  text-align: center;
  margin-top: .2rem;
}
</style>
