import { unref, onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { usePlayStore } from '@/stores/play'

const store = usePlayStore()

export const usePlay = (audioRef: HTMLAudioElement, isPaused: Ref<boolean>) => {
  const play = () => {
    unref(audioRef).play()
    isPaused.value = false
    store.status = 1
  }

  const pause = () => {
    unref(audioRef).pause()
    isPaused.value = true
    store.status = 0
  }
  
  const prev = () => {
    isOnelength()
    if (store.index > 0) {
      store.actionUpdateIndex(store.index - 1)
    } else {
      store.actionUpdateIndex(store.songQueue.length - 1)
    }
  }
  
  const next = () => {
    isOnelength()
    // 顺序播放
    if (store.setting.mode === 0) {
      if (store.index !== store.songQueue.length - 1) {
        store.actionUpdateIndex(store.index + 1)
      } else {
        store.actionUpdateIndex(0)
      }
    } else if (store.setting.mode === 1) { // 随机播放
      const i = Math.floor(Math.random() * store.songQueue.length)
      store.actionUpdateIndex(i)
    }
  }

  const isOnelength = () => {
    if (store.songQueue.length === 1) return
  }

  const keyup = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === 'Space') {
      store.currentSong && isPaused.value ? play() : pause()
    } else if (e.ctrlKey && e.code === 'ArrowRight') {
      isOnelength()
      next()
    } else if (e.ctrlKey && e.code === 'ArrowLeft') {
      isOnelength()
      prev()
    }
  }
  
  onMounted(() => window.addEventListener('keyup', keyup))

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', keyup)
  })

  return {
    play,
    pause,
    prev,
    next
  }
}