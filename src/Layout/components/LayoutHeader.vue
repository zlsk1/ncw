<template>
  <header class="header-wrap">
    <div class="w1100 fl-sb header">
      <div class="logo">
        <h1>
          <a href="/">网易云音乐</a>
        </h1>
      </div>
      <ul class="nav fl">
        <li>
          <router-link to="/" :class="route.meta.hasCate ? 'active-nav' : ''">
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/myMusic">
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
        @input="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="isFocus && searchSuggset" class="search-suggest">
        <div class="search-header">
          <router-link :to="`/search/${searchValue}/1002`" @mousedown="router.push(`/search/${searchValue}/1002`)">
            搜“{{ searchValue }}”相关用户
            <span><ArrowRight style="width: 1em; height: 1em" /></span>
          </router-link>
        </div>
        <div class="search-content">
          <dl v-if="searchSuggset?.songs" class="fl">
            <dt class="left">
              <i />
              <span>单曲</span>
            </dt>
            <div class="right">
              <dd v-for="item in searchSuggset?.songs" :key="item.id">
                <router-link :to="`/song/${item.id}`" @mousedown="router.push(`/song/${item.id}`)">
                  <p class="ellipsis-1">
                    {{ `${item.name}-${item.artists.map(v => v.name).join('/')}` }}
                  </p>
                </router-link>
              </dd>
            </div>
          </dl>
          <dl v-if="searchSuggset?.artists" class="fl">
            <dt class="left">
              <i />
              <span>歌手</span>
            </dt>
            <div class="right">
              <dd v-for="item in searchSuggset?.artists" :key="item.id">
                <router-link :to="`/artist/${item.id}`" @mousedown="router.push(`/artist/${item.id}`)">
                  <p class="ellipsis-1">
                    {{ item.name }}
                  </p>
                </router-link>
              </dd>
            </div>
          </dl>
          <dl v-if="searchSuggset?.albums" class="fl">
            <dt class="left">
              <i />
              <span>专辑</span>
            </dt>
            <div class="right">
              <dd v-for="item in searchSuggset?.albums" :key="item.id">
                <router-link :to="`/album/${item.id}`" @mousedown="router.push(`/album/${item.id}`)">
                  <p class="ellipsis-1">
                    {{ `${item.name}-${item.artist.name}` }}
                  </p>
                </router-link>
              </dd>
            </div>
          </dl>
          <dl v-if="searchSuggset?.playlists" class="fl">
            <dt class="left">
              <i />
              <span>歌单</span>
            </dt>
            <div class="right">
              <dd v-for="item in searchSuggset?.playlists" :key="item.id">
                <router-link :to="`/playlist/${item.id}`" @mousedown="router.push(`/playlist/${item.id}`)">
                  <p class="ellipsis-1">
                    {{ item.name }}
                  </p>
                </router-link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <router-link to="/" class="creator">
        <span>创作者中心</span>
      </router-link>
      <span
        v-if="!token && !avator"
        href=""
        class="f12 login thumb"
        @click="isShow = !isShow"
      >登录</span>
      <el-dropdown
        v-else
        class="avator"
        :teleported="false"
        @visible-change="dropdownChange"
        @command="logout"
      >
        <el-badge v-if="pl?.msg" :value="pl?.msg" :hidden="!isShowBadge">
          <img :src="avator + '?param=30y30'" alt="">
        </el-badge>
        <img v-else :src="avator + '?param=30y30'" alt="">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link :to="`/user/home/${userId}`">
                <span>我的主页</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/msg/private">
                <span>我的消息</span> <span v-if="pl?.msg" class="message">{{ pl?.msg }}</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/user/level">
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
    <LayoutCategory v-if="route.meta.hasCate" />
    <template v-else>
      <div class="bg-bar" />
    </template>
    <!-- <LayoutCategory /> -->
    <Login :is-show="isShow" @close="e => isShow = e" />
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { Search, ArrowRight } from '@element-plus/icons-vue'
import Login from '@/views/Login'
import LayoutCategory from './LayoutCategory'
import { getPlCountAPI } from '@/apis/user'
import { getSearchSuggest } from '@/apis/search'
import { getLoginStatusAPI } from '@/apis/login'
import { debounce } from '@/utils/index'

const route = useRoute()
const router = useRouter()

const store = useUserStore()
const { token, avator } = storeToRefs(store)

const userId = JSON.parse(localStorage.getItem('userInfo'))?.profile.userId

const searchValue = ref('')
const isShow = ref(false)
const isShowBadge = ref(true)
const pl = ref(null)
const searchSuggset = ref(null)
const isFocus = ref(false)

onMounted(() => {
  getPlCount()
  getLoginStatusAPI()
})

const dropdownChange = e => {
  isShowBadge.value = !e
}

const logout = () => {
  store.logoutAction()
}

const getPlCount = async () => {
  const res = await getPlCountAPI()
  pl.value = res.data
}

const _handleSearch = async e => {
  if (e.trim()) {
    const res = await getSearchSuggest(searchValue.value)
    searchSuggset.value = res.data.result
  } else {
    searchSuggset.value = null
  }
}

const handleSearch = debounce(_handleSearch, 20)

const handleFocus = () => { isFocus.value = !isFocus.value }

const handleBlur = () => { isFocus.value = !isFocus.value }
</script>

<style lang="scss" scoped>
  .header-wrap {
    color: #fff;
    background: $bg_deep;
    .header {
      height: 70px;
      line-height: 70px;
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
      .search-suggest {
        position: absolute;
        top: 60px;
        right: 60px;
        width: 260px;
        line-height: 30px;
        font-size: 12px;
        color: #000;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 4px #ccc;
        z-index: 1000;
        .search-header {
          height: 40px;
          padding: 0 10px;
          line-height: 40px;
          border-bottom: 1px solid #e2e2e2;
          span {
            vertical-align: middle;
          }
        }
        .search-content {
          .left {
            padding: 0 10px;
            dt {
              flex: 1;
            }
          }
          dl {
            &:last-child div {
              border-bottom: none;
            }
            div {
              border-bottom: 1px solid #e3e5e7;
            }
            .right {
              flex: 2.5;
              border-left: 1px solid #e2e2e2;
              dd {
                // height: 20px;
                // line-height: 20px;
                &:hover {
                  background-color: #e3e5e7;
                }
                p {
                  max-width: 200px;
                  padding: 0 10px;
                }
              }
            }
          }
        }
      }
    }
    .bg-bar {
      width: 100%;
      height: 5px;
      background: $themeColor;
    }
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
