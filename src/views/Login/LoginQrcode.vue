<template>
  <div v-loading="isLoad" class="fl-sb w980 code-wrap container">
    <img class="desc" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" alt="">
    <div class="f12">
      <p class="title f20 ">
        扫码登陆
      </p>
      <img
        v-if="qrCodeUrl"
        :src="qrCodeUrl"
        alt=""
        class="qrcode"
      >
      <div v-else class="error">
        <el-image class="qrcode">
          <template #error>
            <div class="image-slot">
              <Picture />
            </div>
          </template>
        </el-image>
        <p>二维码已过期</p>
        <el-button size="small" @click="createQrCode">
          点击刷新
        </el-button>
      </div>
      <p>使用<a href="https://music.163.com/#/download" target="_blank" class="tar">网易云音乐app</a>扫码登录</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getQrKeyAPI,
  createQrCodeAPI,
  checkQrCodeAPI
} from '@/apis/login'
import { getUserAccountAPI } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const isLoad = ref(true)
const qrCodeUrl = ref('')
let timer = null

onMounted(() => {
  createQrCode()
  console.log(route)
})

onUnmounted(() => {
  createQrCode = null
})

let createQrCode = async () => {
  isLoad.value = true
  const res = await getQrKeyAPI()
  const qr = await createQrCodeAPI({ key: res.data.data.unikey })
  qrCodeUrl.value = qr.data.data.qrimg
  isLoad.value = false
  timer = setInterval(async () => {
    const status = await checkQrCodeAPI(res.data.data.unikey)
    if (status.data.code === 803) {
      clearInterval(timer)
      const { data } = await getUserAccountAPI()
      localStorage.setItem('userInfo', JSON.stringify(data))
      userStore.nickname = data.profile.nickname
      userStore.avator = data.profile.avatarUrl
      ElMessage.success('登录成功！')
      route.redirectedFrom
        ? router.push({ path: route.redirectedFrom.fullPath })
        : router.push({ path: '/' })
    } else if (status.data.code === 800 && status.data.message === '二维码不存在或已过期') {
      qrCodeUrl.value = ''
      clearInterval(timer)
      timer = null
    }
  }, 3000)
}
</script>

<style scoped lang="css">
@import './qrcode.scss';
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 40px;
  border: 1px solid #d8d8d8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
