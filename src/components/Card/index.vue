<template>
  <div class="card-wrap">
    <slot />
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
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
