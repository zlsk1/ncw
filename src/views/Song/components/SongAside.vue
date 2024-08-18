<template>
  <div class="songAside-wrap">
    <div class="simi">
      <div class="header">
        相似歌曲
      </div>
      <ul>
        <li
          v-for="item in simiList"
          :key="item.id"
          class="simi-items fl-sb"
        >
          <div class="left">
            <div>
              <router-link :to="`/song/${item.id}`" class="name">
                <p class="ellipsis-1" :title="item.name">
                  {{ item.name }}
                </p>
              </router-link>
            </div>
            <div class="ellipsis-1" :title="item.artists.length === 1 ? item.name : item.artists.map(v => { return v.name }).join('/')">
              <router-link
                v-for="(item1, index) in item.artists"
                :key="item1.id"
                :to="`/artist/${item1.id}`"
                class="singer"
              >
                {{ index !== item.artists.length - 1 ? `${item1.name}/` : item1.name }}
              </router-link>
            </div>
          </div>
          <div class="right">
            <i class="icon-play" @click="play({ id: item.id, picUrl: item.album.picUrl, name: item.name, singer:item.artists.map(v => { return v.name }).join('/') })"></i>
            <i class="icon-add" @click="play({ id: item.id, picUrl: item.album.picUrl, name: item.name, singer:item.artists.map(v => { return v.name }).join('/') }, 1)"></i>
          </div>
        </li>
      </ul>
    </div>
    <DownLoadSide></DownLoadSide>
  </div>
</template>

<script lang="ts" setup>
import { getSongSimilar } from '@/apis/song'
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import DownLoadSide from '@/components/DownLoadSide'

const playStore = usePlayStore()

const route = useRoute()

const simiList = ref(null)

onMounted(() => {
  getSimi()
})

onBeforeRouteUpdate((to, from) => {
  if (to) getSimi(to.params.id)
})

const getSimi = async() => {
  const res = await getSongSimilar(route.params.id)
  simiList.value = res.data.songs
}

const play = (o, type) => { playStore.actionAddSong(o, type) }
</script>

<style lang="scss" scoped>
  .songAside-wrap {
    padding: 20px 40px 0 20px;
    border-right: 1px solid #d3d3d3;
    .header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      font-weight: 700;
      font-size: 12px;
      border-bottom: 1px solid #ccc;
    }
    .simi {
      padding-bottom: 30px;
      .simi-items {
        margin-bottom: 10px;
        .left {
          width: 160px;
          a {
            font-size: 12px;
            &:hover {
              text-decoration: underline;
            }
          }
          .name {
            color: #333;
          }
          .singer {
            color: #999
          }
        }
        .right {
          i {
            display: inline-block;
            width: 10px;
            height: 11px;
            background: url('@/assets/icons/icon2.png') no-repeat;
            cursor: pointer;
          }
          .icon-play {
            margin-right: 20px;
            background-position: -69px -455px;
            opacity: .8;
            &:hover {
              opacity: 1;
            }
          }
          .icon-add {
            background-position: -87px -454px;
            opacity: .8;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
