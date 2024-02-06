<template>
  <div>
    <h2 class="title">
      个人设置
    </h2>
    <ul class="tabs">
      <li :class="route.path.includes('/update') ? 'active-tabs' : ''" style="border-left: 0px">
        <router-link to="/user/update">
          基本设置
        </router-link>
      </li>
      <li :class="route.path.includes('/binding') ? 'active-tabs' : ''">
        <router-link :to="`/user/binding/${userId}`">
          绑定设置
        </router-link>
      </li>
      <li>
        <router-link :to="route.path">
          隐私设置
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const userId = JSON.parse(localStorage.getItem('userInfo'))?.profile.userId

const route = useRoute()
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: normal;
  }
  .tabs {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    background: linear-gradient(#f9f9f9, #f8f8f8, #f7f7f7, #f6f6f6);
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-top: 2px solid #ccc;
    li {
      position: relative;
      &:hover::after {
        content: '';
        position: absolute;
        top: -2px;
        right: -1px;
        width: calc(100% + 2px);
        height: 2px;
        background-color: $themeColor;
      }
      a {
        display: block;
        padding: 10px 40px;
      }
    }
    .active-tabs {
      position: relative;
      background: linear-gradient(#fafafa, #fbfbfb, #fcfcfc, #fdfdfd, #fefefe);
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -1px;
        width: calc(100% + 2px);
        height: 2px;
        background-color: $themeColor;
      }
      &::before {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #fff;
      }
    }
  }
</style>
