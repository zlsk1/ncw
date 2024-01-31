<template>
  <div class="songMain-wrap">
    <div class="songPlay-wrap fl">
      <div class="left">
        <div class="img-wrap">
          <i class="icon-img" />
          <img :src="`${data?.songs?.al.picUrl}?param=130y130`" alt="">
        </div>
      </div>
      <div class="right">
        <div class="header fl">
          <i class="icon-singleSong" />
          <div>
            <div class="fl">
              <h2>{{ data?.songs?.al.name }}</h2>
              <i class="icon-mv" />
            </div>
          <!-- <span>{{ desc }}</span> -->
          </div>
        </div>
        <div class="info f12">
          <div class="singer">
            歌手：<router-link v-for="(item, index) in data?.songs?.ar" :key="index" to="/">
              {{ index !== data?.songs.ar.length - 1 ? `${item.name}/` : item.name }}
            </router-link>
          </div>
          <div class="singer">
            所属专辑：<router-link to="/">
              {{ data?.songs.al.name }}
            </router-link>
          </div>
        </div>
        <ul class="btns fl f12">
          <li class="play fl">
            <i @click="play({id:data?.songs.id, picUrl: data?.songs?.al.picUrl, name: data?.songs?.al.name, singer: data?.songs?.ar.map(v=>{return v.name}).join('/') })">
              <em class="icon-play" />
              播放
            </i>
            <i class="icon-add" title="添加到播放列表" @click="play({id:data?.songs.id, picUrl: data?.songs?.al.picUrl, name: data?.songs?.al.name, singer: data?.songs?.ar.map(v=>{return v.name}).join('/') }, 1)" />
          </li>
          <li class="like">
            <i class="icon-like">收藏</i>
          </li>
          <li class="share">
            <i class="icon-share">分享</i>
          </li>
          <li class="download">
            <i class="icon-download">下载</i>
          </li>
          <li class="comment" @click="goComment">
            <i class="icon-comment">({{ data?.songComment.total }})</i>
          </li>
        </ul>
        <div class="lrc-wrap">
          <div ref="lrcContent" class="lrc-content">
            <p v-for="(item, index) in data?.lrc.lyric.split('\n')" :key="index" class="f12 per-line">
              {{ judgeJson(item)
                ? JSON.parse(item).c.length === 1
                  ? JSON.parse(item).c[0].tx
                  : `${JSON.parse(item).c[0].tx}${JSON.parse(item).c[1].tx}`
                : item.split(']')[1] }}
            </p>
          </div>
          <span v-if="data?.lrc.lyric.split('\n').length > 20" class="expand f12" @click="expandLrc"><span>展开</span><ArrowDown style="width: 1em;height: 1em" /></span>
        </div>
      </div>
    </div>
    <div class="comment-wrap">
      <div class="header">
        <h3>评论</h3>
        <span class="f12">共{{ data?.songComment.total }}条评论</span>
      </div>

      <div class="content">
        <div class="my-comment fl">
          <img v-lazy="avator + '?param=50y50'" alt="">
          <div class="input">
            <textarea
              ref="textarea"
              v-model="comment"
              maxlength="140"
              placeholder="评论"
              @input="input"
            />
            <div class="utils fl-sb">
              <div class="fl">
                <Emj @choose="onChoose($event, 0)">
                  <div class="emj">
                    <i class="icon-emj" />
                  </div>
                </Emj>
                <i ref="addAiteRef" class="icon-aite" @click="addAite(0)" />
                <el-popover :virtual-ref="addAiteRef" trigger="click" virtual-triggering>
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
          <div v-if="offset <= 20" class="others-comment-header">
            精彩评论
          </div>
          <ul class="hot-comment-content">
            <li
              v-for="(item, i) in data?.songComment?.hotComments"
              :key="item.commentId"
              class="fl hot-comment-items f12"
            >
              <router-link to="/">
                <img v-lazy="item.user.avatarUrl + '?param=50y50'" alt="" class="avatar">
              </router-link>
              <div class="content">
                <router-link to="/" class="name">
                  {{ item.user.nickname }}
                </router-link>
                <img
                  v-if="item.user.vipRights && item.user.vipRights.associator"
                  v-lazy="`${item.user.vipRights.associator.iconUrl}?param=50y50`"
                  class="vip"
                  alt=""
                >：
                <span v-for="(content, indexC) in item.content.split('\n')" :key="indexC" class="words">
                  {{ content }}<br>
                </span>
                <div class="bottom fl-sb">
                  <div class="comment-time">
                    {{ formatTimeStamp(item.time) }}
                  </div>
                  <div class="fl">
                    <span>
                      <i :class="item.liked ? 'icon-liked' :'icon-like'" @click="like(item.commentId, item.liked, i)" />
                      <span class="like-count">({{ item.likedCount }})</span>
                    </span>
                    <span class="reply" @click="openReply(i, item.user.nickname)">回复</span>
                  </div>
                </div>
                <div v-if="DOMIndex === i" class="reply-textarea">
                  <textarea ref="replyTextarea" v-model="reply" />
                  <div class="utils fl-sb">
                    <div class="fl">
                      <Emj @choose="onChoose($event, 1)">
                        <div class="emj">
                          <i class="icon-emj" />
                        </div>
                      </Emj>
                      <el-popover trigger="click">
                        空格后加上用户名
                        <template #reference>
                          <i class="icon-aite" @click="addAite(1)" />
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
          <div v-if="offset <= 20" class="others-comment-header">
            最新评论({{ data?.songComment?.total }})
          </div>
          <ul class="hot-comment-content">
            <li
              v-for="(item, i) in data?.songComment?.comments"
              :key="item.commentId"
              class="fl hot-comment-items f12"
            >
              <template v-if="!item.parentCommentId" />
              <router-link to="/">
                <img v-lazy="item.user.avatarUrl + '?param=50y50'" alt="" class="avatar">
              </router-link>
              <div class="content">
                <router-link to="/" class="name">
                  {{ item.user.nickname }}
                </router-link>
                <img
                  v-if="item.user.vipRights && item.user.vipRights.associator"
                  v-lazy="item.user.vipRights.associator?.iconUrl + '?param=50y50'"
                  class="vip"
                  alt=""
                >：
                <span v-for="(content, indexC) in item.content.split('\n')" :key="indexC" class="words">
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
                    <span v-if="item.user.userId === myId">删除</span>
                    <span>
                      <i class="icon-like" />
                      <span v-if="item.likedCount > 0" class="like-count">({{ item.likedCount }})</span>
                      <span v-else class="like-count-zero" />
                    </span>
                    <span class="reply" @click="openReply(i = offset <= 20 ? i + data.songComment.hotComments.length : i, item.user.nickname)">回复</span>
                  </div>
                </div>
                <div v-if="DOMIndex === i + 15 " class="reply-textarea">
                  <textarea ref="replyTextarea" v-model="reply" />
                  <div class="utils fl-sb">
                    <div class="fl">
                      <Emj @choose="onChoose($event, 1)">
                        <div class="emj">
                          <i class="icon-emj" />
                        </div>
                      </Emj>
                      <el-popover trigger="click">
                        空格后加上用户名
                        <template #reference>
                          <i class="icon-aite" @click="addAite(1)" />
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
            :total="data?.songComment?.total"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            class="paginationn"
            @change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onUnmounted, ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { judgeJson, debounce } from '@/utils/index'
