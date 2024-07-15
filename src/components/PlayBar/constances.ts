import type { InjectionKey, Ref } from 'vue'

export type playBarContent = {
  playBarRef: Ref<HTMLElement>,
  barRef: Ref<HTMLElement>,
  audioRef: Ref<HTMLAudioElement>,
  isPaused: Ref<boolean>,
  playBg: Ref<HTMLElement>,
  moveBtn: Ref<HTMLElement>,
  wordRef: Ref<HTMLElement>,
  lrc: Ref<string[]>,
  isShowPlaylist: Ref<boolean>,
  isShowVol: Ref<boolean>,
  isMoving: Ref<boolean>,
  now: Ref<number | string>,
  playBgWidth: Ref<string>,
  barLeft: Ref<string>,
  volBgHeight: Ref<string>,
  volControlTop: Ref<string>,
  index: Ref<number>,
  btnWidth: number,
  progressBarWidth: number,
  
  resetProgressBar: () => void,
  prev: () => void,
  next: () => void,
  play: () => void,
  pause: () => void
}

export const playBarProvide:InjectionKey<playBarContent> = Symbol('playBarProvide')