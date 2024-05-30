<template>
  <div class="detail-wrap">
    <div class="header fl-sb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="/msg/private">
          私信
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.query.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-link>清除对话</el-link>
    </div>
    <el-scrollbar
      ref="scrollbar"
      height="500px"
      always
      noresize
      @scroll="scroll"
    >
      <div class="msg-history">
        <div class="loading" style="width: 100%; height: 1px" />
        <div v-for="item in historyData?.msgs" :key="item.id" class="msg-items">
          <p class="time">
            {{ formatMsgTime(item.time) }}
          </p>
          <div v-if="item.fromUser?.userId === userId" class="my">
            <template v-if="JSON.parse(item.msg).type === 6">
              <p class="bg">
                {{ JSON.parse(item.msg).msg }}
              </p>
            </template>
            <div>
              <img :src="item.fromUser.avatarUrl + '?param=50y50'" alt="">
            </div>
          </div>
          <div v-else class="fl content">
            <div class="avatar">
              <router-link :to="`/user/home/${item.fromUser.userId}`">
                <img :src="item.fromUser.avatarUrl + '?param=50y50'" alt="">
              </router-link>
            </div>
            <template v-if="!JSON.parse(item.msg).msg && JSON.parse(item.msg).picInfo">
              <div class="msg-bg">
                <el-image
                  :src="JSON.parse(item.msg).picInfo.picUrl + '?param=99y280'"
                  alt=""
                  style="width:99px; height: 280px"
                  :preview-src-list="[JSON.parse(item.msg).picInfo.picUrl]"
                />
              </div>
            </template>
            <template v-else>
              <div :class="item.fromUser?.userId === userId ? 'my-bg' : 'msg-bg'">
                <template v-if="JSON.parse(item.msg).type === 23">
                  <p>{{ JSON.parse(item.msg).msg }}</p>
                  <a class="general" :href="JSON.parse(item.msg).generalMsg?.webUrl">
                    <img :src="JSON.parse(item.msg).generalMsg?.cover + '?param=60y60'" alt="">
                    <!-- <img v-if="JSON.parse(item.msg).type === 12" :src="JSON.parse(item.msg).promotionUrl?.coverUrl + '?param=90y60'" alt=""> -->
                    <div>
                      <div class="fl">
                        <span v-if="JSON.parse(item.msg).generalMsg?.tag" class="tag">{{ JSON.parse(item.msg).generalMsg?.tag }}</span>
                        <span class="ellipsis-2 title">{{ JSON.parse(item.msg).generalMsg?.title }}</span>
                      </div>
                      <p class="ellipsis-2 subTitle">{{ JSON.parse(item.msg).generalMsg?.subTitle }}</p>
                    </div>
                  </a>
                </template>
                <template v-else-if="JSON.parse(item.msg).type === 12">
                  <span v-if="JSON.parse(item.msg).type === 12 && JSON.parse(item.msg).promotionUrl?.text">{{ JSON.parse(item.msg).promotionUrl?.text }}</span>
                  <p>{{ JSON.parse(item.msg).msg }}</p>
                  <a class="general" :href="JSON.parse(item.msg).promotionUrl?.url">
                    <img :src="JSON.parse(item.msg).promotionUrl?.coverUrl + '?param=90y60'" alt="">
                    <p style="margin-top: 20px">{{ JSON.parse(item.msg).promotionUrl?.title }}</p>
                  </a>
                </template>
                <template v-else-if="JSON.parse(item.msg).type === 5">
                  <span>{{ JSON.parse(item.msg).title }}</span>
                  <p>{{ JSON.parse(item.msg).msg }}</p>
                  <a class="general" :href="JSON.parse(item.msg).promotionUrl?.url">
                    <img :src="JSON.parse(item.msg).program?.coverUrl + '?param=90y60'" alt="">
                    <div>
                      <p class="ellipsis-2 subTitle" style="margin-bottom: 10px">{{ JSON.parse(item.msg).program?.name }}</p>
                      <div class="fl">
                        <span v-if="JSON.parse(item.msg).program?.radio.name" class="tag">{{ JSON.parse(item.msg).program?.radio.name }}</span>
                        <span class="ellipsis-2 title">{{ JSON.parse(item.msg).program?.radio.category }}</span>
                      </div>
                    </div>
                  </a>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="bottom">
      <el-input
        v-model="textValue"
        type="textarea"
        show-word-limit
        maxlength="200"
        class="textarea"
      />
      <div class="fl-sb">
        <Emj @choose="chooseEmj">
          <div class="emj">
            <i class="icon-emj" />
          </div>
        </Emj>
        <el-button @click="sendText">
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMsgContentAPI, sendTextAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import Emj from '@/components/Emj'
import { formatMsgTime } from '@/utils/time'

