<template>
  <div class="playlist-wrap w980">
    <div class="playlist-header">
      <div class="left">
        <Pic
          :key="playlist?.playlist?.coverImgUrl"
          :src="playlist?.playlist?.coverImgUrl + '?param=200y200'"
          crown
          mask5
        />
      </div>
      <div class="right">
        <div class="title">
          <i />
          <h2>{{ playlist?.playlist?.name }}</h2>
        </div>
        <div class="creator">
          <router-link :to="`/user/home/${playlist?.playlist?.creator.userId}`">
            <img :src="playlist?.playlist?.creator.avatarUrl + '?param=35y35'" alt="">
          </router-link>
          <router-link :to="`/user/home/${playlist?.playlist?.creator.userId}`">
            <span class="name">{{ playlist?.playlist?.creator.nickname }}</span>
          </router-link>
          <span class="time">
            {{ new Date(playlist?.playlist?.createTime).toLocaleString().split(' ')[0] }}创建
          </span>
        </div>
        <div class="tags fl">
          标签：
          <el-tag v-for="(item, index) in playlist?.playlist?.tags" :key="index" type="info">
            {{ item }}
          </el-tag>
        </div>
        <p class="desc ellipsis-2">
          <span>介绍：</span>
          {{ playlist?.playlist?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPlayListDetail } from '@/apis/playList'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const playlist = ref([])

onMounted(() => {
  getplaylist(route.params.id)
})

const getplaylist = async (id) => {
  const res = await getPlayListDetail(id)
  playlist.value = res.data
}
</script>

<style lang="scss" scoped>
.playlist-wrap {
  padding: 40px;
  border: 1px solid #ccc;
  .playlist-header {
    display: flex;
    justify-content: space-between;
    .left {
      flex: 1;
      margin-right: 20px;
    }
    .right {
      flex: 4;
      font-size: 12px;
      .title {
        h2 {
          font-weight: normal;
          font-size: 20px;
        }
      }
      .creator {
        .name {
          margin: 0 10px;
          color: $primaryColor1;
          &:hover {
            text-decoration: underline;
          }
        }
        .time {
          color: #999;
        }
      }
      .tags {
        align-items: center;
        color: #666;
        .el-tag{
          margin: 0 5px;
        }
      }
      .desc {
        color: #666;
        p {
          display: inline-block;
        }
      }
    }
  }
}
</style>
