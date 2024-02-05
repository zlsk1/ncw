<template>
  <div class="artist-wrap w980 fl">
    <div class="main">
      <h2 class="artist-name">
        <span>{{ artistData?.artist?.name }}</span><span class="alias">{{ artistData?.artist?.alias.map(v => {return v}).join(',') }}</span>
      </h2>
      <div class="artist-bg">
        <img :src="`${artistData?.artist?.cover}?param=640y300`" alt="">
        <router-link to="/" class="icon-home" />
        <router-link to="/" class="icon-collect" />
      </div>
      <el-tabs type="border-card" class="tabs" @tab-click="tabIndex = Number($event.index)">
        <el-tab-pane
          v-for="item in componentList"
          :key="item.label"
          :label="item.label"
        />
      </el-tabs>
      <Transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="componentList[tabIndex]?.name" :name="artistData?.artist?.name" />
        </keep-alive>
      </Transition>
    </div>
    <div class="aside">
      aside
    </div>
  </div>
</template>

<script setup>
import { getArtistDetailAPI } from '@/apis/artist'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ArtistProduce from './components/ArtistProduce.vue'
import ArtistAlbum from './components/ArtistAlbum.vue'
import HotWork from './components/HotWork.vue'
import RelativeMV from './components/RelativeMV.vue'

const route = useRoute()

const artistData = ref(null)
const tabIndex = ref(0)

const componentList = [
  { label: '热门作品', name: HotWork },
  { label: '所有专辑', name: ArtistAlbum },
  { label: '相关MV', name: RelativeMV },
  { label: '艺人介绍', name: ArtistProduce }
]

onMounted(() => {
  getArtistDetail(route.params.id)
})

const getArtistDetail = async id => {
  const res = await getArtistDetailAPI(id)
  artistData.value = res.data.data
}
</script>

<style lang="scss" scoped>
$mainWidth: 640px;
$imgHeight: 300px;
// 组件过渡css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.artist-wrap {
  .main {
    flex: 3;
    padding: 30px;
    border: 1px solid #d3d3d3;
    .artist-name {
      margin-bottom: 10px;
      font-weight: normal;
      .alias {
        margin-left: 10px;
        text-align: end;
        color: #999;
        font-size: 12px;
      }
    }
    .artist-bg {
      position: relative;
      width: $mainWidth;
      height: $imgHeight;
      a {
        display: block;
        background: url('@/assets/icons/iconall.png') no-repeat;
      }
      .icon-home {
        position: absolute;
        bottom: 20px;
        right: 126px;
        width: 96px;
        height: 32px;
        background-position: 0 -1156px ;
      }
      .icon-collect {
        position: absolute;
        bottom: 20px;
        right: 26px;
        width: 76px;
        height: 32px;
        background-position: 0 -500px ;
      }
    }
    .tabs {
      width: $mainWidth;
    }
  }
  .aside {
    flex: 1.2;
  }
}
.main :deep(.el-tabs--border-card) {
  border: none;
}
.main :deep(.el-tabs--border-card>.el-tabs__content) {
  padding: 10px 0;
}
.main :deep(.el-tabs--border-card>.el-tabs__header) {
  background: linear-gradient(#f9f9f9,#f8f8f8,#f7f7f7,#f6f6f6);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.main :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item) {
  padding: 0 35px;
  color: #333;
  transition: none;
}
.main :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active) {
  color: #333;
  background: linear-gradient(#f8f8f8,#f7f7f7,#f6f6f6,#fafafa,#fcfcfc,#fdfdfd);
  border-left-color: #ccc;
  border-right-color: #ccc;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    width: calc(100% + 2px);
    height: 2px;
    background-color: #d13030;
  }
}
.main :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item:hover) {
  color: #333;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    width: calc(100% + 2px);
    height: 2px;
    background-color: #d13030;
  }
}
</style>
