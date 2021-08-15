<template>
  <div class="docker">
    <!-- BMW 命名规则-->
    <span
      v-for="(item,index) in dockerList"
      :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
      class="docker__item"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div>{{item.text}}</div>
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    var dockerList = [
      { icon: '&#xe627;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe657;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe607;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe763;', text: '我的', to: { name: 'Mine' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/fontsize.scss';

.docker {
  color: $content-fontsize;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 .18rem;
  width: 100%;
  height: .49rem;
  border: 0.01rem solid $content-bgcolor;
//   background: blue;
}

.docker__item{
  flex: 1;
  text-align: center;
  a {
    color: #000;
    text-decoration: none;
  }
  .iconfont{
    margin: 0.07rem 0 0.02rem 0;
    font-size: .18rem;
  }
  &--active {
    a {
      color: #1FA4FC;
    }
  }
}
// .docker__item--active {
//   color: #1FA4FC !important;
// }

</style>
