<template>
  <div class="btns-wrap">
    <ul class="btns fl f12">
      <li class="play fl">
        <i @click="addPlaylist(id)">
          <i class="icon-play"></i>
          播放
        </i>
        <i
          class="icon-add"
          title="添加到播放列表"
          @click="addPlaylist(id)"
        ></i>
      </li>
      <li class="like">
        <i v-if="!dynamic?.bookedCount" class="icon-like">收藏</i>
        <i v-else class="icon-like">({{ formatPlayCount(dynamic.bookedCount) }})</i>
      </li>
      <li class="share">
        <i v-if="!dynamic?.shareCount" class="icon-share">分享</i>
        <i v-else class="icon-share">({{ dynamic.shareCount }})</i>
      </li>
      <li class="download">
        <i class="icon-download">下载</i>
      </li>
      <li class="comment" @click="goComment">
        <i v-if="!dynamic?.commentCount" class="icon-comment">评论</i>
        <i v-else class="icon-comment">({{ dynamic.commentCount }})</i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { usePlayStore } from '@/stores/play'
import { formatPlayCount } from '@/utils/index'
import { btnsProps } from './index'

const playStore = usePlayStore()

defineProps(btnsProps)

const goComment = () => {
  window.scrollTo({ top: ((document.querySelector('.comment-wrap .header')) as HTMLElement).getBoundingClientRect().top })
}

const addPlaylist = (id: number) => {
  playStore.actionAddSongs(id)
}
</script>

<style lang="scss" scoped>
.btns-wrap {
  .btns {
    color: #333;
    i {
      display: block;
    }
    i, li {
      background: url('@/assets/icons/button2.png') no-repeat;
    }
    li {
      margin-right: 6px;
      padding: 0 5px 0 0;
      white-space: nowrap;
      cursor: pointer;
    }
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
}
</style>
