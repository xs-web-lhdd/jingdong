<template>
<div class="wrapper">
    <div class="back iconfont" @click="handlebackclick">&#xe600;</div>
    <div class="all">
      <div class="office" v-if="office">本次服务由汉克狗为你提供专属帮助</div>
      <div class="say" v-if="say">怎么了？我的小主人</div>
      <div class="icon" @click="handleDogSayClick">
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="head"></div>
        <div class="face"></div>
        <div class="chin"></div>
        <div class="body">
          <div class="arm"></div>
          <div class="arm right"></div>
          <div class="leg">
            <div class="foot"></div>
          </div>
          <div class="leg right">
            <div class="foot"></div>
          </div>
          <div class="belly"></div>
        </div>
        <div class="birthmark"></div>
        <div class="eye">
          <i class="upper-eyelid"></i>
          <i class="lower-eyelid"></i>
          <i class="pupil"></i>
        </div>
        <div class="eye left">
          <i class="upper-eyelid"></i>
          <i class="lower-eyelid"></i>
          <i class="pupil"></i>
        </div>
        <div class="nose">
          <i class="nostril"></i>
          <i class="nostril right"></i>
        </div>
        <div class="mouth">
          <i class="tongue"></i>
          <i class="teen no11"></i>
          <i class="teen no21"></i>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'Servicer',
  setup () {
    // 返回上一个页面
    const router = useRouter()
    const handlebackclick = () => {
      router.back()
    }
    const office = ref(true)
    setTimeout(() => {
      office.value = false
    }, 2000)
    // 控制狗点击后说话
    const say = ref(false)
    const handleDogSayClick = () => {
      say.value = true
    }
    return { handlebackclick, say, handleDogSayClick, office }
  }
}
</script>

<style lang="scss" scoped>
.back{
    position: absolute;
    top: .1rem;
    left: .1rem;
    z-index: 999;
    width: .3rem;
    height: .3rem;
    font-size: .25rem;
    color: #fff;
}
.office{
  position: absolute;
  top: .5rem;
  left: .63rem;
  width: 2.5rem;
  height: .5rem;
  background-color: #fff;
  line-height: .5rem;
  text-align: center;
  border-radius: 50%;
}
.say {
    width: 1.2rem;
    height: .5rem;
    background-color: #fff;
    position: absolute;
    top: 2rem;
    left: .3rem;
    border-radius: 50%;
    line-height: .5rem;
    text-align: center;
}
// :root {
// --hl: #1b2f90;
// --bg: #f9f9f6;
// --white: #f9f9f6;
// --time: 2s;
// --time4: calc(var(--time) * 4);
// --color1: #ffc400;
// --color2: #003bff;
// --color3: #e79101;
// --color4: #671316;
// --gray: #ccc
// }

