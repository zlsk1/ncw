<template>
  <div class="comment-wrap">
    <div class="header">
      <h3>评论</h3>
      <span class="f12">共{{ commentObj?.total }}条评论</span>
    </div>
    <div class="content">
      <div class="my-comment fl">
        <img
          v-if="hasProfile()"
          v-lazy="userStore?.avator + '?param=50y50'"
          alt=""
          class="comment-avatar"
        >
        <img
          v-else
          v-lazy="'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50'"
          alt=""
          class="comment-avatar"
        >
        <div class="input">
          <textarea
            ref="textarea"
            v-model="comment"
            maxlength="140"
            placeholder="评论"
            @input="input"
            @focus="showLogin"
          ></textarea>
          <div class="utils fl-sb">
            <div class="fl">
              <Emj @choose="onChoose($event, 0)">
                <div class="emj">
                  <i class="icon-emj"></i>
                </div>
              </Emj>
              <i
                ref="addAiteRef"
                class="icon-aite"
                @click="addAite(0)"
              ></i>
              <el-popover
                :virtual-ref="addAiteRef"
                trigger="click"
                virtual-triggering
              >
                空格后加上用户名
              </el-popover>
            </div>
            <div class="f12 fl-sb">
              <span class="txtlength">{{ comment.trim().length }}/140</span>
              <i class="icon-comment" @click="handleComment">评论</i>
            </div>
          </div>
        </div>
      </div>
      <div class="others-comment">
        <div v-if="offset <= limit && !isPlaylistUrl" class="others-comment-header">
          精彩评论
        </div>
        <ul class="hot-comment-content">
          <li
            v-for="(item, i) in commentObj?.hotComments"
            :key="item.commentId"
            class="fl hot-comment-items f12"
          >
            <router-link :to="`/user/home/${item.user.userId}`">
              <img
                v-lazy="item.user.avatarUrl + '?param=50y50'"
                alt=""
                class="avatar"
              >
            </router-link>
            <div class="content">
              <router-link :to="`/user/home/${item.user.userId}`" class="name">
                {{ item.user.nickname }}
              </router-link>
              <img
                v-if="item.user.vipRights && item.user.vipRights.associator"
                v-lazy="`${item.user.vipRights.associator.iconUrl}?param=50y50`"
                class="vip"
                alt=""
              >：
              <span
                v-for="(content, indexC) in item.content.split('\n')"
                :key="indexC"
                class="words"
              >
                {{ content }}<br>
              </span>
              <div class="bottom fl-sb">
                <div class="comment-time">
                  {{ formatTimeStamp(Number(item.time)) }}
                </div>
                <div class="fl">
                  <span>
                    <i :class="item.liked ? 'icon-liked' :'icon-like'" @click="like(item.commentId, item.liked, i)"></i>
                    <span class="like-count">({{ item.likedCount }})</span>
                  </span>
                  <span class="reply" @click="openReply(i, item.user.nickname)">回复</span>
                </div>
              </div>
              <div v-if="DOMIndex === i" class="reply-textarea">
                <textarea ref="replyTextarea" v-model="reply"></textarea>
                <div class="utils fl-sb">
                  <div class="fl">
                    <Emj @choose="onChoose($event, 1)">
                      <div class="emj">
                        <i class="icon-emj"></i>
                      </div>
                    </Emj>
                    <el-popover trigger="click">
                      空格后加上用户名
                      <template #reference>
                        <i class="icon-aite" @click="addAite(1)"></i>
                      </template>
                    </el-popover>
                  </div>
                  <div class="f12 fl-sb">
                    <span class="txtlength">{{ reply.trim().length }}/140</span>
                    <i class="icon-comment" @click="handleReply(item.user.nickname)">回复</i>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="offset <= limit" class="others-comment-header">
          最新评论({{ commentObj?.total }})
        </div>
        <ul class="hot-comment-content">
          <li
            v-for="(item, i) in commentObj?.comments"
            :key="item.commentId"
            class="fl hot-comment-items f12"
          >
            <template v-if="!item.parentCommentId"></template>
            <router-link :to="`/user/home/${item.user.userId}`">
              <img
                v-lazy="item.user.avatarUrl + '?param=50y50'"
                alt=""
                class="avatar"
              >
            </router-link>
            <div class="content">
              <router-link :to="`/user/home/${item.user.userId}`" class="name">
                {{ item.user.nickname }}
              </router-link>
              <img
                v-if="item.user.vipRights && item.user.vipRights.associator"
                v-lazy="item.user.vipRights.associator?.iconUrl + '?param=50y50'"
                class="vip"
                alt=""
              >：
              <span
                v-for="(content, indexC) in item.content.split('\n')"
                :key="indexC"
                class="words"
              >
                {{ content }}<br>
              </span>
              <template v-if="item.beReplied.length > 0">
                <div class="beReplied">
                  <span class="name">{{ item.beReplied[0].user.nickname }}</span>：
                  <span>{{ item.beReplied[0].content }}</span>
                </div>
              </template>
              <div class="bottom fl-sb">
                <div class="comment-time">
                  {{ isBeforeYesterday(item.time) ? item.timeStr : formatTimeStamp(item.time) }}
                </div>
                <div class="fl">
                  <span v-if="item.user.userId === myId" @click="delComment">删除</span>
                  <span>
                    <i class="icon-like"></i>
                    <span v-if="item.likedCount > 0" class="like-count">({{ item.likedCount }})</span>
                    <span v-else class="like-count-zero"></span>
                  </span>
                  <span class="reply" @click="openReply(Number(!isPlaylistUrl ? offset <= limit ? i + commentObj?.hotComments.length : i : i) , item.user.nickname)">回复</span>
                </div>
              </div>
              <div v-if="!isPlaylistUrl ? offset <= limit ? DOMIndex === i + 15 : DOMIndex === i : DOMIndex === i" class="reply-textarea">
                <textarea ref="replyTextarea" v-model="reply"></textarea>
                <div class="utils fl-sb">
                  <div class="fl">
                    <Emj @choose="onChoose($event, 1)">
                      <div class="emj">
                        <i class="icon-emj"></i>
                      </div>
                    </Emj>
                    <el-popover trigger="click">
                      空格后加上用户名
                      <template #reference>
                        <i class="icon-aite" @click="addAite(1)"></i>
                      </template>
                    </el-popover>
                  </div>
                  <div class="f12 fl-sb">
                    <span class="txtlength">{{ reply.trim().length }}/140</span>
                    <i class="icon-comment" @click="handleReply(item.user.nickname)">回复</i>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          small
          background
          :page-size="20"
          :page-count="currentPage"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          @change="changePage"
        ></el-pagination>
      </div>
    </div>
    <Login :is-show="isShow" @close="e => isShow = e"></Login>
  </div>
