<template>
  <div class="produce-wrap">
    <h4>{{ props.name }}简介</h4>
    <p>{{ props.produce }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  produce: { type: String, default: '暂无介绍~' },
  name: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.produce-wrap {
  h4 {
    position: relative;
    margin-bottom: 12px;
    padding-left: 10px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: $themeColor;
    }
  }
  p {
    line-height: 20px;
    font-size: 12px;
    text-indent: 2em;
    color: #666;
  }
}
</style>
