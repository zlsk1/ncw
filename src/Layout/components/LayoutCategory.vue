<template>
  <div class="category-wrap">
    <div class="w1100">
      <ul>
        <li>
          <router-link to="/" :class="route.path === '/' ? 'active-category' : ''">
            推荐
          </router-link>
        </li>
        <li>
          <router-link v-if="topStore?.topId[0]?.id" :to="`/toplist/${topStore?.topId[0]?.id}`" :class="route.path.includes('/toplist') ? 'active-category' : ''">
            排行榜
          </router-link>
          <router-link v-else to="/toplist" :class="route.path.includes('/toplist') ? 'active-category' : ''">
            排行榜
          </router-link>
        </li>
        <li>
          <router-link to="/">
            歌单
          </router-link>
        </li>
        <li>
          <router-link to="/">
            主播电台
          </router-link>
        </li>
        <li>
          <router-link to="/">
            歌手
          </router-link>
        </li>
        <li>
          <router-link to="/">
            新碟上架
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useTopStore } from '@/stores/top'

const route = useRoute()

const topStore = useTopStore()
</script>

<style lang="scss" scoped>
.active-category {
  background-color: #9b0909;
}
.category-wrap {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: $themeColor;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    margin-left: 204px;
    a {
      padding: 3px 12px;
      font-size: 12px;
      color: #fff;
      border-radius: 20px;
      &:hover {
        background-color: #9b0909;
      }
    }
  }
}
</style>
