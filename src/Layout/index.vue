<template>
  <div class="layout-wrap">
    <LayoutHeader></LayoutHeader>
    <router-view></router-view>
    <LayoutFooter></LayoutFooter>
    <div
      v-if="isShowTop"
      class="backtoTop"
      @click="backtoTop"
    >
      <i class="icon-backtoTop"></i>
    </div>
    <PlayBar></PlayBar>
  </div>
</template>

<script lang="ts" setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { ref } from 'vue'
import { debounce } from '@/utils'

const isShowTop = ref(false)

const backtoTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const _scroll = () => {
  if (window.scrollY > 90) isShowTop.value = true
  else isShowTop.value = false
}

const scroll = debounce(_scroll, 30)

window.addEventListener('scroll', scroll as any)
</script>

<style lang="scss" scoped>
.layout-wrap {
  position: relative;
  .backtoTop {
    position: fixed;
    right: 40px;
    bottom: 160px;
    cursor: pointer;
    .icon-backtoTop {
      display: block;
      width: 49px;
      height: 44px;
      background: url('@/assets/icons/sprite.png') -265px -47px no-repeat;
      &:hover {
        background-position: -325px -47px;
      }
    }
  }
}
</style>
