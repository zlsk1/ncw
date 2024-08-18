<template>
  <div class="pic-wrap">
    <i v-if="props.crown" class="crown"></i>
    <i v-if="props.mask1" class="mask1"></i>
    <i v-if="props.mask2" class="mask2"></i>
    <i v-if="props.mask3" class="mask3"></i>
    <i v-if="props.mask4" class="mask4"></i>
    <i v-if="props.mask5" class="mask5"></i>
    <i v-if="props.mask6" class="mask6"></i>
    <i v-if="props.album" class="album"></i>
    <i v-if="props.album1" class="album1"></i>
    <i v-if="props.album2" class="album2"></i>
    <i v-if="props.album3" class="album3"></i>
    <i v-if="props.play" class="play"></i>
    <img
      v-if="lazyLoad"
      v-lazy="props.src"
      alt=""
    >
    <img
      v-else
      :src="props.src"
      alt=""
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: { type: String, default: '' },
  lazyLoad: { type: Boolean, default: true },
  album: { type: Boolean, default: false },
  album1: { type: Boolean, default: false },
  album2: { type: Boolean, default: false },
  album3: { type: Boolean, default: false },
  crown: { type: Boolean, default: false },
  mask1: { type: Boolean, default: false },
  mask2: { type: Boolean, default: false },
  mask3: { type: Boolean, default: false },
  mask4: { type: Boolean, default: false },
  mask5: { type: Boolean, default: false },
  mask6: { type: Boolean, default: false },
  play: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
.pic-wrap {
  position: relative;
  i {
    position: absolute;
    display: block;
  }
  .crown {
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: url('@/assets/icons/icon2.png') -135px -220px no-repeat;
  }
  .mask1 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') 0 0 no-repeat;
  }
  .mask2 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') -145px -57px no-repeat;
  }
  .mask3 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') -230px -380px no-repeat;
  }
  .mask4 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') 0 -1170px no-repeat;
  }
  .mask5 {
    top: -4px;
    left: -4px;
    width: 208px;
    height: 208px;
    background: url('@/assets/icons/coverall.png') 0 -1285px no-repeat;
  }
  .mask6 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') 0 -680px no-repeat;
  }
  .album {
    top: 0;
    left: 0;
    width: 118px;
    height: 100px;
    background: url('@/assets/icons/coverall.png') 0 -570px no-repeat;
  }
  .album1 {
    top: 0;
    left: 0;
    width: 145px;
    height: 120px;
    background: url('@/assets/icons/coverall.png') -170px -850px no-repeat;
  }
  .album2 {
    top: 0;
    left: 0;
    width: 153px;
    height: 130px;
    background: url('@/assets/icons/coverall.png') 0 -845px no-repeat;
  }
  .album3 {
    top: 0;
    left: 0;
    width: 209px;
    height: 177px;
    background: url('@/assets/icons/coverall.png') 0 -986px no-repeat;
  }
  .play {
    top: calc(50% - 22px);
    left: calc(50% - 22px);
    width: 44px;
    height: 44px;
    background: url('@/assets/icons/iconall.png') -30px -135px no-repeat;
    &:hover {
      background-position: -30px -85px;
    }
  }
}
</style>
