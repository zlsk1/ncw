<template>
  <div class="newAlbum-wrap">
    <ul ref="content" class="fl newAlbum-content">
      <li
        v-for="(item, index) in albumList"
        :key="index"
        class="newAlbum-items"
      >
        <ul class="fl-sb">
          <li v-for="item1 in item" :key="item1.id">
            <img :src="item1.picUrl" alt="" class="album-img">
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
import { ref, onMounted, watch } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const albumList = ref([])
const per = 5
const content = ref(null)
const items = ref(0)
const i = ref(0)

const getNewAlbumList = async () => {
  const res = await getNewAlbum()
  const length = res.data.albums.slice(0, 10).length / per
  for (let i = 0; i < length; i++) {
    albumList.value.push(res.data.albums.slice((per * i), per * (i + 1)))
  }
}
const goto = () => {
  content.value.style.transition = 'all .6s'
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

watch(content, val => {
  setTimeout(() => {
    items.value = val.children.length
    const first = val.children[0].cloneNode(true)
    content.value.append(first)
  }, 100)
}
)
onMounted(() => {
  getNewAlbumList()
})
</script>

<style lang="scss" scoped>
$img_width:100px;
$img_height:100px;
$pad:30px;
  .newAlbum-wrap {
    position: relative;
    overflow: hidden;
    .newAlbum-content {
      background-color: #f5f5f5;
      border: 1px solid #fff;
      .newAlbum-items {
        flex-shrink: 0;
        width: 100%;
        padding: $pad;
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
      top: ($img_height + $pad + 10.5px) / 2;
      left: 5px;
      cursor: pointer;
    }
    .next {
      position: absolute;
      top: ($img_height + $pad + 10.5px) / 2;
      right: 5px;
      cursor: pointer;
    }
  }
</style>
