<template>
  <div ref="barRef" class="playBar-content">
    <div class="bg"></div>
    <div class="w980">
      <div class="content">
        <ControlPlay></ControlPlay>
        <div class="progressBar">
          <router-link class="img-container" :to="`/song/${store?.currentSong?.id}`">
            <i class="img-wrap"></i>
            <img :src="store.currentSong ? `${store.currentSong?.picUrl}?param=34y34` : 'https://s4.music.126.net/style/web2/img/default/default_album.jpg?param=34y34'">
          </router-link>
          <div ref="barWrapRef" class="bar-wrap">
            <div class="info">
              <router-link
                class="track-name ellipsis-1"
                :to="`/song/${store?.currentSong?.id}`"
                :title="store.currentSong?.name"
              >
                {{ store.currentSong?.name }}
              </router-link>
              <p class="singer-name ellipsis-1">
                <router-link
                  v-for="(item, i) in store.currentSong?.singer?.split('/')"
                  :key="i"
                  to="/"
                  :title="store.currentSong?.singer"
                >
                  <p>
                    {{ store.currentSong?.singer?.split('/').length === 1 ? item : i === store.currentSong?.singer?.split('/').length! - 1 ? item : `${item}/` }}
                  </p>
                </router-link>
              </p>
              <router-link to="/">
                <i
                  v-if="store.currentSong && store.currentSong.name"
                  class="from"
                  title="来自歌单"
                ></i>
              </router-link>
            </div>
            <div class="bar" @click="clickProgress">
              <i
                ref="moveBtn"
                :style="{ left: barLeft }"
                class="moveBtn"
                @mousedown="mousedown"
              ></i>
              <div class="bar-bg"></div>
              <div
                ref="playBg"
                :style="{ width: playedBgWidth }"
                class="played-bg"
              ></div>
            </div>
          </div>
          <div class="time">
            <template v-if="store.currentSong">
              <span class="now">{{ formatSongDuration(now, 1) }} /</span>
              <span class="end">{{ formatSongDuration(store.currentSong.time, 0) }}</span>
            </template>
            <template v-else>
              <span class="now">00:00 /</span>
            </template>
          </div>
        </div>
        <div class="opera">
          <div class="fl">
            <i
              class="pip"
              title="画中画歌词"
              @click="openPIP"
            ></i>
            <i class="addlist" title="收藏"></i>
            <i class="share" title="分享"></i>
          </div>
          <div class="fl">
            <VolControl></VolControl>
            <i class="volume" @click="openVolControl"></i>
            <i
              :class="['playType-byOrder', 'playType-byRadom', 'playType-byLoop'][store.setting?.mode]"
              :title="['循环', '随机', '单曲循环'][store.setting?.mode]"
              @click="switchMode"
            ></i>
            <div class="playlist">
              <i
                class="playlist-icon"
                title="播放列表"
                @click.stop="openPlaylist"
              ></i>
              <span class="playlist-count">
                {{ store.songQueue?.length }}
              </span>
            </div>
          </div>
        </div>
        <i class="lock"></i>
        <i class="unlock"></i>
      </div>
    </div>
    <video
      ref="PIPRef"
      src="https://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/32993990090/fa31b7abeff1f3490ad289c68da636be.mp4?wsSecret=293ef8d6c8b044c89b54630e84fcfc1b&wsTime=1716904418"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { formatSongDuration } from '@/utils/time'
import ControlPlay from './ControlPlay.vue'
import { usePlayStore } from '@/stores/play'
import { useMouseInElement } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { playBarProvide } from './constances'

import type { settingType } from '@/config'

const store = usePlayStore()

const {
  audioRef,
  wordRef,
  isMoving,
  progressBarWidth,
  btnWidth,
  barLeft,
  playedBgWidth,
  now,
  index,
  isShowVol,
  isShowPlaylist,
  volBgHeight,
  volControlTop
} = inject(playBarProvide)!

