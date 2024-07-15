<template>
  <div class="msg-private-wrap">
    <div class="private-header fl-sb">
      <h3 class="f14">
        私信
      </h3>
      <el-button>发送私信</el-button>
    </div>
    <div class="private-content">
      <ul>
        <li
          v-for="item in msgData?.msgs"
          :key="item.lastMsgId"
          class="items"
          @click="toDetail(item.fromUser.userId, item.fromUser.nickname)"
        >
          <router-link :to="`/user/home/${item.fromUser.userId}`" class="avatar">
            <img v-if="item.newMsgCount === 0" :src="item.fromUser.avatarUrl + '?param=50y50'" alt="">
            <el-badge v-else :value="item.newMsgCount" class="item">
              <img :src="item.fromUser.avatarUrl + '?param=50y50'" alt="">
            </el-badge>
          </router-link>
          <div>
            <div class="items-name fl-sb">
              <router-link :to="`/user/home/${item.fromUser.userId}`" class="name">
                {{ item.fromUser.nickname }}
              </router-link>
              <div class="time">
                {{ formatTimeStamp(item.lastMsgTime) }}
                <i class="icon-clock" />
              </div>
            </div>
            <div class="msg fl-sb">
              <p class="ellipsis-1">
                {{ !JSON.parse(item.lastMsg).msg && JSON.parse(item.lastMsg).picInfo ? '分享图片' : JSON.parse(item.lastMsg).msg }}
              </p>
              <el-link type="primary" class="del-btn">
                删除
              </el-link>
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
import { getMsgAPI } from '@/apis/user'
import { onMounted, ref, watch, nextTick } from 'vue'
import { formatTimeStamp } from '@/utils/time'
import { useElementVisibility } from '@vueuse/core'
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const msgData = ref<any>()
const bar = ref(null)
const loading = ref(true)

const targetIsVisible = useElementVisibility(bar)

let _offset = 0
const limit = 20

watch(targetIsVisible, async val => {
  if (val && msgData.value?.more) {
    const loadingInstance = ElLoading.service({
      target: '.bar',
      text: '拼命加载中'
    })
    await getMsg(limit, _offset)
    nextTick(() => {
      loadingInstance.close()
    })
  }
})

onMounted(async () => {
  await getMsg(limit, _offset)
})

const getMsg = async (limit: number, offset: number) => {
  const res = await getMsgAPI(limit, offset)
  if (offset === 0) msgData.value = res.data
  else {
    msgData.value.more = res.data.more
    msgData.value.newMsgCount = res.data.newMsgCount
    msgData.value.msgs = [...msgData.value.msgs, ...res.data.msgs]
  }
  _offset += 20
  loading.value = false
}

const toDetail = (id: number, name: string) => {
  router.push({ path: 'private_detail', query: { id, name }})
}
</script>

<style lang="scss" scoped>
.msg-private-wrap {
  padding: 40px;
  border-right: 1px solid #ccc;
  .private-header {
    padding-bottom: 6px;
    border-bottom: 2px solid $themeColor;
  }
  .private-content {
    .items {
      display: flex;
      justify-content: space-between;
      max-width: 100%;
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
        flex-shrink: 0;
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
        width: 600px;
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

