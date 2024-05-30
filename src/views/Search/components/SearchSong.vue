<template>
  <div v-loading="isLoad" class="SearchLyric-wrap">
    <div class="content">
      <SearchPlay :result="result" />
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.songCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import SearchPlay from './SearchPlay'

const emit = defineEmits(['getTotal'])

const route = useRoute()

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
  emit('getTotal', res.data.result.songCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}
</script>

<style lang="scss" scoped>
  .SearchLyric-wrap {
    .content {
      margin-bottom: 20px ;
      .lrc {
        padding-left: 40px;
        line-height: 24px;
        font-size: 12px;
        color: #666;
        .expand {
          cursor: pointer;
        }
      }
    }
  }
</style>
