<template>
  <div class="toplist-wrap fl w980">
    <div class="switch-side">
      <h3 class="side-hader">
        云音乐特色榜
      </h3>
      <ul>
        <li v-for="item in topStore.topId.slice(0, 4)" :key="item.id">
          <router-link :to="`/discover/toplist/${item.id}`" class="side-items fl" :class="route.params.id == item.id ? 'side-active' : ''">
            <img :src="`${item.imgUrl}?param=40y40`" alt="" class="side-img">
            <div class="side-info">
              <p class="side-name ellipsis-1" :title="item.name">
                {{ item.name }}
              </p>
              <p class="side-update">
                {{ item.updateFrequency }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      <h3 class="side-hader">
        全球媒体榜
      </h3>
      <ul>
        <li v-for="item in topStore.topId.slice(4, 51)" :key="item.id">
          <router-link :to="`/discover/toplist/${item.id}`" class="side-items fl" :class="route.params.id == item.id ? 'side-active' : ''">
            <img :src="`${item.imgUrl}?param=40y40`" alt="" class="side-img">
            <div class="side-info">
              <p class="side-name ellipsis-1" :title="item.name">
                {{ item.name }}
              </p>
              <p class="side-update">
                {{ item.updateFrequency }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="toplist-main">
      <div class="main-header fl">
        <Pic
          :key="getTimestamp()"
          :src="topStore?.topId[currentIndex]?.imgUrl + '?param=150y150'"
          mask3
          class="cover-pic"
        />
        <div>
          <h3 class="top-name">
            {{ playlist?.name }}
          </h3>
          <div class="update-info">
            <i class="icon-clock" />
            <span>最近更新：{{ formatMonthDay(playlist?.updateTime) }}</span>
            <span>（{{ topStore?.topId[currentIndex]?.updateFrequency }}）</span>
          </div>
          <Btns
            :id="topStore?.topId[currentIndex]?.id"
            :dynamic="{
              bookedCount: playlist?.subscribedCount,
              shareCount: playlist?.shareCount,
              commentCount: playlist?.commentCount
            }"
          />
        </div>
      </div>
      <div class="main-playlist">
        <div class="playlist-heaeder fl-sb">
          <div class="fl-sb">
            <h3>歌曲列表</h3>
            <p>{{ playlist?.tracks.length }}首歌</p>
          </div>
          <p>播放：<span class="playCount">{{ playlist?.playCount }}</span>次</p>
        </div>
        <table cellspacing="0">
          <thead>
            <tr>
              <th style="width: 60px;" />
              <th style="border-left:1px solid #d1d1d1">
                标题
              </th>
              <th style="width: 100px;border-left:1px solid #d1d1d1">
                时长
              </th>
              <th style="width: 30%;border-left:1px solid #d1d1d1">
                歌手
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in playlist?.tracks" :key="item.id" :class="index % 2 === 1 ? 'stripe' : ''">
              <td class="index">
                {{ index + 1 }}
              </td>
              <td>
                <div class="fl title">
                  <router-link v-if="index <= 2" :to="`/song/${item.id}`">
                    <img :src="item.al.picUrl + '?param=50y50'" alt="">
                  </router-link>
                  <i class="icon icon-play" @click="play({id:item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')})" />
                  <router-link class="name ellipsis-1" :to="`/song/${item.id}`" :title="item.name">
                    {{ item.name }}
                  </router-link>
                </div>
              </td>
              <td class="duration">
                <span class="time">{{ formatSongDuration(item.dt, 0) }}</span>
                <div class="fl-sb">
                  <i class="icon icon-add" title="添加到播放列表" @click="play({id:item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')}, 1)" />
                  <i class="icon icon-collect" title="收藏" />
                  <i class="icon icon-share" title="分享" />
                  <i class="icon icon-download" title="下载" />
                </div>
              </td>
              <td>
                <div class="singer ellipsis-1">
                  <router-link
                    v-for="(singer, index1) in item.ar"
                    :key="singer.id"
                    :title="item.ar.map(v => { return v.name })"
                    :to="`/artist/${item.id}`"
                  >
                    {{ index1 === item.ar.length - 1 ? singer.name : singer.name + '/' }}
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Comment />
    </div>
  </div>
</template>

<script setup>
import { useTopStore } from '@/stores/top'
import { usePlayStore } from '@/stores/play'
import { getPlayListDetail } from '@/apis/playList'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { formatMonthDay, getTimestamp, formatSongDuration } from '@/utils/time'
import Comment from '@/components/Comment'
import Btns from '@/components/Btns'

const topStore = useTopStore()
const playStore = usePlayStore()

const route = useRoute()

const playlist = ref(null)

const currentId = computed(() => {
  return route.params?.id ? route.params?.id : topStore.firstId
})

const currentIndex = computed(() => {
  return topStore?.topId.findIndex(v => v.id === Number(currentId.value))
})

onMounted(() => {
  getPlayList()
})

onBeforeUnmount(() => {
  play = null
})

onBeforeRouteUpdate(async to => {
  if (to) await getPlayList()
})

const getPlayList = async () => {
  topStore.topId.length === 0 ? await topStore.actionTopId() : ''
  const res = await getPlayListDetail(currentId.value)
  playlist.value = res.data.playlist
  window.scrollTo({ top: 0 })
}

let play = (o, type) => { playStore.actionAddSong(o, type) }

</script>

<style lang="scss" scoped>
table {
  width: 100%;
  font-size: 12px;
  border: 1px solid #d9d9d9;
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
      .index {
        max-width: 60px;
        text-align: center;
      }
      .duration {
        min-width: 90px;
      }
      .title {
        align-items: center;
        img {
          width: 50px;
          height: 50px;
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
.side-active {
  background-color: #e6e6e6 !important;
}
.toplist-wrap {
  border-right: 1px solid #d3d3d3;
  .switch-side {
    flex: 1;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    .side-hader {
      margin-top: 30px;
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: 15px;
    }
    .side-items {
      padding: 10px 20px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: #f4f2f2;
      }
      .side-img {
        margin-right: 10px;
      }
      .side-info {
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        .side-name {
          width: 140px;
        }
        .side-update {
          color: #999;
        }
      }
    }
  }
  .toplist-main {
    flex: 3.2;
    padding: 35px 30px;
    word-break: break-all;
    .main-header {
      .cover-pic {
        margin-right: 30px;
        padding: 2px;
        border: 1px solid #cccccc;
      }
      .top-name {
        margin-bottom: 10px;
        padding-top: 10px;
        font-size: 20px;
        font-weight: normal;
      }
      .update-info {
        margin-bottom: 20px;
        font-size: 12px;
        color: #666;
        .icon-clock {
          display: inline-block;
          width: 13px;
          height: 13px;
          margin-right: 6px;
          margin-bottom: -1px;
          background: url('@/assets/icons/icon.png') -18px -682px no-repeat;
        }
        span:last-child {
          color: #999;
        }
      }
      .btns {
        margin: 30px 0;
        color: #333;
        i {
          display: block;
        }
        i, li {
          background: url('@/assets/icons/button2.png') no-repeat;
        }
        li {
          margin-right: 6px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          cursor: pointer;
        }
        .play {
          text-align: center;
          color: #fff;
          background-position: right -428px;
          i {
            display: flex;
            height: 31px;
            padding: 0 7px 0 8px;
            line-height: 31px;
            background-position: 0 -387px;
          }
          .icon-play {
            width: 20px;
            height: 18px;
            margin: 6px 4px 2px 0;
            background-position: 0 -1622px;
          }
          .icon-add {
            width: 26px;
            height: 31px;
            margin-left: -3px;
            text-align: center;
            background-position: 0 -1588px;
          }
        }
        .like {
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
        .share {
          background-position: right -1106px;
          .icon-share {
            min-width: 23px;
            height: 31px;
            line-height: 31px;
            padding-right: 2px;
            padding-left: 28px;
            background-position: 0 -1225px;
          }
        }
        .download {
          background-position: right -1020px;
          .icon-download {
            min-width: 23px;
            height: 31px;
            line-height: 31px;
            padding-right: 2px;
            padding-left: 28px;
            background-position: 0 -2761px;
          }
        }
        .comment {
          background-position: right -1020px;
          .icon-comment {
            min-width: 23px;
            height: 31px;
            line-height: 31px;
            padding-right: 2px;
            padding-left: 28px;
            background-position: 0 -1465px;
          }
        }
      }
    }
    .main-playlist {
      margin-top: 40px;
      .playlist-heaeder {
        padding-bottom: 6px;
        font-size: 12px;
        border-bottom: 2px solid $themeColor;
        h3 {
          margin-right: 20px;
          font-size: 18px;
          font-weight: normal;
        }
        p {
          color: #666;
        }
        .playCount {
          font-weight: 700;
          color: $themeColor;
        }
      }
    }
  }
}
</style>
