<template>
  <div class="toplist-wrap fl w980">
    <div class="switch-side">
      <h3 class="side-hader">
        云音乐特色榜
      </h3>
      <ul>
        <li v-for="item in topStore.topId.slice(0, 4)" :key="item.id" class="side-items fl">
          <img :src="`${item.imgUrl}?param=40y40`" alt="" class="side-img">
          <div class="side-info">
            <p class="side-name">
              {{ item.name }}
            </p>
            <p class="side-update">
              {{ item.updateFrequency }}
            </p>
          </div>
        </li>
      </ul>
      <h3 class="side-hader">
        全球媒体榜
      </h3>
      <ul>
        <li v-for="item in topStore.topId.slice(4, 51)" :key="item.id" class="side-items fl">
          <img :src="`${item.imgUrl}?param=40y40`" alt="" class="side-img">
          <div class="side-info">
            <p class="side-name">
              {{ item.name }}
            </p>
            <p class="side-update">
              {{ item.updateFrequency }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="toplist-main">
      111
    </div>
  </div>
</template>

<script setup>
import { useTopStore } from '@/stores/top'

const topStore = useTopStore()
</script>

<style lang="scss" scoped>
.side-active {
  background-color: #e6e6e6;
}
.toplist-wrap {
  .switch-side {
    flex: 1;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    .side-hader {
      margin-top: 30px;
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: 15px;
    }
    .side-items {
      padding: 10px 20px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: #f4f2f2;
      }
      .side-img {
        margin-right: 10px;
      }
      .side-info {
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        .side-update {
          color: #999;
        }
      }
    }
  }
  .toplist-main {
    flex: 3.2;
  }
}
</style>
