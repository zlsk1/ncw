<template>
  <header class="header-wrap">
    <div class="w1100 fl-sb">
      <div class="logo">
        <h1>
          <a href="/">网易云音乐</a>
        </h1>
      </div>
      <ul class="nav fl">
        <li>
          <router-link to="/" class="active-nav">
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/">
            我的音乐
          </router-link>
        </li>
        <li>
          <router-link to="/">
            关注
          </router-link>
        </li>
        <li>
          <router-link to="/">
            商城
          </router-link>
        </li>
        <li>
          <router-link to="/">
            音乐人
          </router-link>
        </li>
        <li>
          <router-link to="/">
            云推歌
          </router-link>
        </li>
        <li>
          <router-link to="/">
            下载客户端
          </router-link>
        </li>
      </ul>
      <el-input
        v-model="searchValue"
        :prefix-icon="Search"
        placeholder="音乐/视频/电台/用户"
      />
      <router-link to="/" class="creator">
        <span>创作者中心</span>
      </router-link>
      <span
        v-if="!token"
        href=""
        class="f12 login thumb"
        @click="isShow = !isShow"
      >登录</span>
      <el-dropdown
        v-else
        class="avator"
        @visible-change="dropdownChange"
        @command="logout"
      >
        <el-badge :value="12" :hidden="!isShowBadge">
          <img :src="avator + '?param=30y30'" alt="">
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">
                <span>我的主页</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">
                <span>我的消息</span> <span class="message">{{ 12 }}</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">
                <span>我的等级</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">
                <span>VIP会员</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link to="/">
                <span>个人设置</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">
                <span>实名认证</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="1">
              <router-link to="/">
                <span>退出</span>
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="category-wrap">
      <div class="w1100">
        <ul>
          <li>
            <router-link to="/" :class="route.path === '/' ? 'active-category' : ''">
              推荐
            </router-link>
          </li>
          <li>
            <router-link to="/toplist" :class="route.path.includes('/toplist') ? 'active-category' : ''">
              排行榜
            </router-link>
          </li>
          <li>
            <router-link to="/">
              歌单
            </router-link>
          </li>
          <li>
            <router-link to="/">
              主播电台
            </router-link>
          </li>
          <li>
            <router-link to="/">
              歌手
            </router-link>
          </li>
          <li>
            <router-link to="/">
              新碟上架
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <Login :is-show="isShow" @close="e => isShow = e" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { Search } from '@element-plus/icons-vue'
import Login from '@/views/login'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useUserStore()
const { token } = storeToRefs(store)
const { avator } = storeToRefs(store)

const searchValue = ref('')
const isShow = ref(false)
const isShowBadge = ref(true)

const dropdownChange = e => {
  isShowBadge.value = !e
}
const logout = () => {
  store.logoutAction()
}
</script>

<style lang="scss" scoped>
  .header-wrap {
    height: 100px;
    line-height: 70px;
    color: #fff;
    background: $bg_deep;
    .logo {
      width: 158px;
      height: 70px;
      background: url('@/assets/icons/topbar.png') no-repeat;
      cursor: pointer;
      h1 {
        width: 100%;
        height: 100%;
        a {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
    .creator {
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      color: #fff;
      border: 1px solid #666;
      border-radius: 20px;
      &:hover {
        border: 1px solid #ccc;
      }
    }
    .avator {
      img {
        border-radius: 50%;
      }
    }
    .nav {
      li {
        a {
          position: relative;
          display: block;
          height: 70px;
          padding: 0 18px;
          color: #fff;
          &:hover {
            background-color: #000;
          }
        }
      }
    }
    .login {
      color: #787878;
      &:hover {
        text-decoration: underline;
        color: #aaa;
      }
    }
    .category-wrap {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: $themeColor;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 500px;
        margin-left: 204px;
        a {
          padding: 3px 12px;
          font-size: 12px;
          color: #fff;
          border-radius: 20px;
          &:hover {
            background-color: #9b0909;
          }
        }
      }
    }
  }
  .active-category {
    background-color: #9b0909;
  }
  .active-nav {
    background-color: #000;
    &::after {
      content: '';
      position: absolute;
      right: calc(50% - 6px);
      bottom: 0;
      width: 0;
      height: 0;
      border-width: 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent $themeColor;
    }
  }
  .message {
    display: inline-block;
    width: 24px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background-color: $themeColor;
    border-radius: 10px;
  }
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
    .el-input__inner::-webkit-input-placeholder {
      color: #9b9b9b;
    }
  }
  :deep(.el-input) {
    width: 158px;
    font-size: 12px;
    color: #333;
  }
  :deep(.el-input__inner::-webkit-input-placeholder) {
    color: #9b9b9b;
  }
  :deep(.el-badge__content--danger) {
    background-color: #c20c0c;
    border: none;
  }
</style>
