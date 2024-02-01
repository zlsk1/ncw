<template>
  <div class="pic-wrap">
    <i v-if="props.crown" class="crown" />
    <i v-if="props.mask1" class="mask1" />
    <i v-if="props.mask2" class="mask2" />
    <i v-if="props.mask3" class="mask3" />
    <i v-if="props.album" class="album" />
    <img v-lazy="props.src" alt="">
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, default: '' },
  album: { type: Boolean, default: false },
  crown: { type: Boolean, default: false },
  mask1: { type: Boolean, default: false },
  mask2: { type: Boolean, default: false },
  mask3: { type: Boolean, default: false }
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
  .album {
    top: 0;
    left: 0;
    width: 118px;
    height: 100px;
    background: url('@/assets/icons/coverall.png') 0 -570px no-repeat;
  }
}
</style>
