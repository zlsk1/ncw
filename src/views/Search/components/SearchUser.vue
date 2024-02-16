<template>
  <div v-loading="isLoad" class="SearchUser-wrap">
    <div
      v-for="item in result?.userprofiles"
      :key="item.id"
      class="fl-sb items"
    >
      <div class="left">
        <router-link :to="`/user/home/${item.userId}`">
          <img :src="item.avatarUrl + '?param=50y50'" alt="">
        </router-link>
      </div>
      <div class="fl-sb right">
        <div class="info">
          <div class="fl name">
            <router-link :to="`/user/home/${item.userId}`">
              <p>{{ item.nickname }}</p>
            </router-link>
            <img :src="item.avatarDetail?.identityIconUrl" alt="" class="identityImg">
            <i v-if="item.gender === 1" class="boy" />
            <i v-else-if="item.gender === 0" class="girl" />
          </div>
          <p class="txt desc ellipsis-1">
            {{ item.signature }}
          </p>
        </div>
        <el-button :icon="Plus" size="small">
          关注
        </el-button>
        <span class="playlist txt">歌单：{{ item.playlistCount }}</span>
        <span class="fllow txt">粉丝：{{ item.followeds }}</span>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(result?.userprofileCount / limit)"
      :page-size="limit"
      small
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeRouteUpdate } from 'vue'
import { handleSearchAPI } from '@/apis/search'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const emit = defineEmits(['getTotal'])

const route = useRoute()

let offset = 0
const limit = 30

const result = ref(null)
const isLoad = ref(true)

onMounted(() => {
  handleSearch(route.params.k, limit, offset, route.params.type)
})

onBeforeRouteUpdate(to => {
  if (to) handleSearch(to.params.k, limit, offset, to.params.type)
})

const handleSearch = async (keywords, limit, offset, type) => {
  isLoad.value = true
  const res = await handleSearchAPI({ keywords, limit, offset, type })
  result.value = res.data.result
  emit('getTotal', res.data.result.userprofileCount)
  isLoad.value = false
}

const changePage = e => {
  offset = (e - 1) * limit
  handleSearch(route.params.k, limit, offset, route.params.type)
}
</script>

<style lang="scss" scoped>
$maxWidth: 420px;
.SearchUser-wrap {
  .items {
    padding: 5px 0 5px 10px;
    border: 1px solid transparent;
    &:nth-child(even) {
      background-color: #f7f7f7;
    }
    &:hover {
      background-color: #f2f2f2;
      border: 1px solid #ccc;
    }
  }
  .left {
    margin-right: 20px;
  }
  .right {
    flex: 1;
    .info {
      flex: 4;
      .name {
        align-items: center;
        max-width: $maxWidth;
        margin-bottom: 6px;
        a {
          &:hover {
            text-decoration: underline;
          }
        }
        .identityImg {
          width: 15px;
          height: 15px;
          margin-left: 4px;
        }
        .boy {
          display: block;
          width: 15px;
          height: 15px;
          margin-left: 6px;
          background: url('@/assets/icons/icon.png') -70px -20px no-repeat;
        }
        .girl {
          display: block;
          width: 15px;
          height: 15px;
          margin-left: 6px;
          background: url('@/assets/icons/icon.png') -70px -0 no-repeat;
        }
      }
      .desc {
        max-width: $maxWidth;
      }
    }
    .playlist {
      flex: 1;
      margin-left: 50px;
    }
    .fllow {
      flex: 1;
    }
    .txt {
      font-size: 12px;
      color: #999;
    }
  }
  :deep(.el-pagination) {
    margin-top: 20px;
  }
}
</style>
