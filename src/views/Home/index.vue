<template>
  <div>
    <HomeBanner />
    <div class="w980 content">
      <div class="left">
        <HomeRecomend />
        <HomeNewAlbum />
        <HomeTop />
      </div>
      <div class="right">
        <HomeSide />
      </div>
    </div>
    <PlayBar :song-info="songInfo" />
  </div>
</template>

<script setup>
import HomeBanner from './components/HomeBanner'
import HomeRecomend from './components/HomeRecomend'
import HomeNewAlbum from './components/HoneNewAlbum.vue'
import HomeTop from './components/HomeTop.vue'
import HomeSide from './components/HomeSide.vue'
import PlayBar from '@/components/PlayBar/index'

const songInfo = {
  url: 'http://m7.music.126.net/20240112221349/e5b158ef92ba53e29337eb860010fa39/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
  br: 8000,
  name: '病变',
  singer: 'Cubi/Fi9江澈'
}
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
