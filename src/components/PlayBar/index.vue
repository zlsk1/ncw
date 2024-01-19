<template>
  <div v-clickOutside="closePlayList">
    <div class="playBar-wrap">
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${props.currentSong?.id}.mp3`"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdate"
        @ended="ended"
      />
      <div ref="playBar" class="playBar-content">
        <div class="bg" />
        <div class="w980">
          <div class="content">
            <div class="btns fl-sb">
              <i class="prev" @click="prev" />
              <i v-if="paused" class="play" @click.stop="play()" />
              <i v-else class="pause" @click.stop="pause()" />
              <i class="next" @click="next" />
            </div>
            <div class="progressBar">
              <router-link class="img-container" to="/">
                <i class="img-wrap" />
                <img :src="props.currentSong?.picUrl" alt="">
              </router-link>
              <div class="bar-wrap">
                <div class="info">
                  <router-link class="track-name" to="/">
                    {{ props.currentSong?.name }}
                  </router-link>
                  <router-link class="singer-name" to="/">
                    {{ props.currentSong?.singer }}
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
                <span class="now">{{ formatSongDuration(now, 1) }} /</span>
                <span class="end">{{ formatSongDuration(end, 0) }}</span>
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
                <div class="playlist">
                  <i class="playlist-icon" @click.stop="isShow = !isShow" />
                  <span class="playlist-count">
                    {{ songQueue?.length }}
                  </span>
                </div>
              </div>
            </div>
            <i class="lock" />
            <i class="unlock" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShow" class="play-queue-wrap w980 fl">
      <img :src="props.currentSong?.picUrl" alt="" class="bg-img">
      <div class="play-queue">
        <div class="header fl-sb">
          <p class="fw">
            播放列表({{ songQueue?.length }})
          </p>
          <ul class="fl">
            <li>
              <i class="add-like" />
              <span>收藏全部</span>
            </li>
            <li>
              <i class="del" />
              <span>清除</span>
            </li>
          </ul>
        </div>
        <div class="content">
          <div
            v-for="item in songQueue"
            :key="item.id"
            class="item fl-sb"
            @click="emit('changeCurrent', item)"
          >
            <div v-if="item.id === props.currentSong.id" class="play" />
            <p class="name">
              {{ item.name }}
            </p>
            <div>
              <div class="icons">
                <i class="add-like" />
                <i class="share" />
                <i class="download" />
                <i class="del" />
              </div>
              <router-link to="/" class="singer ellipsis-1">
                {{ item.singer }}
              </router-link>
              <p class="duration">
                {{ formatSongDuration(item.time, 0) }}
              </p>
              <i class="from" />
            </div>
          </div>
        </div>
      </div>
      <div class="lyric">
        <div class="name">
          <i class="close" @click.stop="isShow = false" />
          {{ props.currentSong?.name }}
        </div>
        <div ref="word" class="word">
          <p
            v-for="(item, index) in props?.currentSong.lrc"
            :key="index"
            :data-time="judgeJson(item) ? JSON.parse(item).t / 1000 : Number(item.split(']')[0].split('[')[1]?.split(':')[0] * 60) + Number(item.split(']')[0].split('[')[1]?.split(':')[1])"
            class="per-line"
          >
            {{ judgeJson(item) ? JSON.parse(item).c[0].tx : item.split(']')[1] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { formatSongDuration } from '@/utils/time'
import { judgeJson } from '@/utils/index'
const props = defineProps({
  currentSong: { type: Object, default: () => {} }
})
const emit = defineEmits(['changeCurrent'])

const progressBarWidth = 466
const btnWidth = 11
const moveBtn = ref('')
const playBar = ref('')
const audio = ref('')
const paused = ref(true)
const now = ref('00:00')
const end = ref(props.currentSong?.time)
const pregressTime = ref('')
const isMove = ref(false)
const isShow = ref(false)
const songQueue = ref(JSON.parse(localStorage.getItem('song_queue')))
const word = ref('')
const index = ref(0)

watch(() => props.currentSong, async val => {
  // console.log(val)
  end.value = val.time
  const songs = await JSON.parse(localStorage.getItem('song_queue')) || []
  songs.some(v => v.id === val.id) ? '' : songs.unshift(val)
  songQueue.value = songs
  localStorage.setItem('song_queue', JSON.stringify(songs))
})

const loadedmetadata = e => {
  // console.log(e)
  // play()
}
const play = () => {
  audio.value.play()
  paused.value = false
}
const pause = () => {
  audio.value.pause()
  paused.value = true
}
const timeupdate = e => {
  if (!isMove.value) {
    now.value = e.target.currentTime
    const percent = now.value / props.currentSong.time * 1000 * 100
    document.querySelector('.played-bg').style.width = percent + btnWidth / progressBarWidth + '%'
    moveBtn.value.style.left = `calc(${percent}% - ${btnWidth}px)`
  }
  if (isShow.value) {
    const _index = Array.from(word.value.children).findIndex((v, i) => v.dataset.time > e.target.currentTime)
    if (index.value < _index) {
      word.value.children[index.value].textContent ? word.value.children[index.value].classList.replace('per-line', 'active-lyric') : ''
      word.value.children[index.value - 1]?.classList.replace('active-lyric', 'per-line')
      word.value.scrollTo({ top: _index * 32 - 96, behavior: 'smooth' })
      index.value = _index
    }
  }
  isMove.value = isMove.value ? false : ''
}
const ended = () => {
  paused.value = true
  document.querySelector('.played-bg').style.width = 0 + '%'
  moveBtn.value.style.left = '-11px'
}

const mousedown = e1 => {
  e1.preventDefault()
  const playedBg = document.querySelector('.played-bg')
  const Parentleft = document.querySelector('.bar-wrap').getBoundingClientRect().left
  playBar.value.onmousemove = e2 => {
    if (e2.clientX > Parentleft && e2.clientX <= Parentleft + progressBarWidth) {
      isMove.value = true
      const moveDistance = e2.clientX - Parentleft
      const percent = moveDistance / progressBarWidth
      pregressTime.value = percent * props.currentSong.time / 1000
      moveBtn.value.style.left = -btnWidth + moveDistance + 'px'
      playedBg.style.width = percent * 100 + '%'
      now.value = props.currentSong.time / 1000 * percent
    }
    playBar.value.onmouseup = (e) => {
      e.stopPropagation()
      audio.value.currentTime = pregressTime.value
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
  const moveDistance = e.clientX - clientX
  pregressTime.value = (moveDistance / progressBarWidth) * props.currentSong.time / 1000
  moveBtn.value.style.left = -btnWidth + moveDistance + 'px'
  playedBg.style.width = (moveDistance / progressBarWidth) * 100 + '%'
  audio.value.currentTime = pregressTime.value
}

const closePlayList = () => { isShow.value = false }

const prev = () => {
  const i = songQueue.value.findIndex(v => v.id === props.currentSong.id)
  i > 0 ? emit('changeCurrent', songQueue.value[i - 1]) : emit('changeCurrent', songQueue.value[songQueue.value.length - 1])
}

const next = () => {
  const i = songQueue.value.findIndex(v => v.id === props.currentSong.id)
  i !== songQueue.value.length - 1 ? emit('changeCurrent', songQueue.value[i + 1]) : emit('changeCurrent', songQueue.value[0])
}
</script>

<style lang="scss" scoped>
.playBar-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  z-index: 100;
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
.play-queue-wrap {
  position: fixed;
  bottom: 46px;
  left: calc(50% - 490px);
  width: 100%;
  height: 300px;
  margin: auto;
  font-size: 12px;
  color: #e2e2e2;
  background-color: #1f1f1f;
  border-radius: 5px 5px 0 0;
  z-index: 999;
  overflow: hidden;
  .bg-img {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 600px;
    opacity: .1;
    z-index: 1;
  }
  i {
    display: block;
    background: url('@/assets/icons/playlist.png') no-repeat;
    cursor: pointer;
  }
  .add-like {
    width: 16px;
    height: 16px;
    background-position: -24px 0;
    &:hover {
      background-position: -24px -20px;
    }
  }
  .share {
    width: 14px;
    height: 16px;
    &:hover {
      background-position: 0 -20px;
    }
  }
  .del {
    width: 13px;
    height: 16px;
    background-position: -51px 0;
    &:hover {
      background-position: -51px -20px;
    }
  }
  .download {
    width: 14px;
    height: 16px;
    background-position: -57px -50px;
    &:hover {
      background-position: -80px -50px;
    }
  }
  .from {
    display: block;
    width: 14px;
    height: 15px;
    background: url('@/assets/icons/playbar.png') -110px -103px no-repeat;
    cursor: pointer;
    &:hover {
      background-position: -130px -103px;
    }
  }
  .close {
    position: absolute;
    top: 6px;
    right: 8px;
    width: 30px;
    height: 30px;
    background-position: -195px 9px;
    z-index: 4;
    &:hover {
      background-position: -195px -21px;
    }
  }
  .play {
    width: 10px;
    height: 13px;
    background: url('@/assets/icons/playlist.png') -182px 0 no-repeat;
  }
  .play-queue {
    flex: 4;
    color: #ccc;
    background-color: #262626;
    z-index: 4;
    mix-blend-mode: difference;
    a {
      color: #ccc;
    }
    .header {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background: url('@/assets/icons/playlist_bg.png') -78px 0 no-repeat;
      p {
        font-size: 14px;
      }
      ul li {
        display: flex;
        height: 15px;
        line-height: 15px;
        padding: 0 10px;
        cursor: pointer;
        &:hover span {
          text-decoration: underline;
        }
        &:hover .add-like {
          background-position: -24px -20px;
        }
        &:hover .share {
          background-position: 0 -20px;
        }
        &:hover .del {
          background-position: -51px -20px;
        }
        span {
          margin-left: 4px;
        }
      }
    }
    .content {
      height: 260px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #868686;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: #0c0c0f;
      }
      .item {
        height: 28px;
        padding: 0 10px;
        line-height: 28px;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #0b0b0b;
        }
        &:hover a {
          color: #fff;
        }
        &:hover .icons {
          display: flex;
        }
        .icons {
          display: none;
          i {
            margin-right: 10px;
          }
        }
        .name {
          flex: 5;
          margin-left: 10px;
        }
        div {
          display: flex;
          align-items: center;
          .singer {
            width: 80px;
          }
          .duration {
            margin: 0 30px;
          }
        }
      }
    }
  }
  .lyric {
    flex: 3;
    text-align: center;
    color: #989898;
    z-index: 4;
    .name {
      position: relative;
      height: 40px;
      line-height: 40px;
      background: url('@/assets/icons/playlist_bg.png') no-repeat;
    }
    .word {
      height: 220px;
      margin: 20px 0;
      padding: 0 30px;
      overflow-y: auto;
      div {
        transition: all .3s linear;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #868686;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: #0c0c0f;
      }
      .per-line {
        min-height: 32px;
        line-height: 32px;
        font-size: 12px;
        transition: color .7s linear;
      }
    }
  }
}
.active-lyric {
  line-height: 32px;
  font-size: 14px;
  color: #fff;
}
</style>
