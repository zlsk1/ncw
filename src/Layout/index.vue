<template>
  <div>
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
    <Login />
  </div>
</template>

<script setup>
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
import Login from '@/components/Login'
</script>
