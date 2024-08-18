<template>
  <div class="btns fl-sb">
    <i
      class="prev"
      title="上一首(ctrl+←)"
      @click="prev"
    ></i>
    <i
      v-if="isPaused"
      class="play"
      title="播放/暂停(ctrl+空格)"
      @click.stop="play()"
    ></i>
    <i
      v-else
      class="pause"
      @click.stop="pause()"
    ></i>
    <i
      class="next"
      title="下一首(ctrl+→)"
      @click="next"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { playBarProvide } from './constances'

const { isPaused, prev, next, play, pause } = inject(playBarProvide)!
</script>

<style lang="scss" scoped>
.btns {
  i {
    display: block;
    background: url('@/assets/icons/playbar.png') no-repeat;
    cursor: pointer;
  }
  .prev {
    width: 28px;
    height: 28px;
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }
  .play {
    width: 36px;
    height: 36px;
    margin: 0 10px;
    background-position: 0 -204px;
    &:hover {
      background-position: -40px -204px;
    }
  }
  .pause {
    width: 36px;
    height: 36px;
    margin: 0 10px;
    background-position: 0 -165px;
    &:hover {
      background-position: -40px -165px;
    }
  }
  .next {
    width: 28px;
    height: 28px;
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
  .lock {
    width: 18px;
    height: 18px;
    background-position: -100px -380px;
    &:hover {
      background-position: -100px -400px;
    }
  }
  .unlock {
    width: 18px;
    height: 18px;
    background-position: -80px -380px;
    &:hover {
      background-position: -80px -400px;
    }
  }
}
</style>
