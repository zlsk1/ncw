<template>
  <div class="side-wrap">
    <div v-if="avator" class="userInfo-wrap">
      <div class="top">
        <router-link :to="`/user/home/${userId}`" class="img-wrap">
          <img :src="`${avator}?param=80y80`" alt="">
        </router-link>
        <div>
          <div class="fl-sb">
            <router-link :to="`/user/home/${userId}`" class="nickname ellipsis-1">
              {{ nickname }}
            </router-link>
            <img
              class="vip"
              src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582188101/3e49/6a48/39f3/c4124c59baca58313e16a62c5577808b.png"
              alt=""
            >
          </div>
          <router-link class="level" to="/user/level">
            {{ info?.level }}
            <i></i>
          </router-link>
          <!-- <el-button class="signin is-check" disabled>
            已签到
          </el-button> -->
          <el-button
            type="primary"
            class="signin"
            @click="handleSignin"
          >
            签到
          </el-button>
        </div>
      </div>
      <ul class="fl-sb bottom">
        <li>
          <router-link to="/">
            <p class="count">
              {{ info?.eventCount }}
            </p>
            <p class="f12">
              动态
            </p>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <p class="count">
              {{ info?.follows }}
            </p>
            <p class="f12">
              关注
            </p>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <p class="count">
              {{ info?.followeds }}
            </p>
            <p class="f12">
              粉丝
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="youke">
      <p class="f12">
        登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      </p>
      <a href="#" @click.prevent="isShow = !isShow">用户登录</a>
    </div>
    <div class="singer-wrap">
      <div class="header fl-sb">
        <span>入驻歌手</span>
        <span>查看全部 &gt;</span>
      </div>
      <ul class="content">
        <li v-for="item in singerList" :key="item.id">
          <router-link :to="`/artist/${item.id}`">
            <img v-lazy="`${item.picUrl}?param=62y62`" alt="">
            <div>
              <p class="name">
                {{ item.name }}
              </p>
              <!-- <p class="desc ellipsis">
              {{}}
            </p> -->
            </div>
          </router-link>
        </li>
      </ul>
      <router-link class="bottom" to="/">
        申请成为网易音乐人
      </router-link>
    </div>
    <div class="dj-wrap">
      <div class="header">
        热门主播
      </div>
      <ul class="content">
        <li v-for="item in djList" :key="item.id">
          <router-link to="/">
            <img v-lazy="`${item.avatarUrl}?param=40y40`" alt="">
            <div>
              <p class="name">
                {{ item.nickName }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <Login :is-show="isShow" @close="e => isShow = e"></Login>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { getHotSinger } from '@/apis/singer'
import { getHotDj } from '@/apis/dj'
import { handleSigninAPI } from '@/apis/user'
import Login from '@/views/Login/index.vue'
import { ElMessage } from 'element-plus'
import type { artistType, djPoplistType } from '@/types'

const store = useUserStore()
const { avator, nickname } = storeToRefs(store)

const userId = JSON.parse(localStorage.getItem('userInfo') as string)?.profile.userId

const singerList = ref<artistType[]>()
const djList = ref<djPoplistType[]>([])
const info = ref<any>(null)
const isShow = ref(false)

onMounted(() => {
  avator.value ? getDetail() : ''
  getSinger(5)
  getDj(5)
})

watch(avator, val => {
  if (val) getDetail()
})

const getDetail = () => {
  store.actiongetUserDetail(JSON.parse(localStorage.getItem('userInfo') as string)?.profile.userId)
  const { level, profile } = JSON.parse(localStorage.getItem('userInfo') as string)
  info.value = {
    eventCount: profile.eventCount,
    follows: profile.follows,
    followeds: profile.followeds,
    level: level
  }
}

const getSinger = async(limit: number) => {
  const res = await getHotSinger(limit)
  singerList.value = res.data.artists
}

const getDj = async(limit: number) => {
  const res = await getHotDj(limit)
  djList.value = res.data.data.list
}

const handleSignin = async() => {
  const res = await handleSigninAPI()
  ElMessage.warning(res.data.msg)
}
</script>

<style lang="scss" scoped>
.side-wrap {
  height: 100%;
  border: 1px solid #d3d3d3;
  border-right: none;
  .userInfo-wrap {
    background-color: #f9f9f9;
    padding: 20px;
    .top {
      display: flex;
      margin-bottom: 20px;
      .img-wrap {
        display: block;
        width: 100%;
        height: 100%;
        margin-right: 10px;
        padding: 2px;
        border: 1px solid #dadada;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .nickname {
        display: block;
        width: 60px;
        font-weight: 700;
      }
      .vip {
        width: 45px;
        height: 16px;
        margin-left: 5px;
      }
      .level {
        display: flex;
        width: 40px;
        height: 20px;
        margin: 10px 0;
        padding-left: 25px;
        line-height: 18px;
        font-size: 12px;
        font-style: italic;
        overflow: hidden;
        color: #999;
        cursor: pointer;
        background: url('@/assets/icons/icon2.png') -130px -64px no-repeat;
        i {
          display: block;
          width: 10px;
          height: 17px;
          background: url('@/assets/icons/icon2.png') -192px -64px no-repeat;
        }
      }
      .signin {
        width: 90px;
        height: 30px;
        color: #fff;
        background-color: #409eff;
        border-radius: 6px;
        cursor: pointer;
      }
      .is-check {
        color: #bebebe;
        background-color: #ececec;
      }
    }
    .bottom {
      li {
        padding: 0 20px;
        a {
          &:hover p {
            color: #0c73c2 !important;
          }
          .count {
            color: #666;
            font-size: 18px;
          }
        }
      }
      li:nth-child(2) {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: calc(50% - 15px);
          right: 0;
          width: 1px;
          height: 30px;
          background: #dadada;
        }
        &::before {
          content: '';
          position: absolute;
          top: calc(50% - 15px);
          left: 0;
          width: 1px;
          height: 30px;
          background: #dadada;
        }
      }
    }
  }
  .youke {
    padding: 15px 20px;
    background-color: #e9e9e9;
    p {
      width: 205px;
      line-height: 20px;
      color: #666;
    }
    a {
      display: block;
      width: 100px;
      height: 30px;
      margin: 20px auto 0 auto;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background-color: #d41414;
      border-radius: 6px;
      border: 1px solid #ab080d;
    }
  }
  .singer-wrap {
    width: 100%;
    padding: 20px;
    border-top: 1px solid #b2b2b2;
    .header {
      padding-bottom: 5px;
      font-size: 12px;
      border-bottom: 1px solid #bababa;
      span:nth-child(1) {
        font-weight: 700;
      }
      span:nth-child(2) {
        color: #555;
        cursor: pointer;
      }
    }
    .bottom {
      display: block;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
      background-color: #f4f4f4;
      border: 1px solid #c4c4c4;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .content {
    margin-top: 20px;
    li {
      margin-bottom: 15px;
      a {
        display: flex;
        img {
          width: 60px;
          height: 60px;
        }
        div {
          width: 100%;
          background-color: #fafafa;
          border: 1px solid #e9e9e9;
          .name {
            margin: 10px 0 0 10px;
            font-weight: 700;
          }
        }
      }
    }
  }
  .dj-wrap {
    padding: 20px;
    font-size: 12px;
    .header {
      margin-bottom: 10px;
      padding-bottom: 5px;
      font-size: 12px;
      border-bottom: 1px solid #bababa;
    }
    img {
      width: 40px !important;
      height: 40px !important;
    }
    .name {
      font-weight: normal !important;
    }
  }
}
</style>
