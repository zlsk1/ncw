<template>
  <div class="userInfo-wrap">
    <div>
      <img :src="avator" alt="">
      <div>
        <div>
          <span class="nickname">{{ nickname }}</span>
          <i />
        </div>
        <div class="level" />
        <i class="signin" />
      </div>
    </div>
    <ul>
      <li>
        <router-link to="/">
          <p />
          <p>动态</p>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <p />
          <p>关注</p>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <p />
          <p>粉丝</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'

const store = useUserStore()
const { avator } = storeToRefs(store)
const { nickname } = storeToRefs(store)
</script>
