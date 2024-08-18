<template>
  <div v-loading="isLoad" class="album-wrap">
    <ul class="album-content">
      <li
        v-for="item in albumList?.hotAlbums"
        :key="item.name"
        class="items"
      >
        <Card>
          <div class="album-img">
            <router-link :to="`/album/${item.id}`">
              <Pic album1 :src="item.picUrl + '?param=120y120'"></Pic>
            </router-link>
            <i class="icon-play" @click="play(item.id)"></i>
          </div>
          <template #footer>
            <router-link
              :to="`/album/${item.id}`"
              :title="item.name"
              class="name"
            >
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
      :page-count="Math.ceil((albumList?.artist as artistType)?.albumSize / limit)"
      :page-size="12"
      layout="prev, pager, next"
      next-text="下一页"
      prev-text="上一页"
      background
      small
      @change="changePage"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { getArtistAlbumAPI } from '@/apis/artist'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import Card from '@/components/Card/index.vue'
import type { artistAlbumType, artistType } from '@/types'

type albumRequestType = {
  id: number,
  limit: number,
  offset: number,
}

const route = useRoute()
const id = Number(route.params.id)

const playStore = usePlayStore()

const albumList = ref<artistAlbumType>()
const offset = ref(0)
const isLoad = ref(true)

const limit = 12

onMounted(() => { getArtistAlbum({ id, limit, offset: offset.value }) })

onBeforeRouteUpdate(() => {
  getArtistAlbum({ id, limit, offset: offset.value })
})

const getArtistAlbum = async(obj: albumRequestType) => {
  const { id, limit, offset } = obj
  isLoad.value = true
  const res = await getArtistAlbumAPI(id, limit, offset)
  albumList.value = res.data
  isLoad.value = false
}

const changePage = (e: number) => {
  offset.value = e === 1 ? 0 : (e - 1) * limit
  getArtistAlbum({ id, limit, offset: offset.value })
}

const play = (id: number) => { playStore.actionAddSongs(id) }
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
