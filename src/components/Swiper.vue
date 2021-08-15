<template>
    <swiper
      :autoplay="swiperOption.autoplay"
      :loop="swiperOption.loop"
      :speed="swiperOption.speed"
      :pagination="swiperOption.pagination"
      :slides-per-view="1"
      :space-between="10"
    >
      <swiper-slide v-for="(item,index) in swiperImgUrlList" :key="index">
        <img :src="item.imgUrl" class="banner__img" title="双十一购物狂欢">
      </swiper-slide>
    </swiper>
</template>

<script>
import { reactive } from 'vue'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'
SwiperCore.use([Autoplay, Pagination])
const swiperImgUrlList = [
  { imgUrl: 'http://localhost:3000/images/product/banner.jpg' },
  { imgUrl: 'http://localhost:3000/images/product/banner.jpg' },
  { imgUrl: 'http://localhost:3000/images/product/banner.jpg' }
]
export default {
  name: 'Search',
  components: { Swiper, SwiperSlide },
  setup () {
    const swiperOption = reactive({
      autoplay: {
        delay: 2000,
        disableOnIneraction: false
      },
      loop: true,
      speed: 1000,
      pagination: {
        clickable: true
      }
    })
    return { swiperOption, swiperImgUrlList }
  }
}
</script>

<style lang="scss" scoped>
img{
    width: 100%;
}
</style>
