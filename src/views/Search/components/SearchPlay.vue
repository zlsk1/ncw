<template>
  <div>
    <div v-for="(item, index) in props?.result?.songs" :key="item.id" class="items">
      <div class="fl-sb song">
        <div class="name fl">
          <i class="icon icon-play" @click="play({id:item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')})" />
          <RouterLink :to="`/song/${item.id}`" :title="item.name">
            <span>{{ item.name }}</span>
          </RouterLink>
          <span v-if="item.tns" class="tns"> - ({{ item.tns.map(v => v).join(',') }})</span>
        </div>
        <div class="fl-sb btns">
          <i class="icon icon-add" title="添加到播放列表" @click="play({id:item.id, picUrl: item.al.picUrl, name: item.name, singer: item.ar.map(v => { return v.name }).join('/')}, 1)" />
          <i class="icon icon-collect" title="收藏" />
          <i class="icon icon-share" title="分享" />
          <i class="icon icon-download" title="下载" />
        </div>
        <div class="artist ellipsis-1" :title="item.ar.map(v => v.name).join('/')">
          <router-link v-for="(item1, i) in item.ar" :key="item1.id" :to="`/artist/${item1.id}`">
            <span>{{ i === item.ar.length - 1 ? item1.name : `${item1.name}/` }}</span>
          </router-link>
        </div>
        <router-link to="/" class="album ellipsis-1" :title="item.al.name">
          <span>《{{ item.al.name }}》</span>
        </router-link>
        <span>{{ formatSongDuration(item.dt, 0) }}</span>
      </div>
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup>
import { usePlayStore } from '@/stores/play'
import { formatSongDuration } from '@/utils/time'
import { onBeforeMount } from 'vue'

const playStore = usePlayStore()

const props = defineProps({
  result: { type: Object, default: () => {} }
})

onBeforeMount(() => {
  play = null
})

let play = (o, type) => {
  playStore.actionAddSong(o, type)
}
</script>

<style lang="scss" scoped>
.items {
  .song {
    padding: 10px 30px 10px 10px;
      font-size: 12px;
      border: 1px solid transparent;
      &:nth-child(even) {
        background-color: #f7f7f7;
      }
      &:hover {
        background-color: #f2f2f2;
        border: 1px solid #e1e1e1;
        .icon-add {
          width: 13px;
          height: 13px;
          margin-top: -2px;
          background: url('@/assets/icons/icon.png') 0 -700px no-repeat;
          &:hover {
            background-position: -22px -700px;
          }
        }
        .icon-collect {
          width: 18px;
          height: 16px;
          background-position: 0 -174px;
          &:hover {
            background-position: -20px -174px;
          }
        }
        .icon-share {
          width: 18px;
          height: 16px;
          background-position: 0 -195px;
          &:hover {
            background-position: -20px -195px;
          }
        }
        .icon-download {
          width: 18px;
          height: 16px;
          background-position: -81px -174px;
          &:hover {
            background-position: -104px -174px;
          }
        }
      }
      .icon {
        display: block;
        background: url('@/assets/icons/table.png') no-repeat;
        cursor: pointer;
      }
      .icon-play {
        width: 17px;
        height: 17px;
        margin-right: 10px;
        background-position: 0 -103px;
        &:hover {
          background-position: 0 -128px;
        }
      }
      .name {
        flex: 2;
        align-items: center;
        span:first-child {
          margin-right: 4px;
          &:hover {
            text-decoration: underline;
          }
        }
        .tns {
          color: #999;
        }
      }
      .btns {
        flex: .5;
        margin-right: 20px;
      }
      .artist {
        flex: .8;
        margin-right: 20px;
        span {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .album {
        flex: 1;
        margin-right: 20px;
        color: #666;
        span {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
}
</style>
