<template>
  <div>
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
    <LayoutPlayBar />
  </div>
</template>

<script setup>
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
import LayoutPlayBar from './components/LayoutPlayBar'
</script>
