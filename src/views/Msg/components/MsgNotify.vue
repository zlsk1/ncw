<template>
  <div class="msg-notice-wrap">
    <div class="notice-header">
      <h3 class="f14">
        通知
      </h3>
    </div>
    <div class="notice-content">
      <ul>
        <li
          v-for="item in noticeData?.notices"
          :key="item.lastMsgId"
          class="items"
          @click="toDetail(JSON.parse(item.notice).generalNotice?.webUrl)"
        >
          <router-link :to="`/user/home/${JSON.parse(item.notice).user.userId}`" class="avatar">
            <img v-if="item.newMsgCount === 0" :src="JSON.parse(item.notice).user.avatarUrl + '?param=40y40'" alt="">
            <el-badge v-else :value="item.newMsgCount" class="item">
              <img :src="JSON.parse(item.notice).user.avatarUrl + '?param=40y40'" alt="">
            </el-badge>
          </router-link>
          <div v-if="JSON.parse(item.notice).type === 10">
            <div class="items-name fl-sb">
              <div>
                <router-link :to="`/user/home/${JSON.parse(item.notice).user.userId}`" class="name">
                  {{ JSON.parse(item.notice).user.nickname }}
                </router-link>
                <span class="action">{{ JSON.parse(item.notice).generalNotice?.actionDesc }}</span>
              </div>
              <div class="time">
                {{ formatTimeStamp(item.time) }}
                <i class="icon-clock" />
              </div>
            </div>
            <div class="msg">
              <p class="ellipsis-1">
                {{ JSON.parse(item.notice).generalNotice?.content }}
              </p>
            </div>
          </div>
          <div v-else-if="JSON.parse(item.notice).type === 2">
            <div class="items-name fl-sb">
              <div>
                <router-link :to="`/user/home/${JSON.parse(item.notice).user.userId}`" class="name">
                  {{ JSON.parse(item.notice).user.nickname }}
                </router-link>
                <span class="action">收藏了你的歌单</span>
              </div>
              <div class="time">
                {{ formatTimeStamp(item.time) }}
                <i class="icon-clock" />
              </div>
            </div>
            <div class="msg">
              <p class="ellipsis-1">
                [{{ JSON.parse(item.notice).playlist.name }}]
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div
        v-if="!loading"
        ref="bar"
        class="bar"
        style="width: 100%;height:1px"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getNoticesAPI } from '@/apis/user'
import { ref, onMounted, watch, nextTick } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { formatTimeStamp } from '@/utils/time'
import { ElLoading } from 'element-plus'

const noticeData = ref(null)
const bar = ref(null)
const loading = ref(true)

const limit = 20
let _lasttime = 0

const targetIsVisible = useElementVisibility(bar)

watch(targetIsVisible, async val => {
  // console.log(val)
  if (val && noticeData.value?.more) {
    const loadingInstance = ElLoading.service({
      target: '.bar',
      text: '拼命加载中'
    })
    await getNotices(limit, _lasttime)
    nextTick(() => {
      loadingInstance.close()
    })
  }
})

onMounted(() => {
  getNotices()
})

const getNotices = async (limit, lasttime) => {
  const res = await getNoticesAPI({ limit, lasttime })
  noticeData.value = res.data
  // console.log(JSON.parse(noticeData.value.notices[0].notice))
  loading.value = false
  _lasttime = noticeData.value.notices[noticeData.value.notices.length - 1].time
}

const toDetail = (url) => {
  if (typeof url !== 'number') location.href = url
  // router.push({ path: 'private_detail', query: { id, name }})
}
</script>

<style lang="scss" scoped>
.msg-notice-wrap {
  padding: 40px;
  border-right: 1px solid #ccc;
  .notice-header {
    padding-bottom: 6px;
    border-bottom: 2px solid $themeColor;
  }
  .notice-content {
    .items {
      display: flex;
      justify-content: space-between;
      padding: 15px 10px;
      border-bottom: 1px dashed #ccc;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
      &:hover .msg .del-btn{
        display: block;
      }
      .avatar {
        margin-right: 20px;
      }
      .items-name {
        margin-bottom: 10px;
        .name {
          font-weight: 700;
          &:hover {
            text-decoration: underline;
          }
        }
        .action {
          margin-left: 10px;
          font-size: 12px;
          color: #999;
        }
      }
      .time {
        font-size: 12px;
        color: #999;
        .icon-clock {
          display: inline-block;
          width: 13px;
          height: 13px;
          margin: -4px 0 0 10px;
          vertical-align: middle;
          background: url('@/assets/icons/icon.png') -18px -682px no-repeat;
        }
      }
      .msg {
        width: 640px;
        height: 20px;
        font-size: 12px;
        color: #999;
        p {
          width: 520px;
        }
        .del-btn {
          display: none;
        }
      }
      :deep(.el-link) {
        font-size: 12px;
      }
    }
  }
}
</style>