const route = useRoute()

const historyData = ref(null)
const scrollbar = ref(null)
const textValue = ref('')

const userId = JSON.parse(localStorage.getItem('userInfo'))?.profile.userId
let _scrollHeight = 0
let _before = ''

onMounted(async () => {
  await getMsgContent(route.query.id, 10, _before)
  scrollbar.value.setScrollTop(10000)
})

const getMsgContent = async (uid, limit, before) => {
  const loadingInstance = ElLoading.service({
    target: '.loading',
    text: '加载中'
  })
  const res = await getMsgContentAPI({ uid, limit, before })
  if (!before) {
    historyData.value = res.data
    historyData.value.msgs = historyData.value.msgs.reverse()
  } else {
    historyData.value.msgs = [...res.data.msgs.reverse(), ...historyData.value.msgs]
    historyData.value.more = res.data.more
  }
  _before = historyData.value.msgs[0].time
  loadingInstance.close()
  // console.log(JSON.parse(historyData.value.msgs[5].msg))
}

const chooseEmj = e => {
  textValue.value += `[${e}]`
}

const scroll = async ({ scrollTop }) => {
  if (scrollTop === 0 && historyData.value.more) {
    // 记录获取新数据前的高度
    _scrollHeight = document.querySelector('.msg-history').clientHeight
    await getMsgContent(route.query.id, 10, _before)
    scrollbar.value.setScrollTop(document.querySelector('.msg-history').clientHeight - _scrollHeight)
  }
}

const sendText = async () => {
  await sendTextAPI({ user_ids: route.query.id, msg: textValue.value })
  getMsgContent(route.query.id, 10)
}
</script>

<style lang="scss" scoped>
.detail-wrap {
  padding: 40px 0 40px 30px;
  border-right: 1px solid #ccc;
  .header {
    margin-right: 40px;
    padding-bottom: 10px;
    border-bottom: 2px solid $themeColor;
    :deep(.el-link) {
      font-size: 12px;
    }
  }
  .msg-history {
    margin-right: 40px;
    padding-top: 20px;
    .msg-items {
      margin-bottom: 50px;
      .time {
        margin-bottom: 30px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .my {
        display: flex;
        justify-content: end;
        font-size: 12px;
        .bg {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 520px;
          margin-right: 20px;
          padding: 15px;
          word-break: break-all;
          color: #fff;
          background-color: #79ace5;
          border-radius: 10px;
          &::after {
            content: '';
            position: absolute;
            top: 25px - 5px;
            right: -3px;
            width: 10px;
            height: 10px;
            border-left: 1px solid #79ace5;
            border-top: 1px solid #79ace5;
            background-color: #79ace5;
            border-radius: 2px;
            transform: rotate(45deg);
            z-index: -1;
          }
        }
      }
      .content {
        max-width: 520px;
        .avatar {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .msg-bg {
          position: relative;
          padding: 20px;
          background-color: #f4f4f4;
          border-radius: 10px;
          &::after {
            content: '';
            position: absolute;
            top: 15%;
            left: -3px;
            width: 10px;
            height: 10px;
            border-left: 1px solid #f4f4f4;
            border-top: 1px solid #f4f4f4;
            background-color: #f4f4f4;
            border-radius: 2px;
            transform: rotate(45deg);
            z-index: -1;
          }
          .general {
            display: flex;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            img {
              width: 60px;
              height: 60px;
              margin-right: 10px;
            }
            .title {
              line-height: 20px;
            }
            .tag {
              display: block;
              margin-right: 4px;
              margin-bottom: 8px;
              padding: 0 5px;
              font-size: 12px;
              color: $themeColor;
              border: 1px solid $themeColor;
            }
            .subTitle {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .bottom {
    padding-right: 40px;
    padding-top: 20px;
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
    .textarea {
      margin-bottom: 10px;
    }
  }
}
</style>
