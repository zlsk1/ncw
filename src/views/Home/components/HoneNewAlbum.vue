<template>
  <div class="newAlbum-wrap">
    <div class="top-header fl-sb">
      <div class="left fl">
        <router-link to="/" class="title">
          新碟上架
        </router-link>
      </div>
      <div class="right">
        <router-link to="/">
          更多
        </router-link>
        <i />
      </div>
    </div>
    <ul ref="content" class="fl newAlbum-content">
      <li
        v-for="(item, index) in albumList"
        :key="index"
        class="newAlbum-items"
      >
        <ul class="fl-sb">
          <li v-for="item1 in item" :key="item1.id">
            <router-link to="/">
              <img
                :src="item1.picUrl"
                alt=""
                class="album-img"
              >
            </router-link>
            <div class="desc">
              <router-link to="/">
                <p class="ellipsis-1">
                  {{ item1.name }}
                </p>
              </router-link>
              <router-link to="/">
                <p class="ellipsis-1">
                  {{ item1.artist.name }}
                </p>
              </router-link>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="prev" @click="prev">
      <ArrowLeft style="width: 1.5em;height: 1.5em" />
    </div>
    <div class="next" @click="next">
      <ArrowRight style="width: 1.5em;height: 1.5em" />
    </div>
  </div>
</template>

<script setup>
import { getNewAlbum } from '@/apis/home'
import { ref, onMounted, watch, onUpdated } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const albumList = ref([])
const per = 5
const content = ref(null)
const items = ref(0)
const i = ref(0)
const isRender = ref(false)

const getNewAlbumList = async () => {
  const res = await getNewAlbum()
  const length = res.data.albums.slice(0, 10).length / per
  for (let i = 0; i < length; i++) {
    albumList.value.push(res.data.albums.slice((per * i), per * (i + 1)))
  }
}
const goto = () => {
  content.value.style.transition = 'all .6s linear'
  content.value.style.transform = `translateX(calc(-100% * ${i.value}))`
}
const next = () => {
  if (i.value === items.value) {
    content.value.style.transition = 'none'
    content.value.style.transform = 'translateX(0)'
    setTimeout(() => { i.value = 1; goto() }, 0)
  } else {
    i.value++
    goto()
  }
}
const prev = () => {
  if (i.value === 0) {
    content.value.style.transition = 'none'
    content.value.style.transform = `translateX(calc(-100% * ${items.value}))`
    setTimeout(() => { i.value = items.value - 1; goto() }, 0)
  } else {
    i.value--
    goto()
  }
}

onMounted(() => {
  getNewAlbumList()
})
onUpdated(() => {
  content.value.children.length ? isRender.value = true : ''
})
watch(isRender, val => {
  if (val) {
    items.value = content.value.children.length
    const first = content.value.children[0].cloneNode(true)
    content.value.append(first)
  }
})
</script>

<style lang="scss" scoped>
  $img_width:100px;
  $img_height:100px;
  $pad:30px;
  $selfHeight: 10.5px;
  $header:108px;
  .newAlbum-wrap {
    position: relative;
    margin: 60px 0 30px 0;
    overflow: hidden;
    .top-header {
      margin-bottom: 20px;
      padding: 0 0 8px 30px;
      font-size: 12px;
      color: #666;
      border-bottom: 2px solid #C10D0C;
      background: url('@/assets/icons/index.png') -225px -158px no-repeat;
      .left {
        .title {
        font-size: 18px;
        color: #333;
        }
        .tab {
          display: flex;
          align-items: center;
          li {
            position: relative;
            padding: 0 15px;
            &::after {
              content: '';
              position: absolute;
              right: 0;
              top: calc(50% - 5px);
              width: 1px;
              height: 10px;
              background-color: #ccc;
            }
            &:last-child::after {
              content: '';
              width: 0;
              height: 0;
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        a {
          margin-right: 6px;
        }
        i {
          display: block;
          width: 12px;
          height: 12px;
          background: url('@/assets/icons/index.png') 0 -240px no-repeat;
        }
      }
    }
    .newAlbum-content {
      .newAlbum-items {
        flex-shrink: 0;
        width: 100%;
        padding: $pad;
        background-color: #f5f5f5;
        border: 1px solid #d3d3d3;
        overflow: hidden;
        .album-img {
          width: $img_width;
          height: $img_height;
        }
        .desc {
          width: 100px;
        }
      }
    }
    .prev {
      position: absolute;
      top: ($img_height + $pad + $selfHeight + $header) / 2;
      left: 5px;
      cursor: pointer;
    }
    .next {
      position: absolute;
      top: ($img_height + $pad + $selfHeight + $header) / 2;
      right: 5px;
      cursor: pointer;
    }
  }
</style>
