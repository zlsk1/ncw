<template>
  <div class="progress-wrap" :style="{ width: props.width, height: props.height }">
    <template v-if="section">
      <div
        v-for="(item, index) in _section"
        :key="index"
        class="breakpoint"
        :style="{ left: (perWidth * item) + '% ' }"
      />
      <div
        v-for="index in _section + 1"
        :key="index"
        class="split-num"
        :style="{
          left: perWidth * (index - 1) - .5 + '%',
          color: nextLevel === index - 1 ? '#999' : ''
        }"
      >
        {{ index - 1 }}
      </div>
    </template>
    <div class="progress" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { progressProps } from './index'

const props = defineProps(progressProps)

const perWidth = computed(() => {
  return 100 / _section.value
})

const nextLevel = computed(() => {
  return Math.floor(_percentage.value as number * 10) + 1
})

const _section = computed(() => {
  return props?.section
})

const _percentage = computed(() => {
  return props?.percentage
})

const _height = computed(() => {
  return props?.height
})

const _color = computed(() => {
  return props?.color
})
</script>

<style lang="scss" scoped>
$height: v-bind(_height);
$color: v-bind(_color);
.progress-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 10px;
  border-radius: 20px;
  background: #dcdfe6;
  .progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: $height;
    background-color: $color;
    border-radius: 20px;
    animation: fill 1s cubic-bezier(.8, .4, .8, .5) forwards;
  }
  @keyframes fill {
    from {
      width: 0;
    }
    to {
      width: calc(100% * v-bind(_percentage));
    }
  }
  .breakpoint {
    position: absolute;
    width: 1px;
    height: $height;
    background-color: #fff;
    z-index: 100;
  }
  .split-num {
    position: absolute;
    top: -20px;
    width: 1px;
    height: $height;
    font-size: 16px;
    color: $color;
    background-color: #fff;
    z-index: 100;
  }
}
</style>
