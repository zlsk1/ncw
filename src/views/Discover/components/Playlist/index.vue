<template>
  <div class="w980 dis-playlist">
    <div class="header">
      <h2>{{ currentCate }}</h2>
      <el-popover
        :visible="isShow"
        popper-class="category"
        width="660"
        trigger="click"
        placement="bottom-start"
        :hide-after="0"
        :teleported="false"
        :popper-options="{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-60, 10]
              }
            }
          ]
        }"
      >
        <div v-clickOutside="clickPopOut">
          <div class="category-header">
            <el-button size="small" @click="reset">
              全部风格
            </el-button>
          </div>
          <div class="category-content">
            <dl v-for="(cate, index) in catelist" :key="index" class="fl items">
              <dt class="cate">
                {{ cate.type }}
              </dt>
              <dd class="tag fl">
                <span
                  v-for="tag in cate.children"
                  :key="tag.id"
                  :class="tag.name === currentCate ? 'active-tag' : ''"
                  @click="select(tag.name)"
                >
                  {{ tag.name }}
                </span>
              </dd>
            </dl>
          </div>
        </div>

        <template #reference>
          <el-button @click.stop="openPopover">
            选择分类
            <ArrowDown style="width: 1em; height: 1em;margin-left: 4px;" />
          </el-button>
        </template>
      </el-popover>
    </div>
    <div class="main">
      <div class="content">
        <Card
          v-for="item in playlist?.playlists"
          :key="item.id"
          class="card"
        >
          <router-link :to="`/playlist/${item.id}`">
            <Pic
              :src="`${item.coverImgUrl}?param=140y140`"
              mask1
              class="pic"
            />
          </router-link>
          <div class="card-play fl-sb">
            <i class="icon-listen" />
            <span class="count f12">{{ formatPlayCount(item.playCount) }}</span>
            <i class="play" title="播放" @click="addPlayList(item.id)" />
          </div>
          <template #footer>
            <router-link :to="`/playlist/${item.id}`" class="desc ellipsis-1" :title="item.name">
              {{ item.name }}
            </router-link>
            <span class="f12">by</span>
            <router-link :to="`/user/home/${item.creator.userId}`" class="creator ellipsis-1 f12" :title="item.creator.nickname">
              {{ item.creator.nickname }}
            </router-link>
          </template>
        </Card>
      </div>
      <el-pagination
        :page-count="Math.ceil(playlist?.total / limit)"
        layout="prev, pager, next"
        background
        small
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { usePlayStore } from '@/stores/play'
import { getAllPlaylistAPI, getPlaylistCateAPI } from '@/apis/playList'
import { ArrowDown } from '@element-plus/icons-vue'
import { formatPlayCount } from '@/utils/index'

const playStore = usePlayStore()

const limit = 35
let _before = ''

const catelist = ref([])
const playlist = ref(null)
const currentCate = ref('全部')
const isShow = ref(false)

onMounted(() => {
  getPlaylistHighCate()
  getTopPlaylistHigh({ limit })
})

onBeforeUnmount(() => {
  select = null; reset = null; openPopover = null; clickPopOut = null; addPlayList = null
})

const getPlaylistHighCate = async () => {
  const { data } = await getPlaylistCateAPI()
  // 遍历主类
  for (const key in data.categories) {
    catelist.value.push({ type: data.categories[key], children: [] })
    // 遍历次类
    data.sub.forEach(item => {
      // 次类属于主类？插入到主类的children中
      item.category === Number(key) ? catelist.value[key].children.push(item) : ''
    })
  }
}

const getTopPlaylistHigh = async ({ order, cat, limit, before }) => {
  const res = await getAllPlaylistAPI({ order, cat, limit, before })
  playlist.value = res.data
  _before = playlist.value.lasttime
}

let select = tag => {
  isShow.value = false
  currentCate.value = tag
  getTopPlaylistHigh({ cat: tag, limit, before: _before })
}

const changePage = page => {
  getTopPlaylistHigh({ limit, before: _before })
  console.log(page)
}

let openPopover = () => { isShow.value = !isShow.value }

let reset = () => {
  getTopPlaylistHigh({ limit })
  currentCate.value = '全部'
}

let clickPopOut = () => { isShow.value = false }

let addPlayList = id => { playStore.actionAddSongs(id) }
</script>

<style lang="scss" scoped>
:deep(.el-popover.el-popper) {
  padding: 0;
}
.dis-playlist {
  padding: 40px 30px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .header {
    display: flex;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 2px solid $themeColor;
    h2 {
      margin-right: 10px;
      font-weight: normal;
    }
    .category {
      .category-header {
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
      }
      .category-content {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 55px;
          width: 1px;
          height: 100%;
          background-color: #ccc;
        }
        .items {
          padding: 10px 0;
          font-size: 12px;
          .cate {
            padding: 4px 10px 4px 20px;
            font-weight: 700;
            white-space: nowrap;
            color: #333;
          }
          .tag {
            flex-wrap: wrap;
            span {
              display: inline-block;
              position: relative;
              padding: 4px 12px;
              white-space: nowrap;
              cursor: pointer;
              &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 5px;
                width: 1px;
                height: calc(100% - 10px);
                background-color: #dadbe3;
              }
              &:hover {
                text-decoration: underline;
              }
            }
            .active-tag {
              color: $themeColor;
            }
          }
        }
      }
    }
  }
  .main {
    .content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .card {
        width: 140px;
        margin-right: calc((100% - 700px) / 5);
        // flex: 0 0 20%;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .pic {
          width: 140px;
          height: 140px;
        }
        .card-play {
          position: absolute;
          width: 140px;
          height: 26px;
          margin-top: -26px;
          padding: 0 10px;
          background: url('@/assets/icons/coverall.png') 0 -537px no-repeat;
          color: #ccc;
          z-index: 10;
          .icon-listen {
            display: block;
            width: 14px;
            height: 11px;
            background: url('@/assets/icons/iconall.png') no-repeat;
            background-position: 0 -24px;
          }
          .play {
            display: block;
            width: 16px;
            height: 16px;
            background: url('@/assets/icons/iconall.png') 0 0 no-repeat;
            cursor: pointer;
            &:hover {
              background-position: 0 -60px;
            }
          }
          .count {
            position: absolute;
            left: 30px;
          }
        }
        .desc {
          display: block;
          max-width: 140px;
          margin-bottom: 6px;
          &:hover {
            text-decoration: underline;
          }
        }
        .creator {
          margin-left: 4px;
          color: #999;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
