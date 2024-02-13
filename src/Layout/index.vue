<template>
  <div>
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
    <PlayBar />
  </div>
</template>

<script setup>
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
</script>
