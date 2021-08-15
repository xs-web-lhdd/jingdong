<template>
  <div class="wrapper">
    <OrderTopToast />
    <OrderProductList />
    <OrderResult />
</div>
</template>

<script>
import OrderTopToast from './OrderTopToast.vue'
import OrderProductList from './OrderProductList.vue'
import OrderResult from './OrderResult.vue'

export default {
  name: 'OrderConfirmation',
  components: { OrderTopToast, OrderProductList, OrderResult }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #EEE;
    overflow-y: scroll;
}

</style>
