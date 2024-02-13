<template>
  <div class="carousel-item">
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>
