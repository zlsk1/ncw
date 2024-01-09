<template>
  <div>
    <HomeBanner />
    <div class="w980 content">
      <div class="left">
        <HomeRecomend />
      </div>
      <div class="right" />
    </div>
  </div>
</template>

<script setup>
import HomeBanner from './components/HomeBanner'
import HomeRecomend from './components/HomeRecomend'
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    flex: 3;
  }
  .right {
    flex: 1;
  }
}
</style>
