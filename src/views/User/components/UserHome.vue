<template>
  <div class="w980 home-wrap">
    <div class="home-header">
      <div class="avatar">
        <img :src="userStore?.avator + '?param=180y180'" alt="">
        <router-link to="/">
          更换头像
        </router-link>
      </div>
      <div class="header-right">
        <div class="name">
          <div class="fl-sb">
            <h2>{{ userStore.nickname }}</h2>
            <img :src="vip?.icon + '?param=60y36'" alt="" class="vipLevel">
            <span class="level-wrap">
              {{ level }}
              <i class="level" />
            </span>
            <i v-if="profile?.gender" class="boy" />
            <i v-else class="girl" />
          </div>
          <div to="/" class="edit-info">
            <button>编辑个人资料</button>
          </div>
        </div>
        <div class="event">
          <ul class="fl">
            <li>
              <router-link to="/">
                <p class="event-count">
                  {{ profile?.eventCount }}
                </p>
                <p class="event-name">
                  动态
                </p>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <p class="event-count">
                  {{ profile?.follows }}
                </p>
                <p class="event-name">
                  关注
                </p>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <p class="event-count">
                  {{ profile?.followeds }}
                </p>
                <p class="event-name">
                  粉丝
                </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="f12 city">
          所在地区：{{ getArea() }}
        </div>
        <div class="f12 social">
          社交网络{{}}
        </div>
      </div>
    </div>
    <div class="my-playlist">
      <h3 class="title">
        我创建的歌单（{{ playlist?.length }}）
      </h3>
      <div class="content">
        <Card v-for="item in playlist" :key="item.id">
          <router-link to="/">
            <Pic :src="item.img + '?param=140y140'" mask1 />
          </router-link>
          <div class="card-play fl-sb">
            <i class="icon-listen" />
            <span class="count f12">{{ formatPlayCount(item.playCount) }}</span>
            <i class="play" title="播放" @click="addPlayList(item.id)" />
          </div>
          <template #footer>
            <p class="ellipsis-1 name" :title="item.name">
              {{ item.name }}
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { usePlayStore } from '@/stores/play'
import { getVipLevelAPI, getUserPlaylistAPI } from '@/apis/user'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card from '@/components/Card'
import { formatPlayCount } from '@/utils/index'
import { provinceAndCityData } from 'element-china-area-data'

const userStore = useUserStore()
const playStore = usePlayStore()

const profile = JSON.parse(localStorage.getItem('userInfo')).profile
const level = JSON.parse(localStorage.getItem('userInfo')).level

const vip = ref(null)
const playlist = ref(null)

onMounted(() => {
  getVip()
  getUserPlaylist(profile.userId)
})

onBeforeUnmount(() => {
  addPlayList = null
})

const getVip = async () => {
  const res = await getVipLevelAPI(profile.userId)
  vip.value = {
    level: res.data.data.redVipLevel,
    icon: res.data.data.redVipLevelIcon
  }
}

const getUserPlaylist = async (uid, limit, offset) => {
  const res = await getUserPlaylistAPI({ uid, limit, offset })
  playlist.value = res.data.playlist.map(v => { return { name: v.name, id: v.id, playCount: v.playCount, img: v.coverImgUrl } })
}

let addPlayList = async id => {
  playStore.actionAddSongs(id)
}

const getArea = () => {
  for (let i = 0; i < provinceAndCityData.length; i++) {
    if (profile.province.toString().slice(0, 2) === provinceAndCityData[i].value) {
      const province = provinceAndCityData[i].label
      const { label } = provinceAndCityData[i].children.find(v => v.value === profile.city || v.value === profile.city.toString().slice(0, 4))
      return province + ' - ' + label
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  padding: 40px;
  .home-header {
    display: flex;
    margin-bottom: 40px;
    .avatar {
      position: relative;
      img {
        width: 188px;
        height: 188px;
        margin-right: 40px;
        padding: 3px;
        border: 1px solid #d5d5d5;
      }
      a {
        display: none;
      }
      &:hover a {
        display: block;
        position: absolute;
        bottom: 0;
        left: 4px;
        width: 180px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: #8e8e8e;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .header-right {
      width: 100%;
      .name {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #dddddd;
        h2 {
          margin-right: 10px;
          font-size: 22px;
          font-weight: normal;
        }
        .vipLevel {
          width: 60px;
          height: 22px;
          margin-top: 4px;
        }
        .level-wrap {
          display: flex;
          width: 46px;
          height: 19px;
          margin: 2px 10px 0 10px;
          padding-left: 29px;
          line-height: 21px;
          font-weight: 700;
          font-style: italic;
          color: #e03a24;
          overflow: hidden;
          background: url('@/assets/icons/icon2.png') -135px -190px no-repeat;
          .level {
            display: block;
            width: 9px;
            height: 19px;
            background: url('@/assets/icons/icon2.png') -191px -190px no-repeat;
          }
        }
        .boy {
          display: block;
          width: 20px;
          height: 20px;
          background: url('@/assets/icons/icon.png') -41px -57px no-repeat;
        }
        .girl {
          display: block;
          width: 20px;
          height: 20px;
          background: url('@/assets/icons/icon.png') -41px -27px no-repeat;
        }
        .edit-info {
          padding: 6px 15px;
          background: linear-gradient(#fefefe,#fbfbfb,#fcfcfc,#fdfdfd,#f7f7f7,#f6f6f6,#f5f5f5,#f4f4f4,#f3f3f3,#f2f2f2,#fff);
          border: 1px solid #c4c4c4;
          border-radius: 4px;
          cursor: pointer;
          transition: .3s;
          &:hover {
            opacity: .8;
          }
          button {
            background-color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .event {
      margin-bottom: 20px;
      li {
        &:nth-child(2) a::after {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 1px;
          height: calc(100% - 10px);
          background-color: #ddd;
        }
        &:nth-child(2) a::before {
          content: '';
          position: absolute;
          right: 0;
          top: 10px;
          width: 1px;
          height: calc(100% - 10px);
          background-color: #ddd;
        }
        &:hover a, &:hover .event-name {
          color: #409eff;
        }
      }
      li:nth-child(1) a {
        display: block;
        padding-right: 40px;
        padding-top: 10px;
      }
      li:nth-child(n+2) a {
        position: relative;
        display: block;
        padding: 10px 40px 0 20px;
      }
      a {

        transition: .3s;
      }
      .event-count {
        font-size: 22px;
      }
      .event-name {
        font-size: 12px;
        color: #666;
      }
    }
    .city, .social {
      margin-bottom: 10px;
      color: #666;
    }
  }
  .my-playlist {
    .title {
      padding-bottom: 6px;
      border-bottom: 2px solid $themeColor;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .card-wrap:nth-child(5n) {
        margin-right: 0;
      }
      .card-wrap:nth-child(-n+5) {
        margin-bottom: 40px;
      }
      .card-wrap {
        width: 140px;
        height: 140px;
        margin-right: calc((100% - 700px) / 4);
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
        .name {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
