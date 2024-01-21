<template>
  <div>
    <HomeBanner />
    <div class="w980 content">
      <div class="left">
        <HomeRecomend />
        <HomeNewAlbum />
        <HomeTop @getsong="songInfo = $event" />
      </div>
      <div class="right">
        <HomeSide />
      </div>
    </div>
    <PlayBar :current-song="songInfo" @changeCurrent="changeCurrent" />
  </div>
</template>

<script setup>
import HomeBanner from './components/HomeBanner'
import HomeRecomend from './components/HomeRecomend'
import HomeNewAlbum from './components/HoneNewAlbum.vue'
import HomeTop from './components/HomeTop.vue'
import HomeSide from './components/HomeSide.vue'
import PlayBar from '@/components/PlayBar/index'
import { ref } from 'vue'

const songInfo = ref(JSON.parse(localStorage.getItem('song_queue')).length > 0
  ? JSON.parse(localStorage.getItem('song_queue'))[JSON.parse(localStorage.getItem('play_setting')).index]
  : {})

const changeCurrent = e => { songInfo.value = e }
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  border: 1px solid #d3d3d3;
  .left {
    width: 75%;
    padding: 20px 20px 30px 20px;
  }
  .right {
    width: 25%;
  }
}
</style>
