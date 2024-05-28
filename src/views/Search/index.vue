<template>
  <div class="search-wrap w980">
    <el-input
      v-model="searchVal"
      class="searchInput"
      @input="handleSearch"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template #append>
        <el-button :icon="Search" title="搜索" @click="pushRoute" />
      </template>
    </el-input>
    <div v-if="isFocus && searchSuggset" class="search-suggest">
      <div class="search-header">
        <router-link :to="`/search/${searchVal}/1002`" @mousedown="router.push(`/search/${searchVal}/1002`)">
          搜“{{ searchVal }}”相关用户
          <span><ArrowRight style="width: 1em; height: 1em" /></span>
        </router-link>
      </div>
      <div class="search-content">
        <dl v-if="searchSuggset?.songs" class="fl">
          <dt class="left">
            <i />
            <span>单曲</span>
          </dt>
          <div class="right">
            <dd v-for="item in searchSuggset?.songs" :key="item.id">
              <router-link :to="`/song/${item.id}`">
                <p class="ellipsis-1">
                  {{ `${item.name}-${item.artists.map(v => v.name).join('/')}` }}
                </p>
              </router-link>
            </dd>
          </div>
        </dl>
        <dl v-if="searchSuggset?.artists" class="fl">
          <dt class="left">
            <i />
            <span>歌手</span>
          </dt>
          <div class="right">
            <dd v-for="item in searchSuggset?.artists" :key="item.id">
              <router-link :to="`/artist/${item.id}`">
                <p class="ellipsis-1">
                  {{ item.name }}
                </p>
              </router-link>
            </dd>
          </div>
        </dl>
        <dl v-if="searchSuggset?.albums" class="fl">
          <dt class="left">
            <i />
            <span>专辑</span>
          </dt>
          <div class="right">
            <dd v-for="item in searchSuggset?.albums" :key="item.id">
              <router-link :to="`/playlist/${item.id}`">
                <p class="ellipsis-1">
                  {{ `${item.name}-${item.artist.name}` }}
                </p>
              </router-link>
            </dd>
          </div>
        </dl>
        <dl v-if="searchSuggset?.playlists" class="fl">
          <dt class="left">
            <i />
            <span>歌单</span>
          </dt>
          <div class="right">
            <dd v-for="item in searchSuggset?.playlists" :key="item.id">
              <router-link :to="`/playlist/${item.id}`">
                <p class="ellipsis-1">
                  {{ item.name }}
                </p>
              </router-link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
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
import { Search, ArrowRight } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { getSearchSuggest } from '@/apis/search'
import { debounce } from '@/utils/index'
import SearchUser from './components/SearchUser.vue'
import SearchArtist from './components/SearchArtist.vue'
import SearchAlbum from './components/SearchAlbum.vue'
import SearchVedio from './components/SearchVedio.vue'
import SearchLyric from './components/SearchLyric.vue'
import SearchPlaylist from './components/SearchPlaylist.vue'
import SearchSound from './components/SearchSound.vue'
import SearchSong from './components/SearchSong.vue'

const route = useRoute()
const router = useRouter()

const searchVal = ref('')
const index = ref(0)
const tabLabel = ref('')
const total = ref(0)
const isFocus = ref(false)
const searchSuggset = ref(null)

const tablist = [
  { label: '单曲', name: 1, component: SearchSong },
  { label: '歌手', name: 100, component: SearchArtist },
  { label: '专辑', name: 10, component: SearchAlbum },
  { label: '视频', name: 1014, component: SearchVedio },
  { label: '歌词', name: 1006, component: SearchLyric },
  { label: '歌单', name: 1000, component: SearchPlaylist },
  { label: '声音主播', name: 2000, component: SearchSound },
  { label: '用户', name: 1002, component: SearchUser }
]

onMounted(() => {
  searchVal.value = route.params.k
  index.value = Number(route.params.type)
  tabLabel.value = tablist[tablist.findIndex(v => v.name === index.value)].label
  getSearchResult()
})

onBeforeRouteUpdate(to => {
  if (to) index.value = Number(to.params.type)
})

const changeTab = e => {
  tabLabel.value = e.props.label
  router.push({ path: `/search/${searchVal.value}/${e.props.name}` })
}

const getSearchResult = async () => {
  const res = await getSearchSuggest(searchVal.value)
  searchSuggset.value = res.data.result
}

const _handleSearch = e => {
  if (e.trim()) {
    getSearchResult()
  } else {
    searchSuggset.value = null
  }
}

const handleSearch = debounce(_handleSearch, 20)

const handleFocus = () => { isFocus.value = !isFocus.value }

const handleBlur = () => { isFocus.value = !isFocus.value }

const pushRoute = () => router.push({ path: `/search/${searchVal.value}/${index.value}` })
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
  position: relative;
  padding: 40px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .search-suggest {
    position: absolute;
    top: 90px;
    left: 220px;
    width: 420px;
    line-height: 30px;
    font-size: 12px;
    color: #000;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px #ccc;
    z-index: 1000;
    .search-header {
      height: 40px;
      padding: 0 10px;
      line-height: 40px;
      border-bottom: 1px solid #e2e2e2;
      span {
        vertical-align: middle;
      }
    }
    .search-content {
      .left {
        padding: 0 10px;
        dt {
          flex: 1;
        }
      }
      dl {
        &:last-child div {
          border-bottom: none;
        }
        div {
          border-bottom: 1px solid #e3e5e7;
        }
        .right {
          flex: 2.5;
          border-left: 1px solid #e2e2e2;
          dd {
            // height: 20px;
            // line-height: 20px;
            &:hover {
              background-color: #e3e5e7;
            }
            p {
              max-width: 200px;
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
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
