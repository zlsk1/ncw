<template>
  <div class="recomend-wrap">
    <div class="header fl-sb">
      <div class="left fl">
        <router-link to="/" class="title">
          编辑推荐
        </router-link>
        <ul class="tab">
          <li>
            <router-link to="/">
              华语
            </router-link>
          </li>
          <li>
            <router-link to="/">
              流行
            </router-link>
          </li>
          <li>
            <router-link to="/">
              摇滚
            </router-link>
          </li>
          <li>
            <router-link to="/">
              民谣
            </router-link>
          </li>
          <li>
            <router-link to="/">
              电子
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-link to="/">
          更多
        </router-link>
        <i />
      </div>
    </div>
    <div class="card-conatiner">
      <Card
        v-for="item in personalizedList"
        :key="item.id"
        class="card"
        :play-count="formatPlayCount(item.playCount)"
      >
        <router-link to="/">
          <Pic
            :src="item.picUrl"
            crown
            mask1
            class="card-img"
          />
        </router-link>
        <div class="card-play fl-sb">
          <i class="icon-listen" />
          <span class="count f12">{{ formatPlayCount(item.playCount) }}</span>
          <i class="play" title="播放" @click="addPlayList(item.id)" />
        </div>
        <template #footer>
          <router-link to="/" class="desc" :title="item.name">
            {{ item.name }}
          </router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/Card'
import { getPersonalized } from '@/apis/home'
import { onMounted, ref } from 'vue'
import { formatPlayCount } from '@/utils/index'
import { useSongQueueStore } from '@/stores/play'
const store = useSongQueueStore()

const personalizedList = ref([])

const getPersonalizedList = async () => {
  const res = await getPersonalized(8)
  personalizedList.value = res.data.result
}

const addPlayList = async id => {
  store.actionUpdateSongQueue(id)
}

onMounted(() => {
  getPersonalizedList()
})

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
      .card-img {
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
