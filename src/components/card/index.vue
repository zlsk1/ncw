<template>
  <div class="card-wrap">
    <router-link to="/">
      <img
        v-lazy="imgUrl"
        class="card-img"
        alt=""
        :style="{height: imgHeight}"
      >
    </router-link>
    <div class="card-play fl-sb">
      <i />
      <span class="count">{{ playCount }}</span>
      <i />
    </div>
    <p class="card-footer ellipsis-2">
      <slot name="footer" />
    </p>
  </div>
</template>

<script setup>
defineProps({
  playCount: { type: String, default: '0' },
  imgUrl: { type: String, default: '' },
  imgHeight: { type: String, default: '140px' }
})
</script>

<style lang="scss" scoped>
.card-wrap {
  position: relative;
  .card-img {
    width: 100%;
  }
  .card-play {
    position: absolute;
    width: 100%;
    height: 26px;
    margin-top: -26px;
    padding: 0 10px;
    background: url('@/assets/icons/coverall.png') 0 -537px no-repeat;
    color: #ccc;
    i:first-child {
      display: block;
      width: 14px;
      height: 11px;
      background: url('@/assets/icons/iconall.png') no-repeat;
      background-position: 0 -24px;
    }
    i:last-child {
      display: block;
      width: 16px;
      height: 16px;
      background: url('@/assets/icons/iconall.png') no-repeat;
      background-position: 0 0;
      cursor: pointer;
      &:hover {
        background: url('@/assets/icons/iconall.png') no-repeat;
        background-position: 0 -60px;
      }
    }
    .count {
      position: absolute;
      left: 30px;
    }
  }
  .card-footer {
    margin-top: 6px;
  }
}
</style>
