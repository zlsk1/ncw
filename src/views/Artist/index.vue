<template>
  <div class="artist-wrap w980 fl">
    <div class="main">
      <h2 class="artist-name">
        <span>{{ artistData?.artist?.name }}</span><span class="alias">{{ artistData?.artist?.alias.map(v => {return v}).join(',') }}</span>
      </h2>
      <div class="artist-bg">
        <img :src="`${artistData?.artist?.cover}?param=640y300`" alt="">
        <router-link v-if="artistData?.user" :to="`/user/home/${artistData?.user.userId}`" class="icon-home" />
        <router-link to="/" class="icon-collect" />
      </div>
      <el-tabs
        v-model="current.str"
        type="border-card"
        class="tabs"
        @tab-click="changeTab"
      >
        <el-tab-pane
          v-for="item in componentList"
          :key="item.label"
          :label="item.label"
          :name="item.str"
        >
          <component :is="current.com" :name="artistData?.artist?.name" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="aside">
      <div>
        <div class="header">
          热门歌手
        </div>
        <ul class="hotSinger">
          <li v-for="item in hotSinger" :key="item.id" class="hot-items">
            <router-link :to="`/artist/${item.id}`">
              <img :src="item.picUrl + '?param=50y50'" alt="">
            </router-link>
            <router-link :to="`/artist/${item.id}`">
              <p class="f12 ellipsis-1" :title="item.name">
                {{ item.name }}
              </p>
            </router-link>
          </li>
        </ul>
      </div>
      <DownLoadSide />
    </div>
  </div>
</template>

<script setup>
import { getArtistDetailAPI } from '@/apis/artist'
import { getHotSinger } from '@/apis/singer'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import ArtistProduce from './components/ArtistProduce.vue'
import ArtistAlbum from './components/ArtistAlbum.vue'
import HotWork from './components/HotWork.vue'
import RelativeMV from './components/RelativeMV.vue'
import DownLoadSide from '@/components/DownLoadSide'

const route = useRoute()
const router = useRouter()

const artistData = ref(null)
const tabIndex = ref(0)
const hotSinger = ref([])

const componentList = [
  { label: '热门作品', name: HotWork, str: 'HotWork' },
  { label: '所有专辑', name: ArtistAlbum, str: 'ArtistAlbum' },
  { label: '相关MV', name: RelativeMV, str: 'RelativeMV' },
  { label: '艺人介绍', name: ArtistProduce, str: 'ArtistProduce' }
]

const current = computed(() => {
  return {
    com: componentList[tabIndex.value]?.name,
    str: componentList[tabIndex.value]?.str
  }
})

onMounted(() => {
  getArtistDetail(route.params.id)
  getHSinger()
  refreshIndex()
})

onBeforeRouteUpdate((to) => {
  if (to) {
    getArtistDetail(to.params.id)
    getHSinger()
  }
})

const getArtistDetail = async id => {
  const res = await getArtistDetailAPI(id)
  artistData.value = res.data.data
}

const getHSinger = async () => {
  const res = await getHotSinger(6)
  hotSinger.value = res.data.artists
}

const changeTab = e => {
  tabIndex.value = Number(e.index)
  switch (Number(e.index)) {
    case 0:
      router.push({ path: `/artist/${route.params.id}` })
      break
    case 1:
      router.push({ path: `/artist/album/${route.params.id}` })
      break
    case 2:
      router.push({ path: `/artist/mv/${route.params.id}` })
      break
    case 3:
      router.push({ path: `/artist/desc/${route.params.id}` })
      break
  }
}

const refreshIndex = () => {
  if (route.fullPath.includes('album')) {
    tabIndex.value = 1
  } else if (route.fullPath.includes('mv')) {
    tabIndex.value = 2
  } else if (route.fullPath.includes('desc')) {
    tabIndex.value = 3
  } else {
    tabIndex.value = 0
  }
}
</script>

<style lang="scss" scoped>
$mainWidth: 640px;
$imgHeight: 300px;
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
    padding: 30px 40px 30px 30px;
    border-right: 1px solid #d3d3d3;
    .header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      font-weight: 700;
      font-size: 12px;
      border-bottom: 1px solid #ccc;
    }
    .hotSinger {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .hot-items {
        width: 32%;
        text-align: center;
        &:nth-child(-n+3) {
          margin-bottom: 10px;
        }
        p {
          margin-top: 6px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
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
