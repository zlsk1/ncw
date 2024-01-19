<template>
  <div class="pic-wrap">
    <i v-if="props.crown" class="crown" />
    <i v-if="props.mask" class="mask" />
    <i v-if="props.album" class="album" />
    <img :src="props.src" alt="">
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, default: '' },
  album: { type: Boolean },
  crown: { type: Boolean, default: false },
  mask: { type: Boolean, default: false }
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
  .mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/icons/coverall.png') 0 0 no-repeat;
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
