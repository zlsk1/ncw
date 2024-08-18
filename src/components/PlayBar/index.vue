<template>
  <div ref="playBarRef">
    <div class="playBar-wrap">
      <Audio></Audio>
      <Bar></Bar>
    </div>
    <template v-if="isShowPlaylist">
      <PlayList></PlayList>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { usePlayStore } from '@/stores/play'
import { onClickOutside } from '@vueuse/core'
import { usePlay } from './composables/index'
import { playBarProvide } from './constances'
import PlayList from './PlayList.vue'
import Audio from './Audio.vue'
import Bar from './Bar.vue'

const store = usePlayStore()

const progressBarWidth = 466
const btnWidth = 11

const moveBtn = ref()
const playBg = ref()
const playBarRef = ref()
const barRef = ref()
const audioRef = ref()
const wordRef = ref()
const isPaused = ref(true)
const isShowVol = ref(false)
const isMoving = ref(false)
const isShowPlaylist = ref(false)
const now = ref('0')
const index = ref(0)
const lrc = ref()
const barLeft = ref('-11px')
const playBgWidth = ref('0%')
const volBgHeight = ref('0px')
const volControlTop = ref('84px')

const { prev, next, play, pause } = usePlay(audioRef as unknown as HTMLAudioElement, isPaused)

onMounted(() => {
  onClickOutside(playBarRef.value, () => {
    isShowPlaylist.value = false
    isShowVol.value = false
    store.actionUpdateSetting({ volume: audioRef.value?.volume })
  })
})

const resetProgressBar = () => {
  playBgWidth.value = '0%'
  barLeft.value = '-11px'
}

provide(playBarProvide, {
  playBarRef,
  barRef,
  audioRef,
  isPaused,
  playBg,
  moveBtn,
  lrc,
  wordRef,
  isShowPlaylist,
  isShowVol,
  index,
  now,
  isMoving,
  btnWidth,
  progressBarWidth,
  playBgWidth,
  barLeft,
  volBgHeight,
  volControlTop,

  resetProgressBar,
  prev,
  next,
  play,
  pause
})
</script>

<style lang="scss" scoped>
.playBar-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  z-index: 100;
}
</style>
