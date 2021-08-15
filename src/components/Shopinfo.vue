<template>
      <div class="shop">
        <img :src="item.imgUrl" class="shop__item__img">
        <div
          :class="{'shop__content':true , 'shop__content--bordered': hideBorder ? true : false}"
        >
          <div class="shop__content__title">{{item.name}}</div>
          <div class="shop__content__tags">
            <span class="shop__content__tag">月售:{{item.sales}}</span>
            <span class="shop__content__tag">起送:{{item.expressLimit}}</span>
            <span class="shop__content__tag">基础运费:{{item.expressPrice}}</span>
          </div>
          <div class="shop__content__highlight">{{item.slogan}}</div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Shopinfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/fontsize.scss';
.shop {
  display: flex;
  &__item{
    padding-top: .12rem;
    &__img {
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
      margin-top: .05rem;
    }
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    &--bordered{
        border-bottom: .01rem solid $content-bgcolor;
    }
    &__title{
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontsize ;
    }
    &__tags{
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontsize;
    }
    &__tag{
      margin-right: .1rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: #E93B3B;
    }
  }
}
</style>
