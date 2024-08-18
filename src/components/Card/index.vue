<template>
  <div class="card-wrap">
    <slot></slot>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
