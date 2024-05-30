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
            歌手：<router-link v-for="(item, index) in data?.songs?.ar" :key="index" :to="`/artist/${item.id}`">
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
              <i class="icon-play" />
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
            <i class="icon-comment">({{ totalComment }})</i>
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
    <Comment @getTotal="totalComment = $event" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { judgeJson } from '@/utils/index'
import { ArrowDown } from '@element-plus/icons-vue'
import { usePlayStore } from '@/stores/play'
import { getLyric, getSongDetail } from '@/apis/song'
import Comment from '@/components/Comment'

const route = useRoute()

const playStore = usePlayStore()

const textarea = ref(null)
const lrcContent = ref(null)
const data = ref(null)
const totalComment = ref(0)
const maxHeight = '304px'

onMounted(() => {
  getData(route.params.id)
})

onBeforeRouteUpdate((to, from) => {
  if (to) getData(to.params.id)
})

const getData = id => {
  const p = Promise.all([
    getSongDetail(id),
    getLyric(id)
  ])
  p.then(res => {
    data.value = { songs: res[0].data.songs[0], lrc: res[1].data.lrc }
  })
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
            left: 69px;
            top: 69px;
            width: 130px;
            height: 130px;
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
  }
</style>
