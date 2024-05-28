<template>
  <div v-loading="isLoad" class="SearchPlay-wrap">
    <div class="content">
      <div v-for="item in result?.playlists" :key="item.id" class="items fl-sb">
        <div class="img fl-sb">
          <i class="icon icon-play" @click="play(item.id)" />
          <router-link :to="`/playlist/${item.id}`">
            <Pic :src="item.coverImgUrl + '?param=50y50'" />
          </router-link>
        </div>
        <div class="name">
          <router-link :to="`/playlist/${item.id}`">
            {{ item.name }}
          </router-link>
        </div>
        <div class="btns fl-sb">
          <i class="icon icon-add" title="添加到播放列表" @click="play(item.id)" />
          <i class="icon icon-collect" title="收藏" />
          <i class="icon icon-share" title="分享" />
        </div>
        <div class="creator ellipsis-1">
          {{ item.trackCount }}首
          <router-link :to="`/user/home/${item.id}`" class="nickname">
            by {{ item.creator.nickname }}
          </router-link>
        </div>
        <div class="collect">
          收藏：{{ item.bookCount }}
        </div>
        <div class="playCount ellipsis-1  ">
          收听：{{ formatPlayCount(item.playCount) }}
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.playlistCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { formatPlayCount } from '@/utils/index'
import { usePlayStore } from '@/stores/play'

const emit = defineEmits(['getTotal'])

const route = useRoute()

const playStore = usePlayStore()

let offset = 0
const limit = 30

const result = ref(null)
const isLoad = ref(true)

onMounted(() => {
  handleSearch(route.params.k, limit, offset, route.params.type)
})

onBeforeRouteUpdate(to => {
  if (to.params.k !== route.params.k) handleSearch(to.params.k, limit, offset, to.params.type)
})

const handleSearch = async (keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  result.value = res.data.result
  emit('getTotal', res.data.result.playlistCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}

const play = id => {
  playStore.actionAddSongs(id)
}
</script>

<style lang="scss" scoped>
.SearchPlay-wrap {
  font-size: 12px;
  .content {
    margin-bottom: 20px;
    .items {
      height: 60px;
      padding-left: 20px;
      line-height: 60px;
      border: 1px solid transparent;
      &:nth-child(odd) {
        background: #f7f7f7;
      }
      &:hover {
        background-color: #f2f2f2;
        border: 1px solid #e1e1e1;
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
      }
      .icon {
        display: block;
        background: url('@/assets/icons/table.png') no-repeat;
        cursor: pointer;
      }
      .icon-play {
        width: 17px;
        height: 17px;
        margin-right: 10px;
        background-position: 0 -103px;
        &:hover {
          background-position: 0 -128px;
        }
      }
      .img {
        width: 80px;
        margin-right: 20px;
      }
      .name {
        flex: 2;
        &:hover {
          text-decoration: underline;
        }
      }
      .btns {
        flex: .4;
        margin-right: 20px;
      }
      .creator {
        flex: .6;
        margin-right: 80px;
        color: #999;
        .nickname {
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .collect {
        flex: .6;
        color: #999;
      }
      .playCount {
        flex: .6;
        color: #999;
      }
    }
  }
}
</style>
