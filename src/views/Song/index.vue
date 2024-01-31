<template>
  <div class="song-wrap w980 fl">
    <main class="main">
      <SongMain />
    </main>
    <aside class="aside">
      <SongAside />
    </aside>
  </div>
</template>

<script setup>
import SongMain from './components/SongMain'
import SongAside from './components/SongAside'
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
