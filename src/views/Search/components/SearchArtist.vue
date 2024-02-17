<template>
  <div v-loading="isLoad" class="SearchArtist-wrap">
    <ul class="content">
      <li
        v-for="item in result?.artists"
        :key="item.id"
        class="fl-sb items"
      >
        <router-link :to="`/artist/${item.id}`">
          <Card>
            <Pic :src="item.picUrl + '?param=130y130'" mask6 />
            <template #footer>
              <p class="ellipsis-1">
                {{ item.name }}<span v-if="item.trans">({{ item.trans }})</span>
              </p>
            </template>
          </Card>
        </router-link>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.artistCount / limit)"
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

const emit = defineEmits(['getTotal'])

const route = useRoute()

let offset = 0
const limit = 90

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
  emit('getTotal', res.data.result.artistCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}
</script>

<style lang="scss" scoped>
.SearchArtist-wrap {
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    font-size: 12px;
    .items {
      width: calc((100% - 120px) / 6);
      margin-bottom: 10px;
      p {
        max-width: 120px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