</template>

<script lang="ts" setup>
import { formatTimeStamp, isBeforeYesterday } from '@/utils/time'
import { hasProfile } from '@/utils/index'
import { useThrottleFn } from '@vueuse/core'
import { nextTick, onMounted, ref, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  likeComment,
  sendCommentAPI,
  delCommentAPI,
  getSongComment,
  getCommentPlaylistAPI,
  getCommentAlbumAPI
} from '@/apis/comment'
import { useUserStore } from '@/stores/user'
import { useTopStore } from '@/stores/top'
import Login from '@/views/Login/index.vue'
import Emj from '@/components/Emj/index.vue'
import type { pagingDataType, songCommentType } from '@/types'

const emit = defineEmits(['getTotal'])

const userStore = useUserStore()
const topStore = useTopStore()

const route = useRoute()

const myId = JSON.parse(localStorage.getItem('userInfo') as string)?.profile.userId

const addAiteRef = ref<HTMLElement>()
const replyTextarea = ref<HTMLTextAreaElement>()
const comment = ref('')
const reply = ref('')
const DOMIndex = ref<number | string>('')
const offset = ref(0)
const commentObj = ref<songCommentType>()
const isShow = ref(false)

const currentId = computed(() => {
  return Number(route.params?.id ? route.params?.id : topStore.firstId)
})

