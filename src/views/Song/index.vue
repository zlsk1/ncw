<template>
  <div class="song-wrap w980 fl">
    <main class="main">
      <SongMain :data="data" @changePage="changePage" />
    </main>
    <aside class="aside">
      <SongAside :similar-songs="data?.similarSongs" />
    </aside>
    <PlayBar />
  </div>
</template>

<script setup>
import SongMain from './components/SongMain'
import SongAside from './components/SongAside'
import PlayBar from '@/components/PlayBar'
import { getLyric, getSongUrl, getSongDetail, getSongSimilar } from '@/apis/song'
import { getSongComment } from '@/apis/comment'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()

const data = ref(null)

const getData = id => {
  const p = Promise.all([
    getLyric(route.params.id),
    getSongDetail(route.params.id),
    getSongSimilar(route.params.id),
    getSongComment({ id: route.params.id })
  ])
  p.then(res => {
    data.value = { lrc: res[0].data.lrc, songs: res[1].data.songs[0], similarSongs: res[2].data.songs, songComment: res[3].data }
  })
}

const getComment = async (id, offset) => {
  const res = await getSongComment({ id, offset })
  data.value.songComment = res.data
}

const changePage = offset => {
  offset = offset === 20 ? '' : offset
  getComment(route.params.id, offset)
}

onMounted(() => { getData() })
</script>

<style lang="scss" scoped>
  .song-wrap {
    .main {
      flex: 2.4;
      padding: 30px;
      border: 1px solid #d3d3d3;
    }
    .aside {
      flex: 1;
    }
  }
</style>
