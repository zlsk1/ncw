<template>
  <div class="songMain-wrap">
    <div class="songPlay-wrap fl">
      <div class="left">
        <div class="img-wrap">
          <i class="icon-img" />
          <img :src="props.data?.songs?.al.picUrl" alt="">
        </div>
      </div>
      <div class="right">
        <div class="header fl">
          <i class="icon-singleSong" />
          <div>
            <div class="fl">
              <h2>{{ props.data?.songs?.al.name }}</h2>
              <i class="icon-mv" />
            </div>
          <!-- <span>{{ desc }}</span> -->
          </div>
        </div>
        <div class="info f12">
          <div class="singer">
            歌手：<router-link to="/">
              {{ props.data?.songs?.ar.length === 0 ? props.data?.songs.ar[0].name : props.data?.songs.ar.map(v => {return v.name}).join('/') }}
            </router-link>
          </div>
          <div class="singer">
            所属专辑：<router-link to="/">
              {{ props.data?.songs.al.name }}
            </router-link>
          </div>
        </div>
        <ul class="btns fl f12">
          <li class="play fl">
            <i>
              <em class="icon-play" />
              播放
            </i>
            <i class="icon-add" title="添加到播放列表" />
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
            <i class="icon-comment">({{ props.data?.songComment.total }})</i>
          </li>
        </ul>
        <div class="lrc-wrap">
          <div ref="lrcContent" class="lrc-content">
            <p v-for="(item, index) in props.data?.lrc.lyric.split('\n')" :key="index" class="f12 per-line">
              {{ judgeJson(item)
                ? JSON.parse(item).c.length === 1
                  ? JSON.parse(item).c[0].tx
                  : `${JSON.parse(item).c[0].tx}${JSON.parse(item).c[1].tx}`
                : item.split(']')[1] }}
            </p>
          </div>
          <span class="expand f12" @click="expandLrc"><span>展开</span><ArrowDown style="width: 1em;height: 1em" /></span>
        </div>
      </div>
    </div>
    <div class="comment-wrap">
      <div class="header">
        <h3>评论</h3>
        <span class="f12">共{{ props.data?.songComment.total }}条评论</span>
      </div>
      <div class="content">
        <div class="my-comment fl">
          <img :src="avator" alt="">
          <div class="input">
            <textarea
              ref="textarea"
              maxlength="140"
              placeholder="评论"
              @input="input"
            />
            <div class="utils fl-sb">
              <div class="fl">
                <div class="emj">
                  <i class="icon-emj" />
                </div>
                <i class="icon-aite" />
              </div>
              <div class="f12 fl-sb">
                <span class="txtlength">{{ txtLength }}/140</span>
                <i class="icon-comment">评论</i>
              </div>
            </div>
          </div>
        </div>
        <div class="others-comment">
          <div v-if="offset <= 20" class="hot-comment-header">
            精彩评论
          </div>
          <ul class="hot-comment-content">
            <li
              v-for="item in props.data?.songComment?.hotComments"
              :key="item.commentId"
              class="fl hot-comment-items f12"
            >
              <router-link to="/">
                <img :src="item.user.avatarUrl" alt="" class="avatar">
              </router-link>
              <div class="content">
                <router-link to="/" class="name">
                  {{ item.user.nickname }}
                </router-link>
                <img
                  v-if="item.user.vipRights && item.user.vipRights.associator"
                  class="vip"
                  :src="item.user.vipRights.associator.iconUrl"
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
                      <i class="icon-like" />
                      <span class="like-count">({{ item.likedCount }})</span>
                    </span>
                    <span class="reply">回复</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="offset <= 20" class="new-comment-header">
            最新评论({{ props.data?.songComment?.total }})
          </div>
          <ul class="hot-comment-content">
            <li
              v-for="item in props.data?.songComment?.comments"
              :key="item.commentId"
              class="fl hot-comment-items f12"
            >
              <template v-if="!item.parentCommentId" />
              <router-link to="/">
                <img :src="item.user.avatarUrl" alt="" class="avatar">
              </router-link>
              <div class="content">
                <router-link to="/" class="name">
                  {{ item.user.nickname }}
                </router-link>
                <img
                  v-if="item.user.vipRights && item.user.vipRights.associator"
                  class="vip"
                  :src="item.user.vipRights.associator?.iconUrl"
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
                    <span>
                      <i class="icon-like" />
                      <span v-if="item.likedCount > 0" class="like-count">({{ item.likedCount }})</span>
                      <span v-else class="like-count-zero" />
                    </span>
                    <span class="reply">回复</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
            small
            background
            :page-size="20"
            :total="props.data?.songComment?.total"
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
import { ref } from 'vue'
import { judgeJson } from '@/utils/index'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { formatTimeStamp, isBeforeYesterday } from '@/utils/time'

const props = defineProps({
  data: { type: Object, default: () => {} }
})
const emit = defineEmits(['changePage'])

const store = useUserStore()
const { avator } = storeToRefs(store)

const textarea = ref(null)
const txtLength = ref(0)
const offset = ref(0)
const lrcContent = ref('')

const expandLrc = () => {
  if (lrcContent.value.nextSibling.children[0].textContent === '展开') {
    lrcContent.value.style.height = 'auto'
    lrcContent.value.nextSibling.children[0].textContent = '收起'
    lrcContent.value.nextSibling.children[1].style.transform = 'rotate(180deg)'
  } else {
    lrcContent.value.style.height = '310px'
    lrcContent.value.nextSibling.children[0].textContent = '展开'
    lrcContent.value.nextSibling.children[1].style.transform = 'rotate(0)'
  }
}

const changePage = e => {
  offset.value = e * 20
  emit('changePage', offset.value)
}

const goComment = () => {
  window.scrollTo({ top: 680 })
  textarea.value.focus()
}

const input = e => {
  txtLength.value = e.target.value.trim().length
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
          width: 132px;
          height: 132px;
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
            height: 310px;
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
          .utils {
            margin-top: 6px;
            .emj {
              .icon-emj {
                display: block;
                width: 18px;
                height: 18px;
                margin-right: 10px;
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
            }
          }
        }
        .others-comment {
          .hot-comment-header {
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
                  cursor: pointer;
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
              }
            }
          }
          .new-comment-header {
            padding: 6px 0;
            font-size: 12px;
            font-weight: 700;
            border-bottom: 1px solid #ccc;
          }
          .paginationn {
            justify-content: center;
          }
        }
      }
    }
  }
</style>
