<template>
  <div class="recomend-wrap">
    <div class="header fl-sb">
      <div class="left fl">
        <router-link to="/discover/playlist" class="title">
          编辑推荐
        </router-link>
        <ul class="tab">
          <li>
            <router-link to="/discover/playlist?category=华语">
              华语
            </router-link>
          </li>
          <li>
            <router-link to="/discover/playlist?category=流行">
              流行
            </router-link>
          </li>
          <li>
            <router-link to="/discover/playlist?category=摇滚">
              摇滚
            </router-link>
          </li>
          <li>
            <router-link to="/discover/playlist?category=民谣">
              民谣
            </router-link>
          </li>
          <li>
            <router-link to="/discover/playlist?category=电子">
              电子
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-link to="/discover/playlist">
          更多
        </router-link>
        <i></i>
      </div>
    </div>
    <div class="card-conatiner">
      <Card
        v-for="item in personalizedList"
        :key="item.id"
        class="card"
      >
        <router-link :to="`/playlist/${item.id}`">
          <Pic
            :src="`${item.picUrl}?param=140y140`"
            crown
            mask1
            class="pic"
          ></Pic>
        </router-link>
        <div class="card-play fl-sb">
          <i class="icon-listen"></i>
          <span class="count f12">{{ formatPlayCount(item.playCount) }}</span>
          <i
            class="play"
            title="播放"
            @click="addPlayList(item.id)"
          ></i>
        </div>
        <template #footer>
          <router-link
            :to="`/playlist/${item.id}`"
            class="desc ellipsis-2"
            :title="item.name"
          >
            {{ item.name }}
          </router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPersonalized } from '@/apis/home'
import { onMounted, ref } from 'vue'
import { formatPlayCount } from '@/utils/index'
import { usePlayStore } from '@/stores/play'
import type { personalizedAlbumResultType } from '@/types'

const store = usePlayStore()

const personalizedList = ref<personalizedAlbumResultType[]>([])

onMounted(() => {
  getPersonalizedList()
})

const getPersonalizedList = async() => {
  const res = await getPersonalized(8)
  personalizedList.value = res.data.result
}

const addPlayList = async(id: number) => {
  store.actionAddSongs(id)
}

</script>

<style lang="scss" scoped>
.recomend-wrap {
  .header {
    margin-bottom: 20px;
    padding: 0 0 8px 30px;
    font-size: 12px;
    color: #666;
    border-bottom: 2px solid #C10D0C;
    background: url('@/assets/icons/index.png') -225px -158px no-repeat;
    .left {
      .title {
      font-size: 18px;
      color: #333;
      }
      .tab {
        display: flex;
        align-items: center;
        li {
          position: relative;
          padding: 0 15px;
          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: calc(50% - 5px);
            width: 1px;
            height: 10px;
            background-color: #ccc;
          }
          &:last-child::after {
            content: '';
            width: 0;
            height: 0;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      a {
        margin-right: 6px;
        &:hover {
          text-decoration: underline;
        }
      }
      i {
        display: block;
        width: 12px;
        height: 12px;
        background: url('@/assets/icons/index.png') 0 -240px no-repeat;
      }
    }
  }
  .card-conatiner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card {
      flex-shrink: 0;
      width: calc((100% - 120px) / 4);
      &:nth-child(-n+4) {
        margin-bottom: 40px;
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
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
