<template>
  <div
    v-show="isShowVol"
    ref="volWrapRef"
    class="vol-wrap"
  >
    <div class="vol-bg" @click="setVolume">
      <div
        ref="volBgRef"
        class="bg-red"
        :style="{ height: volBgHeight }"
      ></div>
      <div
        ref="volControlRef"
        class="vol-control-icon"
        :style="{ top: volControlTop }"
        @mousedown="controlVol"
      >
        <div class="inner"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { playBarProvide } from './constances'

const { audioRef, volControlTop, volBgHeight, isShowVol } = inject(playBarProvide)!

const volWrapRef = ref<HTMLElement>()

const { elementY } = useMouseInElement(volWrapRef)

const controlVol = () => {
  volWrapRef.value!.onmousemove = () => {
    setVolume()
    volWrapRef.value!.onmouseup = e1 => {
      e1.stopPropagation()
      volWrapRef.value!.onmouseup = null
      volWrapRef.value!.onmousemove = null
      volWrapRef.value!.onmousemove = null
    }
  }
}

const setVolume = () => {
  const offsetTop = elementY.value - 15
  if (offsetTop < 90 && offsetTop > 0) {
    volControlTop.value = offsetTop - 6 + 'px'
    volBgHeight.value = 90 - offsetTop + 'px'
    const percent = (90 - offsetTop) / 90
    if (percent) {
      audioRef.value.volume = percent
    }
    else audioRef.value.volume = 0
  }
}
</script>

<style lang="scss" scoped>
.vol-wrap {
  position: absolute;
  top: -132px;
  right: 94px;
  width: 32px;
  height: 120px;
  background-color: #292929;
  .vol-bg {
    position: absolute;
    left: calc(50% - 2px);
    top: 15px;
    width: 4px;
    height: 90px;
    background-color: #191919;
    border-radius: 100px;
    .bg-red {
      position: absolute;
      left: calc(50% - 2px);
      bottom: 0;
      width: 4px;
      height: 0;
      background-color: $themeColor;
      border-radius: 100px;
    }
  }
  .vol-control-icon {
    position: absolute;
    left: -4px;
    top: 0;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    .inner {
      position: absolute;
      left: calc(50% - 2px);
      top: calc(50% - 2px);
      width: 4px;
      height: 4px;
      background-color: $themeColor;
      border-radius: 50%;
    }
  }
}
</style>
