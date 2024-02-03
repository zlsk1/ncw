<template>
  <div class="card-wrap">
    <slot />
    <p class="card-footer">
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
  .card-footer {
    margin-top: 6px;
  }
}
</style>
