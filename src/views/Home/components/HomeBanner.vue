<template>
  <div class="banner-wrap">
    <el-carousel
      height="285px"
      class="w980"
      trigger="click"
      arrow="always"
    >
      <el-carousel-item v-for="item in bannerList" :key="item.targetId">
        <img :src="item.imageUrl" alt="">
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
  img {
    width: 980px;
  }
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
