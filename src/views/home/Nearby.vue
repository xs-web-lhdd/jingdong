<template>
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link
        :to="`/shop/${item._id}`"
        v-for="item in nearbyList"
        :key="item.id"
      >
        <Shopinfo
          :item="item"
          :hideBorder="true"
        />
      </router-link>
    </div>
    <loading v-show="loading"/>
</template>

<script>
import Loading from '../../components/Loading.vue'
import Shopinfo from '../../components/Shopinfo.vue'
import { useNearbyList } from './useNearbyList'

export default {
  name: 'Nearby',
  components: { Shopinfo, Loading },
  setup () {
    const { getNearBylist, nearbyList, loading } = useNearbyList()
    getNearBylist()
    return { nearbyList, getNearBylist, loading }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/fontsize.scss';
.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontsize ;
  }
  a{
  text-decoration-line: none;
  }
}
</style>