const barWrapRef = ref(null)
const PIPRef = ref()
const isIn = computed(() => left.value > 0 && left.value <= progressBarWidth)

const { elementX: left } = useMouseInElement(barWrapRef)

const percent = computed(() => left.value / progressBarWidth)

const pregressTime = computed(() => {
  if (store.currentSong?.time) {
    return percent.value * store.currentSong.time / 1000
  }
  return 0
})

const mousedown = (e: MouseEvent) => {
  if (store.currentSong) {
    e.preventDefault()
    window.onmousemove = () => {
      if (isIn.value) {
        isMoving.value = true
        setProgress()
      }
    }
    window.onmouseup = (e1: MouseEvent) => {
      e1.stopPropagation()
      isMoving.value = false
      audioRef.value.currentTime = pregressTime.value
      window.onmousemove = null
      window.onmouseup = null
    }
  }
}

const setProgress = () => {
  barLeft.value = left.value - btnWidth + 'px'
  playedBgWidth.value = percent.value * 100 + '%'
  if (store.currentSong?.time) {
    now.value = store.currentSong.time / 1000 * percent.value
  }
}

const clickProgress = () => {
  if (store.currentSong) {
    if (isIn.value) {
      setProgress()
      audioRef.value.currentTime = pregressTime.value
    }
  }
}

const openVolControl = () => {
  isShowVol.value = !isShowVol.value
  volControlTop.value = 84 - (90 * store.setting.volume) + 'px'
  volBgHeight.value = 90 * store.setting.volume + 'px'
  if (!isShowVol.value) store.actionUpdateSetting({ volume: audioRef.value.volume }) // 关闭时再存储音量
}

const switchMode = () => {
  const mode = (store.setting.mode >= 2 ? 0 : ++store.setting.mode) as settingType['mode']
  store.actionUpdateSetting({ mode })
}

const openPlaylist = async() => {
  isShowPlaylist.value = !isShowPlaylist.value
  if (isShowPlaylist.value) {
    setTimeout(() => { wordRef.value.scrollTo({ top: index.value * 32 - 128 }) }, 0)
  }
}