.all {background: #0091ff; position: absolute;top: 0; right: 0; left: 0; bottom: 0;}
.icon {transform-origin: 50% 0; transform: scale(1, 1); position: relative;top: 2rem; width: 1.2rem; height: 2rem; margin: 0 auto;}
.bg {border-radius:.2rem; width: 2rem; margin: 0 0 0 -0.4rem; height: 2rem; background: #ffc400;}
.ear {background: #1b2f90; width: .16rem; height: .7rem; border-radius: 100% 70%; position: absolute; left: .9rem; top: .42rem; animation: rightear 2s ease-out infinite; transform-origin: 50% 0%;}
.ear.left {border-radius: 70% 100%; left: .14rem; top: .42rem; animation: leftear 2s ease-out infinite}
.head {width: 1.02rem; height: .48rem; position: absolute; left: .08rem; top: .08rem; background: #f9f9f6; border-radius: .48rem .48rem .03rem .03rem}
.face {width: 1.1rem; height: .68rem; position: absolute; top: .3rem; left: .04rem; background: #f9f9f6; border-radius: 100%}
.chin {width: 1.04rem; height: .36rem; position: absolute; top: .7rem; left: .07rem; background: #f9f9f6; border-radius: 50% / 0px 0px .36rem .36rem}
.body {width: .66rem; height: .7rem; position: absolute; top: 1rem; left: .27rem; background: #f9f9f6; border-radius: 50%}
.body .arm {width: .26rem; height: .4rem; position: absolute; top: .05rem; left: -0.07rem; background: #f9f9f6; border-radius: .26rem / .26rem 0 0 .45rem; transform: rotate(20deg);}
.body .arm.right {transform: scale(-1, 1) rotate(20deg); left: .47rem;}
.body .arm:before {content: ''; position: absolute; right: .03rem; top: .1rem; height: .3rem; width: .1rem; border-radius: .1rem / .1rem 0 0 .3rem; box-shadow: -0.01rem 0px 0px 0px rgba(0, 0, 0, 0.1);}
.body .leg {width: .29rem; height: .5rem; position: absolute; top: .36rem; left: 0; background: linear-gradient(-90deg, #ccc 0%, #f9f9f6 20%, #f9f9f6 100%); border-radius: .26rem / .26rem 0 .26rem .74rem;}
.body .leg.right {transform: scale(-1, 1); left: .37rem;}
.body .foot {width: .29rem; height: .15rem; position: absolute; bottom: -0.1rem; left: 0.02rem; background:  linear-gradient(227deg, #ccc 0%, #f9f9f6 30%, #f9f9f6 100%); border-radius: .15rem / .2rem .24rem .05rem .05rem;}
.body .belly {width: .6rem; height: .36rem; position: absolute; bottom: 0; left: .03rem; background: linear-gradient(0deg, #ccc 0%, #f9f9f6 20%, #f9f9f6 100%); border-radius: .33rem / 0px 0px .35rem .35rem}
.birthmark {width: .3rem; height: .36rem; position: absolute; top: .19rem; left: .79rem; background: #1b2f90; border-radius: .36rem / .43rem .72rem 0px .43rem; transform: rotate(-7deg); transform-origin: 50% 100%;}
.birthmark:before {content: ''; background: #f9f9f6; position: absolute; width: .25rem; height: .03rem; bottom: -0.01rem; border-radius: .12rem / 0px .1rem 0px 0px; left: .07rem;}
.eye {width: .24rem; height: .24rem; position: absolute; top: .28rem; left: .84rem; background: #f9f9f6; border-radius: .12rem / .14rem 0.17rem 0.02rem .1rem; transform: rotate(-7deg); transform-origin: 50% 100%; overflow: hidden; box-shadow: -0.01rem 0.01rem 0.0rem 0.0rem #333 inset;}
.lower-eyelid {background: #1b2f90; position: absolute; width: 0.17rem; height: 0.01rem; bottom: -0.01rem; border-radius: .13rem / 0px 0px 0.02rem .02rem; left: .06rem;}
.pupil {width: .26rem; height: .26rem; border-radius: 50%; position: absolute; left: -0.05rem; bottom: -0.05rem; background: #e79101; box-shadow: 0px 0px .04rem 0.01rem #333 inset; animation: eye 2s ease-out infinite;}
.pupil:before {content: ''; position: absolute; left: 50%; top: 50%; width: .18rem; height: .18rem; margin: -0.09rem 0 0 -0.09rem; background: #000; border-radius: 50%}
.pupil:after {content: ''; position: absolute; left: 0.17rem; top: 0.06rem; width: .05rem; height: .05rem; background: #fff; border-radius: 50%}
.eye.left {left: .13rem; top: .28rem; transform: rotate(7deg) scale(-1, 1); box-shadow: -0.01rem 0.01rem 0px 0px #333 inset, 0px -0.02rem 0.04rem 0.02rem #bbb; animation: lefteye 2s ease-out infinite;}
.nose {width: .62rem; height: .32rem; position: absolute; top: .48rem; left: .28rem; background: #363035; border-radius: .31rem / .12rem .12rem .19rem .19rem; z-index: 3}
.nose:before {content: ''; width: .6rem; height: .12rem; opacity: 0.8; background: linear-gradient(30deg, #fff 0%, #fff 8%, #b1aeb1 15%, #b1aeb1 50%, #544d53 100%); position: absolute; left: 0.01rem; top: 0.01rem; border-radius: .3rem / .1rem .1rem .02rem .02rem}
.nostril {position: absolute; width: .15rem; height: 0.04rem; background: linear-gradient(347deg, #363035 0%, #000 50%, #000 100%); box-shadow: -0.01rem -0.01rem .03rem 0px #363035 inset; left: .1rem; top: 0.22rem; transform: rotate(39deg); border-radius: .08rem / .02rem .04rem 0px .02rem; animation: nostril 2s ease-out infinite}
.nostril.right {transform: rotate(-39deg) scale(-1, 1); left: .37rem; top: 0.22rem}
.mouth {width: .68rem; height: .27rem; position: absolute; left: .25rem; top: .72rem; border-radius: .36rem / 0px 0px .27rem .27rem; background: #671316; box-shadow: 0px 0px .08rem 0.02rem rgba(0, 0, 0, 0.5) inset; animation: mouth 2s ease-out infinite}
.mouth:before {content: ''; width: .72rem; height: .12rem; background: #f9f9f6; position: absolute; left: 0px; top: 0px; border-radius: .36rem / 0px 0px .14rem .09rem; box-shadow: -0.01rem .07rem 0.08rem .02rem rgba(155,155,155, 0.2); z-index: 2; animation: lip 2s ease-out infinite}
.tongue {width: .34rem; height: .14rem; position: absolute; left: 50%; top: 0; margin: 0 0 0 -0.17rem; border-radius: 0.17rem / 0px 0px .11rem .11rem; background: #a2504f; box-shadow: 0px 0px .02rem 0px rgba(143, 32, 33, 1) inset; animation: tongue 2s ease-out infinite}
.teen {background: #f9f9f6}
.no11, .no21 {width: 0.08rem; height: .03rem; position: absolute; left: .34rem; top: .11rem}
.no11 {margin-left: -0.08rem; left: .34rem; border-radius: .04rem / 0 0 0 .01rem; border-right: .02rem solid rgba(0, 0, 0, 0.5)}
.no21 {border-radius: 0.04rem / 0 0 0.01rem 0;}

@keyframes mouth {
0% {height: .27rem}
30% {height: .27rem}
80% {height: .15rem}
100% {height: .27rem}
}
@keyframes lip {
0% {border-radius: .36rem / 0px 0px .14rem 0.09rem;}
30% {border-radius: .36rem / 0px 0px .14rem 0.09rem;}
80% {border-radius: .25rem / 0px 0px 0.14rem 0.09rem;}
100% {border-radius: .36rem / 0px 0px 0.14rem 0.09rem;}
}
@keyframes tongue {
0% {height: 0.14rem}
30% {height: 0.14rem}
80% {height: .25rem}
100% {height: 0.14rem}
}
@keyframes leftear {
0% {transform: rotate(10deg); }
10% {transform: rotate(10deg); }
80% {transform: rotate(0deg); }
100% {transform: rotate(10deg); }
}
@keyframes rightear {
0% {transform: rotate(-10deg); }
10% {transform: rotate(-10deg); }
80% {transform: rotate(0deg); }
100% {transform: rotate(-10deg); }
}
@keyframes eye {
0% {left: -0.05rem}
30% {left: -0.05rem}
80% {left: -0.08rem}
100% {left: -0.05rem}
}
@keyframes nostril {
0% {height: .04rem}
30% {height: .04rem}
80% {height: 0.03rem}
100% {height: .04rem}
}
@keyframes mask {
0% {left: -0.04rem}
30% {left: -0.4rem}
100% {left: 4rem}
}
@keyframes rotate {
0% {background: #ffc400; transform: rotate(0deg) scale(1, 1)}
20% {background: #ffc400; transform: rotate(0deg) scale(.95, .95)}
25% {background: #003bff; transform: rotate(90deg) scale(1, 1)}
45% {background: #003bff; transform: rotate(90deg) scale(.95, .95)}
50% {background: #e79101; transform: rotate(180deg) scale(1, 1)}
70% {background: #e79101; transform: rotate(180deg) scale(.95, .95)}
75% {background: #671316; transform: rotate(270deg) scale(1, 1)}
95% {background: #671316; transform: rotate(270deg) scale(.95, .95)}
100% {background: #ffc400; transform: rotate(360deg) scale(1, 1)}
}
</style>
