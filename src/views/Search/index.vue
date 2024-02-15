<template>
  <div class="search-wrap w980">
    <el-input v-model="searchVal">
      <template #append>
        <el-button :icon="Search" title="搜索" />
      </template>
    </el-input>
    <div class="content">
      <div class="header f12">
        <span>搜索“{{ searchVal }}”，找到<span class="resCount">{{ total }}</span>个{{ tabLabel }}</span>
      </div>
    </div>
    <el-tabs v-model="index" type="border-card" @tab-click="changeTab">
      <el-tab-pane
        v-for="item in tablist"
        :key="item.label"
        :label="item.label"
        :name="item.name"
      />
    </el-tabs>
    <Transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="tablist[tablist.findIndex(v => v.name === Number(route.params.type))].component" @getTotal="total = $event" />
      </keep-alive>
    </Transition>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchUser from './components/SearchUser.vue'
import SearchArtist from './components/SearchArtist.vue'
import SearchAlbum from './components/SearchAlbum.vue'
import SearchVedio from './components/SearchVedio.vue'

const route = useRoute()
const router = useRouter()

const searchVal = ref('')
const index = ref(0)
const tabLabel = ref('')
const total = ref(0)

const tablist = [
  { label: '单曲', name: 1, component: SearchArtist },
  { label: '歌手', name: 100, component: SearchArtist },
  { label: '专辑', name: 10, component: SearchAlbum },
  { label: '视频', name: 1014, component: SearchVedio },
  { label: '歌词', name: 1006, component: SearchArtist },
  { label: '歌单', name: 1000, component: SearchArtist },
  { label: '声音主播', name: 2000, component: SearchArtist },
  { label: '用户', name: 1002, component: SearchUser }
]

onMounted(() => {
  searchVal.value = route.params.k
  index.value = Number(route.params.type)
  tabLabel.value = tablist[tablist.findIndex(v => v.name === index.value)].label
})

const changeTab = e => {
  tabLabel.value = e.props.label
  router.push({ path: `/search/${searchVal.value}/${e.props.name}` })
}
</script>

<style lang="scss" scoped>
// 组件过渡css
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.search-wrap {
  padding: 40px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .content {
    margin-top: 40px;
    .header {
      margin-bottom: 20px;
      .resCount {
        color: $themeColor;
      }
    }
  }
  :deep(.el-input) {
    display: flex;
    width: 60%;
    height: 40px;
    margin: 0 auto;
  }
  :deep(.el-input-group) {
    display: flex;
  }
  :deep(.el-input__inner) {
    width: 60%;
    height: 40px;
    margin: 0 auto;
  }
  :deep(.el-tabs__nav) {
    width: 100%;
  }
  :deep(.el-tabs__item) {
    width: ceil(100% / 8);
  }
  :deep(.el-tabs__item:last-child) {
    border-right: none;
  }
  :deep(.el-tabs--border-card>.el-tabs__content) {
    padding: 0;
  }
  :deep(.el-tabs) {
    margin-bottom: 20px;
  }
}
</style>
