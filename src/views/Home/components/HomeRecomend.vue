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
        :img-url="item.picUrl"
        :play-count="formatPlayCount(item.playCount)"
      >
        <template #footer>
          <router-link to="/">
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

const personalizedList = ref([])

const getPersonalizedList = async () => {
  const res = await getPersonalized(8)
  personalizedList.value = res.data.result
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
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      a {
        margin-right: 6px;
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
    }
  }
}
</style>
