<template>
  <audio
    ref="audioRef"
    :src="`https://music.163.com/song/media/outer/url?id=${store.currentSong?.id}.mp3`"
    :loop="isLoop"
    :autoplay="!isPaused"
    @loadedmetadata="loadedmetadata"
    @timeupdate="timeupdate"
    @ended="ended"
  ></audio>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { usePlayStore } from '@/stores/play'
import { getLyric } from '@/apis/song'
import { playBarProvide } from './constances'

const {
  isPaused,
  audioRef,
  wordRef,
  lrc,
  isShowPlaylist,
  now,
  isMoving,
  index,

  resetProgressBar,
  next
} = inject(playBarProvide)!

const store = usePlayStore()

const isLoop = computed(() => {
  return store.setting?.mode === 2 || store.songQueue.length === 1
})

const getLrc = async(id: number) => {
  const res = await getLyric(id)
  lrc.value = res.data.lrc.lyric.split('\n')
}

const loadedmetadata = () => {
  if (store.currentSong?.id) {
    getLrc(store.currentSong.id)
  }
}

const timeupdate = (e: Event) => {
  if (!isMoving.value) {
    now.value = (e.target as HTMLAudioElement).currentTime
  }
  if (isShowPlaylist.value) {
    const _index = [...wordRef.value.children].findIndex(v => (v as any).dataset.time > (e.target as HTMLAudioElement).currentTime)
    if (index.value < _index) {
      wordRef.value.children[index.value].textContent ? wordRef.value.children[index.value].classList.add('active-lyric') : ''
      wordRef.value.children[index.value - 1]?.classList.remove('active-lyric')
      wordRef.value.scrollTo({ top: _index * 32 - 128, behavior: 'smooth' })
      index.value = _index
    }
  }
}

const ended = () => {
  now.value = '0'
  resetProgressBar()
  next()
}

onMounted(() => {
  audioRef.value.volume = store.setting.volume
})

onUnmounted(() => store.actionUpdateSetting({ volume: audioRef.value.volume }))
</script>
