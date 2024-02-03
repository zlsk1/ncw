<template>
  <div class="album-wrap">
    <ul class="album-content">
      <li v-for="item in albumList?.hotAlbums" :key="item.name" class="items">
        <Card>
          <div class="album-img">
            <router-link to="/">
              <Pic album1 :src="item.picUrl + '?param=120y120'" />
            </router-link>
            <i class="icon-play" @click="play(item.id)" />
          </div>
          <template #footer>
            <router-link :to="`/song/${item.id}`" :title="item.name" class="name">
              <p class="ellipsis-2">
                {{ item.name }}
              </p>
            </router-link>
            <p class="ellipsis-1 time">
              {{ item.publishTime }}
            </p>
          </template>
        </Card>
      </li>
    </ul>
    <el-pagination
      class="page"
      :total="albumList?.artist?.albumSize"
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

<script setup>
import { getArtistAlbumAPI } from '@/apis/artist'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import Card from '@/components/Card'

const route = useRoute()

const playStore = usePlayStore()

const albumList = ref([])
const offset = ref(0)
const limit = 12

onMounted(() => { getArtistAlbum({ id: route.params.id, limit, offset: offset.value }) })

onBeforeUnmount(() => {
  changePage = null
})

const getArtistAlbum = async ({ id, limit, offset }) => {
  const res = await getArtistAlbumAPI(id, limit, offset)
  albumList.value = res.data
}

let changePage = e => {
  offset.value = e === 1 ? 0 : (e - 1) * limit
  getArtistAlbum({ id: route.params.id, limit, offset: offset.value })
}

const play = async id => { playStore.actionAddSongs(id) }
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
          bottom: 50px;
          right: 28px;
          width: 28px;
          height: 28px;
          background: url('@/assets/icons/iconall.png') 0 -140px no-repeat;
          cursor: pointer;
          &:hover {
            background-position: 0 -170px;
          }
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
  .page {
    justify-content: center;
  }
}
</style>
