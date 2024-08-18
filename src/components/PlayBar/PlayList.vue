<template>
  <div ref="playlistRef" class="play-queue-wrap w980 fl">
    <img
      :src="store.currentSong?.picUrl"
      alt=""
      class="bg-img"
    >
    <div class="play-queue">
      <div class="header fl-sb">
        <p class="fw">
          播放列表({{ store.songQueue?.length }})
        </p>
        <ul class="fl">
          <li>
            <i class="add-like"></i>
            <span>收藏全部</span>
          </li>
          <li @click="delAll">
            <i class="del"></i>
            <span>清除</span>
          </li>
        </ul>
      </div>
      <div v-if="store?.songQueue.length !== 0" class="content">
        <div
          v-for="(item, i) in store.songQueue"
          :key="item.id"
          class="item fl-sb"
          @click="chooseSong(i)"
        >
          <div class="play-wrap">
            <div v-if="i === store?.index" class="play"></div>
          </div>
          <p class="name ellipsis-1">
            {{ item.name }}
          </p>
          <div>
            <div class="icons">
              <i class="add-like" title="收藏"></i>
              <i class="share" title="分享"></i>
              <i class="download" title="下载"></i>
              <i
                class="del"
                title="删除"
                @click.stop="store.actionDelSong(i)"
              ></i>
            </div>
            <p class="singer ellipsis-1">
              <router-link
                v-for="(item1, i1) in item.singer?.split('/')"
                :key="i1"
                to="/"
                :title="item.singer"
              >
                {{ i1 === item.singer?.split('/').length! - 1 ? item1 : `${item1}/` }}
              </router-link>
            </p>
            <p class="duration">
              {{ formatSongDuration(item.time, 0) }}
            </p>
            <i class="from"></i>
          </div>
        </div>
      </div>
      <div v-else class="no-song">
        <div class="fl-center">
          <i class="icon-face"></i>
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
        <i class="close" @click.stop="isShowPlaylist = false"></i>
        {{ store.currentSong?.name }}
      </div>
      <div ref="wordRef" class="word">
        <p
          v-for="(item, i) in lrc"
          :key="i"
          :data-time="judgeJson(item) ? JSON.parse(item).t / 1000 : Number((item as any).split(']')[0].split('[')[1]?.split(':')[0] * 60) + Number((item as any).split(']')[0].split('[')[1]?.split(':')[1])"
          class="per-line"
        >
          {{ judgeJson(item)
            ? JSON.parse(item).c.length === 1
              ? JSON.parse(item).c[0].tx
              : `${JSON.parse(item).c[0].tx}${JSON.parse(item).c[1].tx}`
            : (item as string).split(']')[1] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onMounted, watch } from 'vue'
import { usePlayStore } from '@/stores/play'
import { judgeJson } from '@/utils/index'
import { getLyric } from '@/apis/song'
import { formatSongDuration } from '@/utils/time'
import { playBarProvide } from './constances'

const store = usePlayStore()

const {
  audioRef,
  wordRef,
  isPaused,
  lrc,
  isShowPlaylist,
  index,

  resetProgressBar,
  play
} = inject(playBarProvide)!

onMounted(() => {
  if (store.currentSong) {
    getLrc(store.currentSong.id)
  }
})

watch(() => store.currentSong, val => {
  if (!val) return
  if (wordRef.value) {
    index.value = 0
    wordRef.value.scrollTo({ top: 0 })
  }
  play()
})

const getLrc = async(id: number) => {
  const res = await getLyric(id)
  lrc.value = res.data.lrc.lyric.split('\n')
}

const chooseSong = (i: number) => {
  store.actionUpdateIndex(i)
  if (i === store.index) audioRef.value.currentTime = 0 // 重复选择相同歌曲 重播此歌曲
  play()
}

const delAll = () => {
  store.status = 0
  store.actionDelAll()
  lrc.value = []
  resetProgressBar()
  nextTick(() => { isPaused.value = true })
}
</script>

<style lang="scss" scoped>
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
          width: 180px;
          padding-right: 20px;
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
      height: 100%;
      padding: 30px;
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
