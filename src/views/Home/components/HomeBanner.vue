<template>
  <div class="banner-wrap">
    <CarouselWrap class="w980" height="285px">
      <CarouselItem v-for="item in bannerList" :key="item.targetId">
        <router-link v-if="item.targetId" class="fl download-wrap" :to="`/song/${item.targetId}`">
          <img :src="item.imageUrl" alt="" style="width: 75%">
          <a href="" class="download" />
        </router-link>
        <a
          v-else
          :href="item.url"
          target="_blank"
          class="fl download-wrap"
        >
          <img :src="item.imageUrl" alt="" style="width: 75%">
          <a href="" class="download" />
        </a>
      </CarouselItem>
    </CarouselWrap>
  </div>
</template>

<script setup>
import { getBanner } from '@/apis/home'
import { onMounted, ref } from 'vue'
import CarouselWrap from '@/components/Carousel/CarouselWrap'
import CarouselItem from '@/components/Carousel/CarouselItem'

const bannerList = ref([])

const getBannerList = async () => {
  const res = await getBanner()
  bannerList.value = res.data.banners
}

onMounted(() => {
  getBannerList()
})
</script>

<style lang="scss" scoped>
.banner-wrap {
  text-align: center;
  background-color: $bg_deep;
}
.download-wrap {
  height: 100%;
}
.download {
  width: 25%;
  background: url('@/assets/icons/download.png');
}
</style>

<style>
  .el-carousel__button {
    display: block;
    opacity: .48;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    transition: .3s;
  }
  .el-carousel .is-active .el-carousel__button{
    background-color: #c60b11;
  }
</style>
