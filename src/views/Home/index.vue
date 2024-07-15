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
  </div>
</template>

<script lang="ts" setup>
import HomeBanner from './components/HomeBanner.vue'
import HomeRecomend from './components/HomeRecomend.vue'
import HomeNewAlbum from './components/HomeNewAlbum.vue'
import HomeTop from './components/HomeTop.vue'
import HomeSide from './components/HomeSide.vue'
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
