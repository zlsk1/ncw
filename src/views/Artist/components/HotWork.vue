<template>
  <div v-loading="isLoad">
    <ul class="btns fl f12">
      <li class="play fl">
        <i @click="addPlaylist()">
          <i class="icon-play" />
          播放
        </i>
        <i class="icon-add" title="添加到播放列表" @click="addPlaylist()" />
      </li>
      <li class="like">
        <i class="icon-like">收藏热门50</i>
      </li>
    </ul>
    <table cellspacing="0">
      <tbody>
        <tr v-for="(item, index) in topSongList" :key="item.id" :class="index % 2 === 0 ? 'stripe' : ''">
          <td class="index" style="width: 60px;">
            {{ index + 1 }}
          </td>
          <td>
            <div class="fl title">
              <i class="icon icon-play" @click="play({id: item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')})" />
              <router-link class="name ellipsis-1" :to="`/song/${item.id}`" :title="item.name">
                {{ item.name }}
              </router-link>
            </div>
          </td>
          <td class="duration" style="width: 100px">
            <span class="time">{{ formatSongDuration(item.dt, 0) }}</span>
            <div class="fl-sb">
              <i class="icon icon-add" title="添加到播放列表" @click="play({id: item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')}, 1)" />
              <i class="icon icon-collect" title="收藏" />
              <i class="icon icon-share" title="分享" />
              <i class="icon icon-download" title="下载" />
            </div>
          </td>
          <td style="width: 30%">
            <div class="singer ellipsis-1">
              <router-link
                :title="item.al.name"
                to="/"
              >
                {{ item.al.name }}
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getArtistTopSongAPI } from '@/apis/artist'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { formatSongDuration } from '@/utils/time'
import { usePlayStore } from '@/stores/play'

const route = useRoute()

const playStore = usePlayStore()

const topSongList = ref([])
const isLoad = ref(true)

onMounted(() => {
  getTopSong(route.params.id)
})

onBeforeUnmount(() => {
  play = null; addPlaylist = null
})

onBeforeRouteUpdate((to) => {
  if (to) {
    getTopSong(to.params.id)
  }
})

const getTopSong = async id => {
  const res = await getArtistTopSongAPI(id)
  topSongList.value = res.data.songs
  isLoad.value = false
}

let play = (o, type) => { playStore.actionAddSong(o, type) }

let addPlaylist = async id => {
  const ids = topSongList.value.map(v => v.id).join(',')
  playStore.actionGetSongs(ids, topSongList.value)
}
</script>

<style lang="scss" scoped>
$mainWidth: 640px;
.btns {
  margin-bottom: 10px;
  color: #333;
  i {
    display: block;
    background: url('@/assets/icons/button2.png') no-repeat;
  }
  li {
    margin-right: 6px;
    padding: 0 5px 0 0;
    white-space: nowrap;
    cursor: pointer;
  }
  .play {
    margin-right: 3px;
    text-align: center;
    color: #fff;
    i {
      display: flex;
      height: 31px;
      padding: 0 7px 0 8px;
      line-height: 31px;
      background-position: 0 -387px;
    }
    .icon-play {
      display: block;
      width: 20px;
      height: 18px;
      margin: 6px 4px 2px 0;
      background-position: 0 -1622px;
    }
    .icon-add {
      width: 34px;
      height: 31px;
      margin-left: -3px;
      text-align: center;
      background-position: 0 -1588px;
    }
  }
  .like {
    background: url('@/assets/icons/button2.png') no-repeat;
    background-position: right -1020px;
    .icon-like {
      min-width: 23px;
      height: 31px;
      line-height: 31px;
      padding-right: 2px;
      padding-left: 28px;
      background-position: 0 -977px;
    }
  }
}
table {
  width: $mainWidth;
  font-size: 12px;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  thead {
    background: linear-gradient(#fff,#fafafa,#fbfbfb,#fcfcfc,#fdfdfd,#f8f8f8,#f7f7f7,#f6f6f6,#f5f5f5,#f4f4f4,#f3f3f3);
    box-shadow: 0 1px 4px #ccc;
    tr {
      height: 36px;
      th {
        padding-left: 8px;
        text-align: start;
        font-weight: normal;
        color: #666;
      }
    }
  }
  tbody {
    tr {
      height: 30px;
      line-height: 30px;
      td {
        padding: 0 8px;
      }
      .duration {
        .time {
          color: #666;
        }
      }
      .index {
        color: #999;
        text-align: center;
      }
      .title {
        align-items: center;
        img {
          margin: 10px 10px 10px 0;
        }
        .name {
          max-width: 84%;
          margin-left: 10px;
        }
      }
      .singer {
        max-width: 84%;
      }
      &:hover {
        .time {
          display: none;
        }
        .icon-add {
          width: 13px;
          height: 13px;
          margin-top: -2px;
          background: url('@/assets/icons/icon.png') 0 -700px no-repeat;
          &:hover {
            background-position: -22px -700px;
          }
        }
        .icon-collect {
          width: 18px;
          height: 16px;
          background-position: 0 -174px;
          &:hover {
            background-position: -20px -174px;
          }
        }
        .icon-share {
          width: 18px;
          height: 16px;
          background-position: 0 -195px;
          &:hover {
            background-position: -20px -195px;
          }
        }
        .icon-download {
          width: 18px;
          height: 16px;
          background-position: -81px -174px;
          &:hover {
            background-position: -104px -174px;
          }
        }
      }
    }
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .stripe {
    background-color: #f7f7f7;
  }
  .icon {
    display: block;
    background: url('@/assets/icons/table.png') no-repeat;
    cursor: pointer;
  }
  .icon-play {
    width: 17px;
    height: 17px;
    background-position: 0 -103px;
    &:hover {
      background-position: 0 -128px;
    }
  }
  .icon-played  {
    width: 17px;
    height: 17px;
    background-position: -20px -128px
  }
}
</style>
