<template>
  <div class="playBar-wrap">
    <audio ref="audio" src="https://music.163.com/song/media/outer/url?id=id.mp3">
      <source :src="props.songInfo.url">
    </audio>
    <div ref="playBar" class="playBar-content">
      <div class="bg" />
      <div class="w980">
        <div class="content">
          <div class="btns fl-sb">
            <i class="prev" />
            <i class="play" />
            <!-- <i class="suspend" /> -->
            <i class="next" />
          </div>
          <div class="progressBar">
            <router-link class="img-container" to="/">
              <i class="img-wrap" />
              <img src="https://p2.music.126.net/PXc76l9725qEnC1j-bMRrQ==/109951166261476409.jpg" alt="">
            </router-link>
            <div class="bar-wrap">
              <div class="info">
                <router-link class="track-name" to="/">
                  {{ props.songInfo.name }}
                </router-link>
                <router-link class="singer-name" to="/">
                  {{ props.songInfo.singer }}
                </router-link>
                <router-link to="/">
                  <i class="from" />
                </router-link>
              </div>
              <div class="bar" @click="clickProgress">
                <i ref="moveBtn" class="moveBtn" @mousedown="mousedown" />
                <div class="bar-bg" />
                <div class="played-bg" />
              </div>
            </div>
            <div class="time">
              <span class="now">{{ formatSongDuration(now) }} /</span>
              <span class="end">{{ formatSongDuration(end) }}</span>
            </div>
          </div>
          <div class="opera">
            <div class="fl">
              <i class="pip" />
              <i class="addlist" />
              <i class="share" />
            </div>
            <div class="fl">
              <i class="volume" />
              <i class="playType" />
              <i class="playlist" />
            </div>
          </div>
          <i class="lock" />
          <i class="unlock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatSongDuration } from '@/utils/time.js'
const props = defineProps({
  songInfo: { type: Object, default: () => {} }
})

const moveBtn = ref('')
const playBar = ref('')
const now = ref('00:00')
const end = ref(props.songInfo.br)
const progressBarWidth = 466
const btnWidth = 11

const mousedown = e1 => {
  e1.preventDefault()
  const playedBg = document.querySelector('.played-bg')
  const clientX = document.querySelector('.bar-wrap').getBoundingClientRect().left
  playBar.value.onmousemove = e2 => {
    e2.stopPropagation()
    if (e2.clientX > clientX && e2.clientX <= clientX + progressBarWidth) {
      const moveDistace = e2.clientX - clientX - btnWidth
      moveBtn.value.style.left = moveDistace + 'px'
      playedBg.style.width = ((moveDistace / progressBarWidth) * 100) + 0.6 + '%'
    }
    playBar.value.onmouseup = (e) => {
      e.stopPropagation()
      playBar.value.onmousemove = null
      playBar.value.onmouseup = null
    }
    playBar.value.onmouseout = () => {
      playBar.value.onmousemove = null
    }
  }
}
const clickProgress = e => {
  const clientX = document.querySelector('.bar-wrap').getBoundingClientRect().left
  const playedBg = document.querySelector('.played-bg')
  const moveDistace = e.clientX - clientX - btnWidth
  moveBtn.value.style.left = moveDistace + 'px'
  playedBg.style.width = ((moveDistace / progressBarWidth) * 100) + 0.6 + '%'
}
</script>

<style lang="scss" scoped>
.playBar-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  .playBar-content {
    position: absolute;
    zoom: 1;
    top: -53px;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
  }
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
    .btns {
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
      .suspend {
        width: 36px;
        height: 36px;
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
      }
      .info {
        display: flex;
        .track-name {
          margin-right: 10px;
          font-size: 12px;
          color: #fff;
        }
        .singer-name {
          margin-right: 10px;
          font-size: 12px;
          color: #666;
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
      display: flex;
      margin-top: 16px;
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
      .playType {
        width: 25px;
        height: 25px;
        background-position: -3px -344px;
        &:hover {
          background-position: -33px -344px;
        }
      }
      .playlist {
        width: 60px;
        height: 25px;
        background-position: -42px -68px;
        &:hover {
          background-position: -42px -98px;
        }
      }
    }
  }
}
</style>
