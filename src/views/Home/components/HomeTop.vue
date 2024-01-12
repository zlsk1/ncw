<template>
  <div class="top-wrap">
    <div class="top-header fl-sb">
      <div class="left fl">
        <router-link to="/" class="title">
          榜单
        </router-link>
      </div>
      <div class="right">
        <router-link to="/">
          更多
        </router-link>
        <i />
      </div>
    </div>
    <div class="top-container">
      <div v-for="(item, index) in store.topId.slice(0, 3)" :key="item.name" class="item">
        <div class="header">
          <router-link to="/">
            <img :src="item.imgUrl" alt="">
          </router-link>
          <div class="right">
            <p class="name">
              {{ item.name }}
            </p>
            <span class="fl"><i class="play" /><i class="like" /></span>
          </div>
        </div>
        <ul class="content">
          <li v-for="(track, no) in topList[index]" :key="track.no" class="content-item">
            <div class="fl">
              <p class="rank">
                {{ no + 1 }}
              </p>
              <router-link to="/">
                <p class="track-name">
                  {{ track.name }}
                </p>
              </router-link>
              <div class="icon">
                <i class="play" @click="transmitSongInfo(track.id)" />
                <i class="addlist" />
                <i class="like" />
              </div>
            </div>
          </li>
        </ul>
        <div class="bottom">
          <router-link to="/">
            查看全部&gt;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTopStore } from '@/stores/top'
import { getPlayListDetail } from '@/apis/playList'
import { getSongUrl } from '@/apis/song'
const store = useTopStore()
const ids = ref([])
const topList = ref([])
const emit = defineEmits(['getsong'])

const getTopList = (ids) => {
  const p = Promise.all([
    getPlayListDetail(ids[0]),
    getPlayListDetail(ids[1]),
    getPlayListDetail(ids[2])
  ])
  p.then(res => {
    for (const item of res) {
      topList.value.push(item.data.playlist.tracks.slice(0, 10))
    }
  })
}
const transmitSongInfo = async id => {
  console.log(id)
  const res = await getSongUrl(id)
  console.log(res)
  emit('getsong', res)
}

onMounted(async () => {
  await store.actionTopId()
  ids.value = [store.topId[0].id, store.topId[1].id, store.topId[2].id]
  getTopList(ids.value)
})
</script>

<style lang="scss" scoped>
  .top-header {
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
  .top-container {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    .item {
      flex: 1;
      &:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
      .header {
        display: flex;
        padding: 20px 0 20px 20px;
        background-color: #f4f4f4;
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
        .right {
          .name {
            margin-bottom: 20px;
            font-weight: 700;
          }
          i {
            display: block;
            width: 22px;
            height: 22px;
            cursor: pointer;
          }
          .play {
            margin-right: 10px;
            background: url('@/assets/icons/index.png')  -267px -205px no-repeat;
          }
          .like {
            background: url('@/assets/icons/index.png') -300px -205px no-repeat;
          }
        }
      }
      .content {
        .content-item {
          position: relative;
          height: 35px;
          padding-left: 20px;
          line-height: 35px;
          &:nth-child(odd) {
            background-color: #e8e8e8;
          }
          &:nth-child(-n+3) .rank {
            color: $themeColor;
          }
          &:hover .icon {
            display: flex;
            justify-content: space-around;
          }
          &:hover .track-name {
            width: 96px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .rank {
            position: absolute;
            left: 20px;
            width: 30px;
            text-align: center;
            font-size: 16px;
            color: #666;
          }
          .track-name {
            position: absolute;
            left: 50px;
            width: 100%;
            font-size: 12px;
            color: #000;
          }
          .icon {
            display: none;
            position: absolute;
            top: calc(50% - 8.5px);
            right: 10px;
            width: 82px;
            i {
              display: block;
              width: 17px;
              height: 17px;
              cursor: pointer;
            }
            .play {
              background: url('@/assets/icons/index.png') -267px -268px no-repeat;
            }
            .addlist {
              background: url('@/assets/icons/icon.png') 0 -698px no-repeat;
            }
            .like {
              background: url('@/assets/icons/index.png') -297px -268px no-repeat;
            }
          }
        }
      }
      .bottom {
        height: 35px;
        padding-right: 30px;
        line-height: 35px;
        text-align: end;
        font-size: 12px;
        background-color: #e8e8e8;
        cursor: pointer;
      }
    }
  }
</style>
