<template>
  <div class="playlist-wrap w980">
    <div class="playlist-left">
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
            <router-link to="/">
              <el-tag v-for="(item, index) in playlist?.playlist?.tags" :key="index" type="info">
                {{ item }}
              </el-tag>
            </router-link>
          </div>
          <p class="desc">
            <span>介绍：</span>
            {{ playlist?.playlist?.description.slice(0, 100).concat('...') }}
          </p>
        </div>
      </div>
    </div>
    <div class="playlist-right">
      <DownLoadside />
    </div>
  </div>
</template>

<script setup>
import { getPlayListDetail } from '@/apis/playList'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DownLoadside from '@/components/DownLoadside'

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
  display: flex;
  // padding: 40px 0;
  border: 1px solid #ccc;
  .playlist-left {
    flex: 2.5;
    padding: 40px;
    border-right: 1px solid #ccc;
    .playlist-header {
      display: flex;
      justify-content: space-between;
      .left {
        flex: 1;
        margin-right: 30px;
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
          line-height: 18px;
          white-space: pre-line;
          color: #666;
          p {
            display: inline-block;
          }
        }
      }
    }
  }
  .playlist-right {
    flex: 1;
  }
}
</style>
