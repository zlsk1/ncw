<template>
  <div class="playlist-wrap w980">
    <div class="playlist-left">
      <div class="playlist-header">
        <div class="left">
          <Pic
            :key="playlist?.playlist?.coverImgUrl"
            :src="playlist?.playlist?.coverImgUrl + '?param=200y200'"
            crown
            mask5
            class="pic"
          />
        </div>
        <div class="right">
          <div class="title">
            <i class="icon-play" />
            <h2>{{ playlist?.playlist?.name }}</h2>
          </div>
          <div class="creator">
            <router-link :to="`/user/home/${playlist?.playlist?.creator.userId}`">
              <img :src="playlist?.playlist?.creator.avatarUrl + '?param=35y35'" alt="">
            </router-link>
            <router-link :to="`/user/home/${playlist?.playlist?.creator.userId}`">
              <span class="name">{{ playlist?.playlist?.creator.nickname }}</span>
            </router-link>
            <span class="time">
              {{ new Date(playlist?.playlist?.createTime).toLocaleString().split(' ')[0] }}创建
            </span>
          </div>
          <Btns :id="route.params.id" :dynamic="dynamic" class="btns" />
          <div v-if="playlist?.playlist?.tags.length !== 0" class="tags fl">
            标签：
            <router-link to="/">
              <el-tag v-for="(item, index) in playlist?.playlist?.tags" :key="index" type="info">
                {{ item }}
              </el-tag>
            </router-link>
          </div>
          <p v-if="description" class="desc">
            <span>介绍：</span>
            {{ description }}
          </p>
          <template v-if="description.length > 100">
            <div v-if="!isExpand" class="expand" @click="expandDesc">
              展开
              <ArrowDown style="width: 1em;height: 1em" />
            </div>
            <div v-else class="expand" @click="expandDesc">
              收起
              <ArrowUp style="width: 1em;height: 1em" />
            </div>
          </template>
        </div>
      </div>
      <div class="main-playlist">
        <div class="playlist-heaeder fl-sb">
          <div class="fl-sb">
            <h3>歌曲列表</h3>
            <p>{{ playlist?.playlist?.tracks.length }}首歌</p>
          </div>
          <p>播放：<span class="playCount">{{ playlist?.playlist?.playCount }}</span>次</p>
        </div>
        <table cellspacing="0">
          <thead>
            <tr>
              <th style="width: 60px;" />
              <th style="border-left:1px solid #d1d1d1">
                歌曲标题
              </th>
              <th style="width: 100px;border-left:1px solid #d1d1d1">
                时长
              </th>
              <th style="width: 12%;border-left:1px solid #d1d1d1">
                歌手
              </th>
              <th style="width: 18%;border-left:1px solid #d1d1d1">
                专辑
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in playlist?.playlist?.tracks" :key="item.id" :class="index % 2 === 1 ? 'stripe' : ''">
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
              <td>
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
      <Comment />
    </div>
    <div class="playlist-right">
      <template v-if="playlist?.playlist?.subscribers.length !== 0">
        <div class="header">
          喜欢这个歌单的人
        </div>
        <div class="alsolike">
          <ul class="fl">
            <li v-for="item in playlist?.playlist?.subscribers" :key="item.avatarImgId">
              <router-link :to="`/user/home/${item.userId}`">
                <img :src="item.avatarUrl + '?param=40y40'" alt="">
              </router-link>
            </li>
          </ul>
        </div>
      </template>
      <DownLoadSide />
    </div>
  </div>
</template>

<script setup>
import { getPlayListDetail, getPlayListAllAPI, getPlaylistDynamicAPI } from '@/apis/playList'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { usePlayStore } from '@/stores/play'
import { formatSongDuration } from '@/utils/time'
import DownLoadSide from '@/components/DownLoadSide'
import Comment from '@/components/Comment'
import Btns from '@/components/Btns'

const playStore = usePlayStore()

const route = useRoute()

const playlist = ref([])
const description = ref('')
const isExpand = ref(false)
const dynamic = ref(null)

onMounted(() => {
  getplaylist(route.params.id)
  getDynamic(route.params.id)
})

const getplaylist = async (id) => {
  const res = await getPlayListDetail(id)
  playlist.value = res.data
  description.value = playlist.value?.playlist?.description.slice(0, 100).concat('...')
  window.scrollTo({ top: 0 })
  const _res = await getPlayListAllAPI({ id })
  playlist.value.playlist.tracks = _res.data.songs
}

const expandDesc = () => {
  !isExpand.value ? '' : window.scrollTo({ top: 0 })
  isExpand.value = !isExpand.value
  description.value = isExpand.value
    ? playlist.value?.playlist?.description
    : playlist.value?.playlist?.description.slice(0, 100).concat('...')
}

const play = (o, type) => {
  playStore.actionAddSong(o, type)
}

const getDynamic = async id => {
  const res = await getPlaylistDynamicAPI(id)
  dynamic.value = {
    commentCount: res.data.commentCount,
    shareCount: res.data.shareCount,
    bookedCount: res.data.bookedCount
  }
}
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
.playlist-wrap {
  display: flex;
  // padding: 40px 0;
  border: 1px solid #ccc;
  .playlist-left {
    flex: 2.5;
    padding: 40px;
    border-right: 1px solid #ccc;
    .playlist-header {
      display: flex;
      justify-content: space-between;
      .left {
        flex: 1;
        margin-right: 30px;
        .pic {
          width: 200px;
          height: 200px;
        }
      }
      .right {
        flex: 4;
        font-size: 12px;
        .title {
          display: flex;
          margin-bottom: 10px;
          h2 {
            font-weight: normal;
            font-size: 20px;
          }
          .icon-play {
            display: block;
            width: 72px;
            height: 24px;
            margin-right: 10px;
            background: url('@/assets/icons/icon2.png') -110px -275px no-repeat;
          }
        }
        .creator {
          .name {
            margin: 0 10px;
            color: $primaryColor1;
            &:hover {
              text-decoration: underline;
            }
          }
          .time {
            color: #999;
          }
          img {
            width: 35px;
            height: 35px;
          }
        }
        .tags {
          align-items: center;
          margin: 20px 0 10px 0;
          color: #666;
          .el-tag{
            margin: 0 5px;
          }
        }
        .desc {
          line-height: 18px;
          white-space: pre-line;
          color: #666;
          p {
            display: inline-block;
          }
        }
        .expand {
          color: $primaryColor1;
          text-align: end;
          cursor: pointer;
        }
        .btns {
          margin-top: 20px;
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
  .playlist-right {
    flex: 1;
    padding: 20px;
    .header {
      padding-bottom: 10px;
      font-size: 12px;
      font-weight: 700;
      border-bottom: 1px solid #ccc;
    }
    .alsolike {
      padding: 20px 0;
      ul {
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: calc((100% - 20px) / 4);
          &:nth-child(-n+4) {
            margin-bottom: 10px;
          }
        }
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