import { formatTimeStamp, isBeforeYesterday } from '@/utils/time'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { usePlayStore } from '@/stores/play'
import { storeToRefs } from 'pinia'
import { getLyric, getSongDetail } from '@/apis/song'
import { getSongComment } from '@/apis/comment'
import { likeComment, sendCommentAPI, delCommentAPI } from '@/apis/comment'
import Emj from '@/components/Emj'

const route = useRoute()

const userStore = useUserStore()
const { avator } = storeToRefs(userStore)
const playStore = usePlayStore()
const myId = JSON.parse(localStorage.getItem('userInfo')).profile.userId

const textarea = ref(null)
const addAiteRef = ref(null)
const replyTextarea = ref(null)
const lrcContent = ref(null)
const comment = ref('')
const offset = ref(0)
const reply = ref('')
const DOMIndex = ref('')
const data = ref(null)
const maxHeight = '304px'

onMounted(() => {
  getData(route.params.id)
})

onUnmounted(() => {
  input = null; onChoose = null; handleComment = null; addAite = null; like = null
})

onBeforeRouteUpdate((to, from) => {
  console.log(to)
  if (to) getData(to.params.id)
})

const getData = id => {
  const p = Promise.all([
    getSongDetail(id),
    getLyric(id),
    getSongComment({ id })
  ])
  p.then(res => {
    data.value = { songs: res[0].data.songs[0], lrc: res[1].data.lrc, songComment: res[2].data }
  })
}

const getComment = async (id, offset) => {
  const res = await getSongComment({ id, offset })
  data.value.songComment = res.data
}

const changePage = async e => {
  offset.value = e * 20
  offset.value = offset.value === 20 ? '' : offset.value // 获取第一页的数据时要包括精彩评论
  await getComment(route.params.id, offset.value)
}

const expandLrc = () => {
  if (lrcContent.value.nextSibling.children[0].textContent === '展开') {
    lrcContent.value.style.maxHeight = '9999px'
    lrcContent.value.nextSibling.children[0].textContent = '收起'
    lrcContent.value.nextSibling.children[1].style.transform = 'rotate(180deg)'
  } else {
    lrcContent.value.style.maxHeight = maxHeight
    lrcContent.value.nextSibling.children[0].textContent = '展开'
    lrcContent.value.nextSibling.children[1].style.transform = 'rotate(0)'
  }
}