const openPIP = async() => {
  //  若已存在画中画
  if (document.pictureInPictureElement) {
    // 关闭画中画
    document.exitPictureInPicture()
  }
  else {
    if (document.pictureInPictureEnabled) {
      if (!PIPRef.value?.requestPictureInPicture) return ElMessage.error('您的浏览器暂不支持此功能')
      // 新建元数据
      if (!store.currentSong) {
        return
      }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: store.currentSong.name,
        artist: store.currentSong.singer,
        artwork: [
          {
            src: store.currentSong.picUrl
          }
        ]
      })

      try {
        PIPRef.value?.requestPictureInPicture().then((pictureInPictureWindow: HTMLElement) => {
          pictureInPictureWindow.addEventListener(
            'resize',
            (e: Event) => console.log(e),
            false
          )
        })// 开启画中画
      }
      catch (err: any) {
        ElMessage.error('数据加载失败，请稍后再试')
        throw new Error(err)
      }
      PIPRef.value!.autoplay = true
      PIPRef.value!.play()

      // 添加控件
      if (navigator.mediaSession.setActionHandler) {
        // 控件处理事件
        navigator.mediaSession.setActionHandler('play', () => {
          // code here
        })
        navigator.mediaSession.setActionHandler('pause', () => {
        })
        navigator.mediaSession.setActionHandler('previoustrack', () => {
        })
        navigator.mediaSession.setActionHandler('nexttrack', () => {
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.playBar-content {
  position: absolute;
  zoom: 1;
  top: -53px;
  left: 0;
  width: 100%;
  height: 53px;
  margin: 0 auto;

  .bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 53px;
    margin-right: 67px;
    background: url('@/assets/icons/playbar.png') 0 0 repeat-x;
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: 53px;
    margin-top: 3px;
    i {
      display: block;
      background: url('@/assets/icons/playbar.png') no-repeat;
      cursor: pointer;
    }
    .progressBar {
      display: flex;
      align-items: center;
      margin-left: 20px;
      .img-container {
        position: relative;
        margin-right: 20px;
        .img-wrap {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 34px;
          height: 35px;
          background: url('@/assets/icons/playbar.png') 0 -80px no-repeat;
        }
        img {
          width: 34px;
          height: 34px;
        }
        .default-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 34px;
          height: 35px;
          background: url('@/assets/icons/playbar.png') 0 -80px no-repeat;
        }
      }
      .info {
        display: flex;
        height: 16px;
        .track-name {
          max-width: 300px;
          margin-right: 10px;
          font-size: 12px;
          color: #e8e8e8;
          &:hover {
            text-decoration: underline;
          }
        }
        .singer-name {
          max-width: 220px;
          margin-right: 10px;
          a {
            display: inline-block;
            font-size: 12px;
            color: #666;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .from {
          width: 14px;
          height: 15px;
          background-position: -110px -103px;
          &:hover {
            background-position: -130px -103px;
          }
        }
      }
      .bar {
        position: relative;
        display: flex;
        width: 466px;
        height: 10px;
        margin-top: 6px;
        .moveBtn {
          position: absolute;
          left: -11px;
          top: calc(50% - 12px);
          display: block;
          width: 22px;
          height: 24px;
          background: url('@/assets/icons/iconall.png') 0 -250px no-repeat;
          cursor: pointer;
          z-index: 200;
        }
        .bar-bg {
          width: 466px;
          height: 10px;
          background: url('@/assets/icons/statbar.png') right 0 no-repeat;
        }
        .played-bg {
          position: absolute;
          left: 0;
          width: 0;
          height: 10px;
          background: url('@/assets/icons/statbar.png') left -66px no-repeat;
          z-index: 100;
        }
      }
      .time {
        display: flex;
        margin: 20px 0 0 16px;
        font-size: 12px;
        .now {
          color: #aaa;
        }
        .end {
          color: #666;
        }
      }
    }
    .opera {
      position: relative;
      display: flex;
      margin-top: 16px;
      z-index: 30;
      >div {
        padding: 0 10px;
      }
      >div:nth-child(1) {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: calc(50% - 15px);
          width: 1px;
          height: 20px;
          background-color: #444;
        }
      }
      .pip {
        width: 25px;
        height: 25px;
        background: url('@/assets/icons/pip.png') no-repeat;
        &:hover {
          background-position: 0 -25px;
        }
      }
      .addlist {
        width: 25px;
        height: 25px;
        background-position: -88px -163px;
        &:hover {
          background-position: -88px -189px;
        }
      }
      .share {
        width: 25px;
        height: 25px;
        background-position: -114px -163px;
        &:hover {
          background-position: -114px -189px;
        }
      }
      .volume {
        width: 25px;
        height: 25px;
        background-position: -2px -248px;
        &:hover {
          background-position: -31px -248px;
        }
      }
      .playType-byOrder {
        width: 25px;
        height: 25px;
        background-position: -3px -344px;
        &:hover {
          background-position: -33px -344px;
        }
      }
      .playType-byRadom {
        width: 25px;
        height: 25px;
        background-position: -66px -248px;
        &:hover {
          background-position: -93px -248px;
        }
      }
      .playType-byLoop {
        width: 25px;
        height: 25px;
        background-position: -66px -344px;
        &:hover {
          background-position: -93px -344px;
        }
      }
      .playlist {
        position: relative;
        .playlist-icon {
          width: 60px;
          height: 25px;
          background-position: -42px -68px;
          &:hover {
            background-position: -42px -98px;
          }
        }
        .playlist-count {
          position: absolute;
          right: 16px;
          top: 6px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
