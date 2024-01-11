<template>
  <div>
    <HomeBanner />
    <div class="w980 content">
      <div class="left">
        <HomeRecomend />
        <HomeNewAlbum />
        <HomeTop />
      </div>
      <div class="right" />
    </div>
  </div>
</template>

<script setup>
import HomeBanner from './components/HomeBanner'
import HomeRecomend from './components/HomeRecomend'
import HomeNewAlbum from './components/HoneNewAlbum.vue'
import HomeTop from './components/HomeTop.vue'
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    width: 75%;
  }
  .right {
    width: 25%;
  }
}
</style>