const isPlaylistUrl = computed(() => {
  return route.path.includes('/toplist') || route.path.includes('/playlist')
})

const limit = computed(() => {
  return isPlaylistUrl.value ? 30 : 20
})

const currentPage = computed(() => {
  return Math.ceil((commentObj.value as songCommentType)?.total / limit.value)
})

onMounted(() => {
  getComment({ id: currentId.value, offset: offset.value, limit: limit.value })
})

onBeforeRouteUpdate((to) => {
  if (to) getComment({ id: currentId.value, offset: offset.value, limit: limit.value })
})

const getComment = async(obj: pagingDataType) => {
  const { id, offset, limit } = obj
  if (isPlaylistUrl.value) {
    const res = await getCommentPlaylistAPI({ id, offset, limit })
    commentObj.value = res.data
  }
  else if (route.path.includes('/song')) {
    const res = await getSongComment({ id, offset, limit })
    commentObj.value = res.data
    emit('getTotal', commentObj.value?.total)
  }
  else if (route.path.includes('/album')) {
    const res = await getCommentAlbumAPI({ id, offset, limit })
    commentObj.value = res.data
  }
}

const _input = () => {}

const input = useThrottleFn(_input, 30)

const onChoose = (e: Event, type: number) => {
  type === 0 ? comment.value += `[${e}]` : reply.value += `[${e}]`
}

const handleComment = async() => {
  if (comment.value.trim().length === 0) {
    ElMessage({
      message: '输入点内容再提交吧',
      type: 'error',
      offset: window.innerHeight / 2,
      duration: 2000
    })
  }
  else {
    const res = await sendCommentAPI({ t: 1, type: 0, id: route.params.id as string, content: comment.value })
    console.log(res)
  }
}

const addAite = (type :number) => {
  if (type === 0) comment.value += '@'
  else if (type === 1) reply.value += '@'
}

const openReply = (i: number, nickname: string) => {
  if (!hasProfile()) {
    isShow.value = !isShow.value
    return
  }
  if (i === DOMIndex.value) DOMIndex.value = ''
  else {
    DOMIndex.value = i
    nextTick(() => {
      replyTextarea.value?.focus()
    })
  }
  reply.value = `${nickname}:`
}

const handleReply = (nickname: string) => {
  if (reply.value === `${nickname}:`) {
    ElMessage({
      message: '输入点内容再提交吧',
      type: 'error',
      offset: window.innerHeight / 2,
      duration: 2000
    })
  }
}

const like = async(cid: number, liked: boolean, index: number) => {
  const res = await likeComment({ id: route.params.id as string, cid, t: liked ? 0 : 1 })
  if (res.status === 200) {
    const currentComment = (commentObj.value as songCommentType).hotComments[index]

    currentComment.liked = !liked
    !liked
      ? currentComment.likedCount += 1
      : currentComment.likedCount -= 1
  }
}

const changePage = (currPage: number) => {
  DOMIndex.value = ''
  offset.value = currPage * limit.value
  offset.value = offset.value === limit.value ? 0 : offset.value // 获取第一页的数据时要包括精彩评论
  getComment({ id: currentId.value, offset: offset.value, limit: limit.value })
}

const delComment = async() => {
  ElMessageBox.confirm('确定删除你的评论', { type: 'warning' })
    .then(async() => {
      const res = await delCommentAPI({ t: 0, type: 0, id: route.params.id as string })
      if (res.status === 200) ElMessage.success('删除成功！')
    })
}

const showLogin = () => {
  if (!hasProfile()) isShow.value = !isShow.value
}
</script>

