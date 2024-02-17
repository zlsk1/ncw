<template>
  <div v-loading="isLoad" class="SearchAlbum-wrap">
    <ul class="content">
      <li
        v-for="item in result?.albums"
        :key="item.id"
        class="fl-sb items"
      >
        <Card>
          <div class="img">
            <router-link :to="`/album/${item.id}`">
              <Pic :src="item.picUrl + '?param=130y130'" album2 />
            </router-link>
            <i class="icon-play" @click="play(item.id)" />
          </div>
          <template #footer>
            <router-link :to="`/album/${item.id}`">
              <p class="ellipsis-1 album" :title="item.name">
                {{ item.name }}
              </p>
            </router-link>
            <router-link :to="`/artist/${item.id}`" :title="item.name">
              <p class="ellipsis-1 name">
                {{ item.artist.name }}
              </p>
            </router-link>
          </template>
        </Card>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.albumCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePlayStore } from '@/stores/play'

const emit = defineEmits(['getTotal'])

const route = useRoute()

const playStore = usePlayStore()

let offset = 0
const limit = 75

const result = ref(null)
const isLoad = ref(true)

onMounted(() => {
  handleSearch(route.params.k, limit, offset, route.params.type)
})

onBeforeUnmount(() => {
  play = null
})

onBeforeRouteUpdate(to => {
  if (to.params.k !== route.params.k) handleSearch(to.params.k, limit, offset, to.params.type)
})

const handleSearch = async (keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  result.value = res.data.result
  emit('getTotal', res.data.result.albumCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}

let play = id => { playStore.actionAddSongs(id) }
</script>

<style lang="scss" scoped>
.SearchAlbum-wrap {
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .items {
      width: calc((100% - 120px) / 5);
      margin-bottom: 10px;
      .img {
        &:hover .icon-play {
          position: absolute;
          top: 97px;
          right: 10px;
          width: 28px;
          height: 28px;
          background: url('@/assets/icons/iconall.png') 0 -140px no-repeat;
          cursor: pointer;
          &:hover {
            background-position: 0 -170px;
          }
        }
      }
      p {
        max-width: 120px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .name {
        margin-top: 4px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
