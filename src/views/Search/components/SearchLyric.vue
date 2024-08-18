<template>
  <div v-loading="isLoad" class="SearchLyric-wrap">
    <div class="content">
      <SearchPlay v-slot="slotProps" :result="result">
        <div v-if="slotProps.item.isExpand" class="lrc">
          <p
            v-for="(lrc, i) in slotProps.item.lyrics"
            :key="i"
            v-html="lrc"
          ></p>
          <span class="expand" @click="expand(slotProps.index)">
            <span>收起</span>
            <ArrowUp style="width: 1em; height: 1em"></ArrowUp>
          </span>
        </div>
        <div v-else class="lrc">
          <p
            v-for="(lrc, i) in slotProps.item.lyrics.slice(0 ,4)"
            :key="i"
            v-html="lrc"
          ></p>
          <span class="expand" @click="expand(slotProps.index)">
            <span>展开</span>
            <ArrowDown style="width: 1em; height: 1em"></ArrowDown>
          </span>
        </div>
      </SearchPlay>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.songCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
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

const handleSearch = async(keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  result.value = res.data.result
  emit('getTotal', res.data.result.songCount)
  result.value.songs.forEach(v => { v.isExpand = false })
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}

const expand = index => { result.value.songs[index].isExpand = !result.value.songs[index].isExpand }
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

<style lang="css" scoped>
.lrc >>>b {
  color: #409eff;
}
</style>