<style lang="scss" scoped>
.comment-wrap {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 6px 0;
    border-bottom: 2px solid #c20c0c;
    h3 {
      margin-right: 20px;
      font-weight: normal;
      font-size: 20px;
    }
    span {
      color: #666;
    }
  }
  .content {
    .my-comment {
      margin-bottom: 10px;
      .comment-avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .input {
        position: relative;
        width: 100%;
        textarea {
          width: 100%;
          height: 60px;
          padding: 6px;
          color: #333;
          border: 1px solid #cdcdcd;
          border-radius: 2px;
          outline: none;
          resize: none;
        }
        &::after {
          content: '';
          position: absolute;
          top: 16px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-top: 1px solid #cdcdcd;
          border-right: 1px solid #cdcdcd;
          background-color: #fff;
          transform: rotate(-135deg);
          z-index: 10;
        }
      }
    }
    .others-comment {
      .others-comment-header {
        padding: 6px 0;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #ccc;
      }
      .hot-comment-content {
        margin-bottom: 20px;
        .hot-comment-items {
          padding: 10px 0;
          line-height: 20px;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: none;
          }
          a {
            font-size: 12px;
          }
          .avatar {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          .content {
            display: inline-block;
            width: 100%;
            .name {
              display: inline-block;
              margin-right: 6px;
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
            .vip {
              display: inline-block;
              width: 36px;
              height: 12px;
              margin: -4px 4px 0 0;
            }
            .words {
              color: #333;
            }
            .beReplied {
              position: relative;
              margin-top: 10px;
              padding: 10px 20px;
              background-color: #f4f4f4;
              border: 1px solid #dedede;
              &::after {
                content: '';
                position: absolute;
                top: -4px;
                left: 20px;
                width: 4px;
                height: 4px;
                border-left: 1px solid #dedede;
                border-top: 1px solid #dedede;
                background-color: #fff;
                transform: rotate(45deg);
                z-index: 10;
              }
              .name {
                cursor: pointer;
              }
            }
            .bottom {
              margin-top: 15px;
              .comment-time {
                color: #999;
              }
              .icon-like {
                display: inline-block;
                width: 15px;
                height: 14px;
                margin-top: -4px;
                background: url('@/assets/icons/icon2.png') -150px -20px no-repeat;
                cursor: pointer;
                vertical-align: middle;
              }
              .icon-liked {
                display: inline-block;
                width: 15px;
                height: 14px;
                margin-top: -4px;
                background: url('@/assets/icons/icon2.png') -170px 0 no-repeat;
                cursor: pointer;
                vertical-align: middle;
              }
              .like-count {
                padding: 0 10px;
              }
              .like-count-zero {
                padding-left: 10px;
              }
              .reply {
                position: relative;
                padding-left: 10px;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
                &::after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: calc(50% - 6px);
                  width: 1px;
                  height: 12px;
                  background: #cfdbed;
                }
              }
            }
            .reply-textarea {
              position: relative;
              margin-top: 10px;
              padding: 15px 20px 30px 20px;
              background: #f8f8f8;
              border: 1px solid #d9d9d9;
              bottom: 2px;
              &::after {
                content: '';
                position: absolute;
                right: 10px;
                top: -5px;
                width: 8px;
                height: 8px;
                background-color: #fff;
                border-left: 1px solid #cdcdcd;
                border-top: 1px solid #cdcdcd;
                transform: rotate(45deg);
              }
              textarea {
                width: 100%;
                height: 32px;
                padding: 6px;
                color: #333;
                border: 1px solid #cdcdcd;
                resize: none;
                outline: none;
              }
            }
          }
        }
      }
    }
  }
}
.utils {
  margin-top: 6px;
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
  .icon-aite {
    display: block;
    width: 18px;
    height: 18px;
    background: url('@/assets/icons/icon.png') -60px -490px no-repeat;
    cursor: pointer;
  }
  .txtlength {
    margin-right: 10px;
    color: #aaa;
  }
  .icon-comment {
    display: block;
    width: 46px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    background: url('@/assets/icons/button.png') -84px -64px no-repeat;
    cursor: pointer;
    &:hover {
      background-position: -84px -94px;
    }
  }
}
</style>
