<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
    <!-- {{loading}} -->
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
// import { useNearbyList } from './useNearbyList'

export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker },
  setup () {
    // const { getNearBylist } = useNearbyList()
    // const { loading } = getNearBylist()
    // console.log(loading)
    // return { loading }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 .18rem .2rem .18rem;
}
// .loading{
//   // background-color: rgba(0,0,0,.25);
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 9;
//   font-size: .25rem;
//   color: #0091ff;
// }
</style>
