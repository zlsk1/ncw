<template>
  <div class="SearchVedio-wrap">
    <ul class="content">
      <li
        v-for="item in result?.videos"
        :key="item.id"
        class="fl-sb items"
      >
        <Card>
          <div class="img">
            <router-link to="/">
              <Pic :key="Date.now()" :src="item.coverUrl + '?param=159y90'" />
            </router-link>
          </div>
          <template #footer>
            <div class="fl" style="align-items: center">
              <span class="tag">
                MV
              </span>
              <router-link to="/">
                <p class="ellipsis-1" :title="item.title">
                  {{ item.title }}
                </p>
              </router-link>
            </div>
            <div class="ellipsis-1 name">
              <router-link
                v-for="(item1, index) in item.creator"
                :key="item1.userId"
                :to="`/artist/${item1.userId}`"
                :title="item1.userName"
              >
                <span class="">
                  {{ index === item.creator.length - 1 ? item1.userName : `${item1.userName}/` }}
                </span>
              </router-link>
            </div>
            <p class="duration">
              {{ formatSongDuration(item.durationms, 0) }}
            </p>
            <div class="playCount">
              <span>{{ formatPlayCount(item.playTime) }}</span>
            </div>
          </template>
        </Card>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.videoCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute } from 'vue-router'
import { formatPlayCount } from '@/utils/index'
import { formatSongDuration } from '@/utils/time'

const emit = defineEmits(['getTotal'])

const route = useRoute()

let offset = 0
const limit = 20

const result = ref(null)
const isLoad = ref(true)

onMounted(() => {
  handleSearch(route.params.k, limit, offset, route.params.type)
})

const handleSearch = async (keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  result.value = res.data.result
  emit('getTotal', res.data.result.videoCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}
</script>

<style lang="scss" scoped>
.SearchVedio-wrap {
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .items {
      position: relative;
      width: calc((100% - 100px) / 5);
      margin-bottom: 30px;
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
        display: inline-block;
        max-width: 120px;
        margin-top: 6px;
        font-size: 12px;
        a {
          color: #999;
        }
        span {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .tag {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        margin-right: 4px;
        padding: 0 3px;
        font-weight: 700;
        font-size: 12px;
        color: #e77077;
        border: 1px solid #e77077;
        background-color: #fff;
      }
      .duration {
        position: absolute;
        top: 73px;
        left: 4px;
        font-size: 12px;
        color: #fff;
        text-shadow: -2px 1px rgba(0,0,0,.4);
      }
      .playCount {
        position: absolute;
        top: 0;
        right: 0;
        width: 90px;
        height: 20px;
        line-height: 20px;
        padding-right: 6px;
        text-align: right;
        background: url('@/assets/icons/mask.png') 0 0 no-repeat;
        span {
          font-size: 12px;
          color: #fff;
          text-shadow: -2px 1px rgba(0,0,0,.4);
        }
      }
    }
  }
}
</style>
