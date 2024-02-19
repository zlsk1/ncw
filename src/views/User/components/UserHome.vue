<template>
  <div class="w980 home-wrap">
    <div class="home-header">
      <div class="avatar">
        <img :src="profile?.avatarUrl + '?param=180y180'" alt="">
        <router-link v-if="isMe" to="/">
          更换头像
        </router-link>
      </div>
      <div class="header-right">
        <div class="name">
          <div class="fl-sb">
            <div class="fl-sb">
              <h2>{{ profile?.nickname }}</h2>
              <img
                v-if="isMe"
                :src="vip?.icon + '?param=60y36'"
                alt=""
                class="vipLevel"
              >
              <span class="level-wrap">
                {{ level }}
                <i class="level" />
              </span>
              <i v-if="profile?.gender === 1" class="boy" />
              <i v-else class="girl" />
              <template v-if="!isMe">
                <el-button :icon="Message" @click="openSendDialog">
                  发私信
                </el-button>
                <el-button v-if="profile?.followed" :icon="Select" @click="follow(0)">
                  已关注
                </el-button>
                <el-button v-else :icon="Plus" @click="follow(1)">
                  关注
                </el-button>
              </template>
            </div>
            <div v-if="isMe" class="edit-info" @click="toEdit">
              <button>
                编辑个人资料
              </button>
            </div>
            <div v-else-if="isArtist" class="edit-info" @click="toEdit">
              <button>
                <router-link :to="`/artist/${profile?.artistId}`">
                  查看歌手页
                </router-link>
              </button>
            </div>
          </div>
          <div v-if="isArtist" class="identify">
            <img class="icon-identify" :src="isArtist.imageUrl">
            <span>{{ profile?.description }}</span>
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
        <div v-if="profile?.signature" class="f12 city">
          个人签名：{{ profile?.signature }}
        </div>
        <div v-if="getArea()" class="f12 city">
          所在地区：{{ getArea() }}
        </div>
        <!-- <div class="f12 social">
          社交网络{{}}
        </div> -->
      </div>
    </div>
    <div class="my-playlist">
      <h3 class="title">
        <span>{{ `${isMe ? profile?.nickname : '我'}创建的歌单（${playlist?.length}` }}）</span>
      </h3>
      <div class="content">
        <Card v-for="item in playlist" :key="item.id">
          <router-link :to="`/playlist/${item.id}`">
            <Pic :src="item.img + '?param=140y140'" mask1 />
          </router-link>
          <div class="card-play fl-sb">
            <i class="icon-listen" />
            <span class="count f12">{{ formatPlayCount(item.playCount) }}</span>
            <i class="play" title="播放" @click="addPlayList(item.id)" />
          </div>
          <template #footer>
            <router-link :to="`/playlist/${item.id}`">
              <p class="ellipsis-1 name" :title="item.name">
                {{ item.name }}
              </p>
            </router-link>
          </template>
        </Card>
      </div>
    </div>
    <el-dialog v-model="isShowSendDialog" width="30%">
      <template #header>
        发新私信
      </template>
      <div class="fl tags">
        <el-tag
          v-for="(item, index) in dynamicTags"
          :key="index"
          closable
          class="items"
          type="info"
          @close="handleClose(item)"
        >
          {{ item }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="inputRef"
          v-model="inputValue"
          size="small"
          style="max-width: 80px"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >
          + New Tag
        </el-button>
      </div>
      <el-input
        v-model="sendText"
        type="textarea"
        maxlength="200"
        show-word-limit
        class="sendText"
      />
      <div class="bottom fl-sb">
        <Emj @choose="chooseEmj">
          <div class="emj">
            <i class="icon-emj" />
          </div>
        </Emj>
        <el-button @click="handleSendText">
          发送
        </el-button>
      </div>
    </el-dialog>
    <Login :is-show="isShow" @close="e => isShow = e" />
  </div>
</template>

<script setup>
import { usePlayStore } from '@/stores/play'
import { getVipLevelAPI, getUserPlaylistAPI, getUserDetail, followUserAPI, sendTextAPI } from '@/apis/user'
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { formatPlayCount, hasProfile } from '@/utils/index'
import { provinceAndCityData } from 'element-china-area-data'
import { Message, Plus, Select } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Emj from '@/components/Emj'
import Login from '@/views/Login'

const router = useRouter()
const route = useRoute()

const playStore = usePlayStore()

let level = ''
let isArtist = ''

const vip = ref(null)
const playlist = ref(null)
const profile = ref(null)
const isShowSendDialog = ref(false)
const inputVisible = ref(false)
const inputValue = ref('')
const dynamicTags = ref([])
const inputRef = ref(null)
const sendText = ref('')
const isShow = ref(false)

const isMe = computed(() => {
  return hasProfile() ? Number(route.params.id) === JSON.parse(localStorage.getItem('userInfo')).profile.userId : false
})

onMounted(async () => {
  await getDetail(route.params.id)
  getVip(profile.value.userId)
  getUserPlaylist(profile.value.userId)
  dynamicTags.value.push(profile.value?.nickname)
})

onBeforeUnmount(() => {
  addPlayList = null; toEdit = null; follow = null; openSendDialog = null; handleInputConfirm = null; showInput = null; handleClose = null
})

onBeforeRouteUpdate(async (to, from) => {
  if (to) {
    await getDetail(to.params.id)
    getVip(to.params.id)
    getUserPlaylist(to.params.id)
  }
})

const getVip = async id => {
  const res = await getVipLevelAPI(id)
  vip.value = {
    level: res.data.data.redVipLevel,
    icon: res.data.data.redVipLevelIcon
  }
}

const getDetail = async id => {
  const res = await getUserDetail(id)
  profile.value = res.data.profile
  level = res.data.level
  isArtist = res.data.identify ? res.data.identify : null
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
    if (profile.value?.province.toString().slice(0, 2) === provinceAndCityData[i].value) {
      const province = provinceAndCityData[i].label
      const { label } = provinceAndCityData[i].children.find(v => v.value === profile.value?.city.toString() || v.value === profile.value?.city.toString().slice(0, 4))
      return province + ' - ' + label
    }
  }
}

