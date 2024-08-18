<template>
  <div v-loading="isLoad" class="SearchSound-wrap">
    <div class="items">
      <h3 class="f12">
        声音主播
      </h3>
      <el-empty v-if="!result" description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const emit = defineEmits(['getTotal'])

const route = useRoute()

const result = ref(null)
const isLoad = ref(true)

const limit = 8
const offset = 0

onMounted(() => {
  handleSearch(route.params.k, limit, offset, route.params.type)
})

onBeforeRouteUpdate(to => {
  if (to.params.k !== route.params.k) handleSearch(to.params.k, limit, offset, to.params.type)
})

const handleSearch = async(keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  if (res.result) {
    result.value = res.data.result
    emit('getTotal', res.data.result.songCount)
  }
  else {
    emit('getTotal', 0)
  }
  isLoad.value = false
}
</script>

<style scoped lang="scss">
.SearchSound-wrap {
  .items {
    h3 {
      padding-bottom: 10px;
      border-bottom: 1px solid #dadada;
    }
  }
}
</style>
