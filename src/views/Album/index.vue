<template>
  <div class="w980 fl album-wrap">
    <div class="left">
      <div class="header">
        <div class="fl">
          <Pic
            :key="getTimestamp()"
            :src="albumInfo?.album?.picUrl + '?param=177y177'"
            album3
            class="pic"
          />
          <div class="info">
            <div class="fl">
              <i class="icon-album" />
              <h2>{{ albumInfo?.album?.name }}</h2>
            </div>
            <div>
              歌手:
              <router-link
                v-for="(item, index) in albumInfo?.album?.artists"
                :key="item.id"
                class="artist"
                :to="`/artist/${item.id}`"
              >
                {{ index === albumInfo?.album?.artists.length - 1 ? item.name : `${item.name}/` }}
              </router-link>
            </div>
            <p class="publish">
              发布时间：{{ new Date(albumInfo?.album?.publishTime).toLocaleString().split(' ')[0] }}
            </p>
            <p>发行公司：{{ albumInfo?.album?.company }}</p>
            <Btns class="btns" :dynamic="{shareCount:albumInfo?.album?.info?.shareCount, commentCount: albumInfo?.album?.info?.commentCount}" />
          </div>
        </div>
        <div class="desc">
          <h4>专辑介绍：</h4>
          <template v-if="!isExpand">
            <p v-for="(desc, index) in albumInfo?.album?.description.slice(0, 160).concat('...').split('\n')" :key="index">
              {{ desc }}
            </p>
          </template>
          <template v-else>
            <p v-for="(desc, index) in albumInfo?.album?.description.split('\n')" :key="index">
              {{ desc }}
            </p>
          </template>
        </div>
        <div v-if="isExpand" class="expand" @click="expand">
          <span>收起</span>
          <ArrowUp style="width: 1em;height: 1em" />
        </div>
        <div v-else class="expand" @click="expand">
          <span>展开</span>
          <ArrowDown style="width: 1em;height: 1em" />
        </div>
      </div>
      <div class="main-playlist">
        <div class="playlist-heaeder fl-sb">
          <div class="fl-sb">
            <h3>包含歌曲列表</h3>
            <p>{{ albumInfo?.songs.length }}首歌</p>
          </div>
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
            <tr v-for="(item, index) in albumInfo?.songs" :key="item.id" :class="index % 2 === 1 ? 'stripe' : ''">
              <td class="index">
                {{ index + 1 }}
              </td>
              <td>
                <div class="fl title">
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
    <div class="right">
      <div class="header fl-sb">
        <p>Ta的其他热门专辑</p>
        <router-link :to="`/  ${albumInfo?.album?.artist.id}`" class="fl-sb">
          全部
          <ArrowRight style="width: 1em; height: 1em" />
        </router-link>
      </div>
      <div class="content">
        <ul>
          <li
            v-for="item in albums?.hotAlbums"
            :key="item.id"
            class="fl items"
          >
            <router-link :to="`/album/${item.id}`">
              <img :src="item.picUrl + '?param=50y50'" alt="">
            </router-link>
            <div>
              <router-link :to="`/album/${item.id}`" class="ellipsis-1 name">
                {{ item.name }}
              </router-link>
              <p class="time f12">
                {{ new Date(item.publishTime).toLocaleString().split(' ')[0] }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <DownLoadSide />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import { getAlbumAPI } from '@/apis/album'
import { getArtistAlbumAPI } from '@/apis/artist'
import Comment from '@/components/Comment'
import Btns from '@/components/Btns'
import DownLoadSide from '@/components/DownLoadSide'
import { formatSongDuration, getTimestamp } from '@/utils/time'
import { ArrowDown, ArrowUp, ArrowRight } from '@element-plus/icons-vue'

const playStore = usePlayStore()

const route = useRoute()

const albumInfo = ref(null)
const isExpand = ref(false)
const albums = ref(null)

onMounted(() => {
  getAlbum(route.params.id)
})

onBeforeUnmount(() => {
  expand = null; play = null
})

const getAlbum = async id => {
  const res = await getAlbumAPI(id)
  const res1 = await getArtistAlbumAPI(res.data.album.artist.id, 5)
  albumInfo.value = res.data
  albums.value = res1.data
}

let expand = () => {
  isExpand.value = !isExpand.value
}

let play = (o, type) => {
  playStore.actionAddSong(o, type)
}
</script>

<style lang="scss" scoped>
.album-wrap {
  .left {
    flex: 4;
    padding: 30px;
    font-size: 12px;
    border: 1px solid #ccc;
    .header {
      .pic {
        margin-right: 40px;
      }
      .info {
        color: #666;
        h2 {
          margin-bottom: 10px;
          font-weight: normal;
          color: #333;
        }
        .artist {
          color: $primaryColor1;
        }
        .publish {
          margin: 6px 0;
        }
        .btns {
          margin-top: 20px;
        }
        .icon-album {
          display: block;
          width: 54px;
          height: 24px;
          margin-right: 10px;
          background: url('@/assets/icons/icon.png') 0 -186px no-repeat;
        }
      }
      .desc {
        margin-top: 20px;
        color: #666;
        h4 {
          color: #333;
        }
        p {
          line-height: 26px;
          text-indent: 2em;
        }
      }
      .expand {
        text-align: end;
        cursor: pointer;
        span {
          color: #409eff;
        }
      }
    }
    .main-playlist {
      margin-top: 40px;
      margin-bottom: 30px;
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
  }
  .right {
    flex: 1;
    padding: 20px;
    border-right: 1px solid #ccc;
    .header {
      padding-bottom: 6px;
      border-bottom: 1px solid #ccc;
      font-size: 12px;
      font-weight: 700;
    }
    .content {
      padding: 20px 0;
      .items {
        margin-bottom: 15px;
        img {
          margin-right: 10px;
        }
        .name {
          display: block;
          max-width: 140px;
          margin-bottom: 10px;
          &:hover {
            text-decoration: underline;
          }
        }
        .time {
          color: #999;
        }
      }
    }
  }
}
</style>
