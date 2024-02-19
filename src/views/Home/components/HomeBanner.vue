<template>
  <div class="banner-wrap">
    <el-carousel
      class="w980"
      height="285px"
      trigger="click"
      :interval="5000"
      arrow="always"
    >
      <el-carousel-item v-for="item in bannerList" :key="item.targetId">
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
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { getBanner } from '@/apis/home'
import { onMounted, ref } from 'vue'

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
:deep(.el-carousel__indicators--horizontal) {
  left: calc((100% - 245px) / 2);
}
:deep(.el-carousel__button) {
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
:deep(.el-carousel__button&:hover) {
  background-color: #c60b11;
}
:deep(.el-carousel .is-active .el-carousel__button) {
  background-color: #c60b11;
}
</style>
