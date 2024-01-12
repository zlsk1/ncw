<template>
  <div>
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
    <audio autoplay controls src="http://m802.music.126.net/20240112235745/1a1808b290d9cd8767dcc061869b6985/jd-musicrep-ts/e2d2/1811/0f1f/8765d3e5cff473bda7574994c263fbf2.mp3" />
  </div>
</template>

<script setup>
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
</script>