const goComment = () => {
  window.scrollTo({ top: document.querySelector('.comment-wrap .header').getBoundingClientRect().top })
  textarea.value.focus()
}

const play = async (o, type) => { playStore.actionAddSong(o, type) }

const _input = e => {
  // console.log(e)
}

let input = debounce(_input, 30)

let onChoose = (e, type) => {
  if (type === 0) comment.value += `[${e}]`
  else if (type === 1) reply.value += `[${e}]`
}

let handleComment = async () => {
  if (comment.value.trim().length === 0) {
    ElMessage({
      message: '输入点内容再提交吧',
      type: 'error',
      offset: window.innerHeight / 2,
      duration: 2000
    })
  } else {
    const res = await sendCommentAPI({ t: 1, type: 0, id: route.params.id, content: comment.value })
    console.log(res)
  }
}

let addAite = (type) => {
  if (type === 0) comment.value += '@'
  else if (type === 1) reply.value += '@'
}

const openReply = (i, nickname) => {
  if (i === DOMIndex.value) DOMIndex.value = ''
  else {
    DOMIndex.value = i
    nextTick(() => {
      replyTextarea.value[0].focus()
    })
  }
  reply.value = `${nickname}:`
}

const handleReply = (nickname) => {
  if (reply.value === `${nickname}:`) {
    ElMessage({
      message: '输入点内容再提交吧',
      type: 'error',
      offset: window.innerHeight / 2,
      duration: 2000
    })
  }
}

let like = async (cid, liked, index) => {
  const res = await likeComment({ id: data.value.songs.id, cid, t: liked ? 0 : 1 })
  if (res.status === 200) {
    data.value.songComment.hotComments[index].liked = !liked
    !liked
      ? data.value.songComment.hotComments[index].likedCount += 1
      : data.value.songComment.hotComments[index].likedCount -= 1
  }
}

</script>

<style lang="scss" scoped>
  .songMain-wrap {
    padding-bottom: 40px;
    .songPlay-wrap {
      padding-bottom: 70px;
      i, em {
        display: block;
      }
      .left {
        margin-right: 30px;
        .img-wrap {
          .icon-img {
            width: 206px;
            height: 205px;
            background: url('@/assets/icons/coverall.png') -140px -580px no-repeat;
          }
          img {
            position: absolute;
            left: 67px;
            top: 68px;
            border-radius: 50%
          }
        }
      }
      .right {
        i, li {
          background: url('@/assets/icons/button2.png') no-repeat;
        }
        li {
          margin-right: 6px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          cursor: pointer;
        }
        .header {
          align-items: center;
          .icon-singleSong {
            width: 54px;
            height: 24px;
            margin-right: 10px;
            background: url('@/assets/icons/icon.png') 0 -463px no-repeat;
          }
          h2 {
            font-size: 24px;
            font-weight: normal;
          }
        }
        .info {
          margin: 10px 0;
          color: #999;
          a {
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
            }
          }
          div:first-child {
            margin-bottom: 10px;
          }
        }
        .btns {
          margin-bottom: 30px;
          color: #333;
          .play {
            text-align: center;
            color: #fff;
            background-position: right -428px;
            i {
              display: flex;
              height: 31px;
              padding: 0 7px 0 8px;
              line-height: 31px;
              background-position: 0 -387px;
            }
            .icon-play {
              width: 20px;
              height: 18px;
              margin: 6px 4px 2px 0;
              background-position: 0 -1622px;
            }
            .icon-add {
              width: 26px;
              height: 31px;
              margin-left: -3px;
              text-align: center;
              background-position: 0 -1588px;
            }
          }
          .like {
            background-position: right -1020px;
            .icon-like {
              min-width: 23px;
              height: 31px;
              line-height: 31px;
              padding-right: 2px;
              padding-left: 28px;
              background-position: 0 -977px;
            }
          }
          .share {
            background-position: right -1106px;
            .icon-share {
              min-width: 23px;
              height: 31px;
              line-height: 31px;
              padding-right: 2px;
              padding-left: 28px;
              background-position: 0 -1225px;
            }
          }
          .download {
            background-position: right -1020px;
            .icon-download {
              min-width: 23px;
              height: 31px;
              line-height: 31px;
              padding-right: 2px;
              padding-left: 28px;
              background-position: 0 -2761px;
            }
          }
          .comment {
            background-position: right -1020px;
            .icon-comment {
              min-width: 23px;
              height: 31px;
              line-height: 31px;
              padding-right: 2px;
              padding-left: 28px;
              background-position: 0 -1465px;
            }
          }
        }
        .lrc-wrap {
          .lrc-content {
            max-height: v-bind(maxHeight);
            overflow: hidden;
            .per-line {
              margin-bottom: 10px;
            }
          }
          .expand {
            cursor: pointer;
            span {
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
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
          img {
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
          .paginationn {
            justify-content: center;
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