let toEdit = () => { router.push(`/user/update/${profile.value.userId}`) }

let follow = async t => {
  if (hasProfile()) {
    if (t !== 1) {
      ElMessageBox.alert('请使用手机登录网易云音乐APP扫码完成验证，登录账号要和当前账号一致', '请完成短信验证', {
        showConfirmButton: false,
        showCancelButton: false
      })
    } else {
      await followUserAPI({ id: route.params.id, t })
      getDetail(route.params.id)
    }
  } else isShow.value = !isShow.value
}

let openSendDialog = () => {
  hasProfile()
    ? isShowSendDialog.value = !isShowSendDialog.value
    : isShow.value = !isShow.value
}

let handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

let showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

let handleClose = tag => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const chooseEmj = e => {
  sendText.value += `[${e}]`
}

const handleSendText = async () => {
  if (!dynamicTags.value.length || !sendText.value) {
    ElMessage.warning('输入点内容再发送吧')
  } else {
    const res = await sendTextAPI({ user_ids: profile.value.userId, msg: sendText.value.trim() })
    if (res.data.code === 200) ElMessage.success('发送成功！')
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
        padding-bottom: 10px;
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
          margin-right: 10px;
          background: url('@/assets/icons/icon.png') -41px -57px no-repeat;
        }
        .girl {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
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
        .identify {
          margin-top: 10px;
          .icon-identify {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            display: inline-block;
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
        transition: .2s;
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
      line-height: 20px;
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
      .card-wrap {
        width: 140px;
        height: 140px;
        margin-right: calc((100% - 700px) / 4);
        margin-bottom: 40px;
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
  .tags {
    margin-bottom: 10px;
    .items {
      margin-right: 10px;
    }
  }
  .sendText {
    margin-bottom: 10px ;
  }
  .emj {
    margin-right: 10px;
    .icon-emj {
      display: block;
      width: 18px;
      height: 18px;
      background: url('@/assets/icons/icon.png') -40px -490px no-repeat;
      cursor: pointer;
    }
  }
}
</style>
