<template>
  <div v-loading="isLoad" class="album-wrap">
    <ul class="album-content">
      <li v-for="item in albumList?.hotAlbums" :key="item.name" class="items">
        <Card>
          <div class="album-img">
            <router-link :to="`/album/${item.id}`">
              <Pic album1 :src="item.picUrl + '?param=120y120'" />
            </router-link>
            <i class="icon-play" @click="play(item.id)" />
          </div>
          <template #footer>
            <router-link :to="`/album/${item.id}`" :title="item.name" class="name">
              <p class="ellipsis-2">
                {{ item.name }}
              </p>
            </router-link>
            <p class="ellipsis-1 time">
              {{ new Date(item.publishTime).toLocaleString().split(' ')[0].replaceAll('/', '.') }}
            </p>
          </template>
        </Card>
      </li>
    </ul>
    <el-pagination
      :page-count="Math.ceil(albumList?.artist?.albumSize / limit)"
      :page-size="12"
      layout="prev, pager, next"
      next-text="下一页"
      prev-text="上一页"
      background
      small
      @change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { getArtistAlbumAPI } from '@/apis/artist'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import Card from '@/components/Card'

const route = useRoute()

const playStore = usePlayStore()

const albumList = ref([])
const offset = ref(0)
const isLoad = ref(true)

const limit = 12

onMounted(() => { getArtistAlbum({ id: route.params.id, limit, offset: offset.value }) })

onBeforeRouteUpdate(to => {
  getArtistAlbum({ id: to.params.id, limit, offset: offset.value })
})

const getArtistAlbum = async ({ id, limit, offset }) => {
  isLoad.value = true
  const res = await getArtistAlbumAPI(id, limit, offset)
  albumList.value = res.data
  isLoad.value = false
}

const changePage = e => {
  offset.value = e === 1 ? 0 : (e - 1) * limit
  getArtistAlbum({ id: route.params.id, limit, offset: offset.value })
}

const play = id => { playStore.actionAddSongs(id) }
</script>

<style lang="scss" scoped>
.album-wrap {
  .album-content {
    display: flex;
    flex-wrap:wrap;
    .items {
      width: calc(25% - 18px);
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .album-img {
        &:hover .icon-play {
          position: absolute;
          top: 85px;
          right: 28px;
          width: 28px;
          height: 28px;
          background: url('@/assets/icons/iconall.png') 0 -140px no-repeat;
          cursor: pointer;
          &:hover {
            background-position: 0 -170px;
          }
        }
        .pic-wrap {
          width: 120px;
          height: 120px;
        }
      }
      .name {
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
      .time {
        margin-top: 6px;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
