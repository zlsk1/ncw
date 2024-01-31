<template>
  <div v-clickOutside="closePlayList">
    <div class="playBar-wrap">
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${store.currentSong?.id}.mp3`"
        :loop="store.setting?.mode === 2"
        :autoplay="!isPaused"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdate"
        @ended="ended"
      />
      <div ref="playBar" class="playBar-content">
        <div class="bg" />
        <div class="w980">
          <div class="content">
            <div class="btns fl-sb">
              <i class="prev" title="上一首(ctrl+←)" @click="prev" />
              <i
                v-if="isPaused"
                class="play"
                title="播放/暂停(ctrl+空格)"
                @click.stop="play()"
              />
              <i
                v-else
                class="pause"
                @click.stop="pause()"
              />
              <i class="next" title="下一首(ctrl+→)" @click="next" />
            </div>
            <div class="progressBar">
              <router-link class="img-container" :to="`/song/${store?.currentSong?.id}`">
                <i class="img-wrap" />
                <img :src="store.currentSong ? `${store.currentSong?.picUrl}?param=34y34` : 'https://s4.music.126.net/style/web2/img/default/default_album.jpg?param=34y34'">
              </router-link>
              <div class="bar-wrap">
                <div class="info">
                  <router-link class="track-name ellipsis-1" :to="`/song/${store?.currentSong?.id}`" :title="store.currentSong?.name">
                    {{ store.currentSong?.name }}
                  </router-link>
                  <div class="singer-name">
                    <router-link
                      v-for="(item, i) in store.currentSong?.singer?.split('/')"
                      :key="i"
                      class="ellipsis-1"
                      to="/"
                      :title="store.currentSong.singer"
                    >
                      {{ store.currentSong?.singer.split('/').length === 1 ? item : i === store.currentSong?.singer.split('/').length - 1 ? item : `${item}/` }}
                    </router-link>
                  </div>
                  <router-link to="/">
                    <i v-if="store.currentSong && store.currentSong.name" class="from" title="来自歌单" />
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
                <span class="end">{{ formatSongDuration(store.currentSong?.time, 0) }}</span>
              </div>
            </div>
            <div class="opera">
              <div class="fl">
                <i class="pip" title="画中画歌词" />
                <i class="addlist" title="收藏" />
                <i class="share" title="分享" />
              </div>
              <div class="fl">
                <div v-show="isShowVol" ref="volWrap" class="vol-wrap">
                  <div class="vol-bg" @click="clickVol">
                    <div ref="volBg" class="bg-red" />
                  </div>
                  <div ref="volControl" class="vol-control-icon" @mousedown="controlVol">
                    <div class="inner" />
                  </div>
                </div>
                <i class="volume" @click="openVolControl" />
                <i
                  :class="['playType-byOrder', 'playType-byRadom', 'playType-byLoop'][store.setting?.mode]"
                  :title="['循环', '随机', '单曲循环'][store.setting?.mode]"
                  @click="switchMode"
                />
                <div class="playlist">
                  <i class="playlist-icon" title="播放列表" @click.stop="isShow = !isShow" />
                  <span class="playlist-count">
                    {{ store.songQueue?.length }}
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
      <img :src="store.currentSong?.picUrl" alt="" class="bg-img">
      <div class="play-queue">
        <div class="header fl-sb">
          <p class="fw">
            播放列表({{ store.songQueue?.length }})
          </p>
          <ul class="fl">
            <li>
              <i class="add-like" />
              <span>收藏全部</span>
            </li>
            <li @click="store.actionDelAll">
              <i class="del" />
              <span>清除</span>
            </li>
          </ul>
        </div>
        <div v-if="store?.songQueue.length !== 0" class="content">
          <div
            v-for="(item, i) in store.songQueue"
            :key="item.id"
            class="item fl-sb"
            @click="chooseSong(item, i, item.id)"
          >
            <div class="play-wrap">
              <div v-if="i === store?.index" class="play" />
            </div>
            <p class="name">
              {{ item.name }}
            </p>
            <div>
              <div class="icons">
                <i class="add-like" title="收藏" />
                <i class="share" title="分享" />
                <i class="download" title="下载" />
                <i class="del" title="删除" @click.stop="store.actionDelSong(i)" />
              </div>
              <p class="singer ellipsis-1">
                <router-link
                  v-for="(item1, i1) in item.singer.split('/')"
                  :key="i1"
                  to="/"
                  :title="item.singer"
                >
                  {{ i1 === item.singer.split('/').length - 1 ? item1 : `${item1}/` }}
                </router-link>
              </p>
              <p class="duration">
                {{ formatSongDuration(item.time, 0) }}
              </p>
              <i class="from" />
            </div>
          </div>
        </div>
        <div v-else class="no-song">
          <div class="fl-center">
            <i class="icon-face" />
            <p>你还没有添加任何歌曲</p>
          </div>
          <p>
            去首页<router-link to="/">
              发现音乐
            </router-link>, 或在<router-link to="/">
              我的音乐
            </router-link>收听自己收藏的歌单。
          </p>
        </div>
      </div>
      <div class="lyric">
        <div class="name">
          <i class="close" @click.stop="isShow = false" />
          {{ store.currentSong?.name }}
        </div>
        <div ref="word" class="word">
          <p
            v-for="(item, i) in lrc"
            :key="i"
            :data-time="judgeJson(item) ? JSON.parse(item).t / 1000 : Number(item.split(']')[0].split('[')[1]?.split(':')[0] * 60) + Number(item.split(']')[0].split('[')[1]?.split(':')[1])"
            class="per-line"
          >
            {{ judgeJson(item)
              ? JSON.parse(item).c.length === 1
                ? JSON.parse(item).c[0].tx
                : `${JSON.parse(item).c[0].tx}${JSON.parse(item).c[1].tx}`
              : item.split(']')[1] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { formatSongDuration } from '@/utils/time'
import { judgeJson } from '@/utils/index'
import { getLyric } from '@/apis/song'
import { usePlayStore } from '@/stores/play'
import { debounce } from '@/utils/index'

const store = usePlayStore()

const progressBarWidth = 466
const btnWidth = 11
const moveBtn = ref(null)
const playBar = ref(null)
const audio = ref(null)
const volControl = ref(null)
const volWrap = ref(null)
const volBg = ref(null)
const isPaused = ref(true)
const isShowVol = ref(false)
const isMove = ref(false)
const isShow = ref(false)
const now = ref('00:00')
const pregressTime = ref('')
const word = ref('')
const index = ref(0)
const lrc = ref(null)

onBeforeUnmount(() => {
  store.actionUpdateSetting({ volume: audio.value.volume })
  openVolControl = null; play = null; pause = null; mousedown = null; clickProgress = null; clickProgress = null; closePlayList = null; prev = null
  next = null; controlVol = null; clickVol = null; chooseSong = null; switchMode = null
  window.removeEventListener('keyup', keyup)
})

// 监听当前歌曲的变化（解决正在播放时切换其他的歌曲不能正常播放）
watch(() => store.currentSong, (newVal, oldVal) => {
  if (oldVal === undefined) { // 播放列表长度从0变为1时
    play()
    return
  } else if (newVal && newVal.id === oldVal.id) { // newVal&&将删除全部时排除在外
    audio.value.currentTime = 0
    play()
  } else {
    play()
  }
})

const loadedmetadata = e => {
  if (store.currentSong.id) {
    getLrc(store.currentSong.id)
  }
}

let play = () => {
  audio.value.play()
  isPaused.value = false
}

let pause = () => {
  audio.value.pause()
  isPaused.value = true
}

const timeupdate = e => {
  if (!isMove.value) {
    now.value = e.target.currentTime
    const percent = now.value / store.currentSong?.time * 1000 * 100
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
  document.querySelector('.played-bg').style.width = 0 + '%'
  moveBtn.value.style.left = '-11px'
  next()
}

let mousedown = e1 => {
  if (store.currentSong) {
    e1.preventDefault()
    const playedBg = document.querySelector('.played-bg')
    const Parentleft = document.querySelector('.bar-wrap').getBoundingClientRect().left
    const mousemove = e2 => {
      if (e2.clientX > Parentleft && e2.clientX <= Parentleft + progressBarWidth) {
        isMove.value = true
        const moveDistance = e2.clientX - Parentleft
        const percent = moveDistance / progressBarWidth
        pregressTime.value = percent * store.currentSong.time / 1000
        moveBtn.value.style.left = -btnWidth + moveDistance + 'px'
        playedBg.style.width = percent * 100 + '%'
        now.value = store.currentSong.time / 1000 * percent
      }
      playBar.value.onmouseup = (e) => {
        e.stopPropagation()
        audio.value.currentTime = pregressTime.value
        playBar.value.onmousemove = null
        playBar.value.onmouseup = null
      }
    }
    playBar.value.onmousemove = debounce(mousemove, 16)
  }
}

let clickProgress = e => {
  if (store.currentSong) {
    const clientX = document.querySelector('.bar-wrap').getBoundingClientRect().left
    const playedBg = document.querySelector('.played-bg')
    const moveDistance = e.clientX - clientX
    pregressTime.value = (moveDistance / progressBarWidth) * store.currentSong.time / 1000
    moveBtn.value.style.left = -btnWidth + moveDistance + 'px'
    playedBg.style.width = (moveDistance / progressBarWidth) * 100 + '%'
    audio.value.currentTime = pregressTime.value
  }
}

let prev = () => {
  onelength()
  if (store.index > 0) {
    store.actionUpdateIndex(store.index - 1)
  } else {
    store.actionUpdateIndex(store.songQueue.length - 1)
  }
}

let next = () => {
  onelength()
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

let controlVol = e => {
  e.preventDefault()
  const parentTop = volWrap.value.getBoundingClientRect().top
  const mousemove = e1 => {
    {
      const moveDistance = e1.clientY - parentTop - 6
      if (moveDistance < 99 && moveDistance > 6) {
        volControl.value.style.top = moveDistance + 'px'
        volBg.value.style.height = 99 - moveDistance + 'px'
        audio.value.volume = ((90 - moveDistance) / 90).toFixed(1) > 0 ? ((90 - moveDistance) / 90).toFixed(1) : 0
      }
    }
    volWrap.value.onmouseup = () => {
      volWrap.value.onmouseup = null
      volWrap.value.onmousemove = null
      volWrap.value.onmousemove = null
    }
  }
  volWrap.value.onmousemove = debounce(mousemove, 16)
}

let clickVol = e => {
  const parentTop = volWrap.value.getBoundingClientRect().top
  const moveDistance = e.clientY - parentTop - 6
  if (moveDistance < 99 && moveDistance > 6) {
    volControl.value.style.top = moveDistance + 'px'
    volBg.value.style.height = 99 - moveDistance + 'px'
    audio.value.volume = ((90 - moveDistance) / 90).toFixed(1) > 0 ? ((90 - moveDistance) / 90).toFixed(1) : 0
  }
}

let openVolControl = () => {
  isShowVol.value = !isShowVol.value
  volControl.value.style.top = 99 - (90 * store.setting.volume) + 'px'
  volBg.value.style.height = 90 * store.setting.volume + 'px'
  if (!isShowVol.value) store.actionUpdateSetting({ volume: audio.value.volume }) // 关闭时再存储音量
}

let closePlayList = () => {
  isShow.value = false
  isShowVol.value = false
  store.actionUpdateSetting({ volume: audio.value.volume })
}

let chooseSong = (item, i, id) => {
  store.actionUpdateIndex(i)
  play()
  getLrc(id)
}

let switchMode = () => {
  const mode = store.setting.mode >= 2 ? 0 : ++store.setting.mode
  store.actionUpdateSetting({ mode })
}

const getLrc = async id => {
  const res = await getLyric(id)
  lrc.value = res.data.lrc.lyric.split('\n')
}

const keyup = e => {
  if (e.ctrlKey && e.code === 'Space') {
    store.currentSong && isPaused.value ? play() : pause()
  } else if (e.ctrlKey && e.code === 'ArrowRight') {
    onelength()
    next()
  } else if (e.ctrlKey && e.code === 'ArrowLeft') {
    onelength()
    prev()
  }
}

window.addEventListener('keyup', keyup)

const onelength = () => { if (store.songQueue.length === 1) return }
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
          left: 10px;
          top: 99px;
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
  z-index: 20;
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
        &:hover {
          color: #fff;
        }
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
        .play-wrap {
          width: 20px;
        }
        .icons {
          display: none;
          i {
            margin-right: 10px;
          }
        }
        .name {
          flex: 5;
        }
        div {
          display: flex;
          align-items: center;
          .singer {
            width: 80px;
            a {
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .duration {
            margin: 0 30px;
          }
        }
      }
    }
    .no-song {
      width: 300px;
      height: 70px;
      margin: 95px auto 0 auto;
      text-align: center;
      >div {
        margin-bottom: 20px;
      }
      .icon-face {
        width: 36px;
        height: 29px;
        margin-right: 15px;
        background: url('@/assets/icons/playlist.png') -138px 0 no-repeat;
      }
      a {
        text-decoration: underline;
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
      color: #fff;
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
