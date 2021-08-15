<template>
    <div class="wrapper">
        <div class="loading iconfont">
            &#xe606;
        </div>
    </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
@keyframes move {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.wrapper{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
}
.loading {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  border-radius:.05rem;
  color: #0091ff;
  font-size: .3rem;
  animation: move 1s linear infinite;
}
</style>
