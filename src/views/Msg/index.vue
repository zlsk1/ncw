<template>
  <div class="msg-wrap w980 fl">
    <div class="left">
      <h2>我的消息</h2>
      <div class="tabs">
        <div :class="['tabs-item', route.path === '/msg/at' ? 'active-tabs-item' : '']">
          <router-link to="/msg/at">
            <i class="icon-at" />
            <span>我的</span>
          </router-link>
        </div>
        <div :class="['tabs-item', route.path === '/msg/private' || route.path.includes('/private_detail') ? 'active-tabs-item' : '']">
          <router-link to="/msg/private">
            <i class="icon-private" />
            <span>私信</span>
            <span v-if="msgCount" class="f12 msgCount">{{ msgCount }}</span>
          </router-link>
        </div>
        <div :class="['tabs-item', route.path === '/msg/comment' ? 'active-tabs-item' : '']">
          <router-link to="/msg/comment">
            <i class="icon-comment" />
            <span>评论</span>
          </router-link>
        </div>
        <div :class="['tabs-item', route.path === '/msg/notify' ? 'active-tabs-item' : '']">
          <router-link to="/msg/notify">
            <i class="icon-notify" />
            <span>通知</span>
          </router-link>
        </div>
      </div>
      <el-button size="small" class="btn" :disabled="!msgCount">
        一键已读
      </el-button>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPlCountAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const msgCount = ref(0)

onMounted(() => { getMsg() })

const getMsg = async () => {
  const res = await getPlCountAPI()
  msgCount.value = res.data.msg
}
</script>

<style lang="scss" scoped>
.msg-wrap {
  border-left: 1px solid #d3d3d3;
  .left {
    flex: 1;
    padding: 40px 0 20px 0;
    background-color: #fcfcfc;
    h2 {
      padding-left: 30px;
      font-weight: normal;
    }
    .tabs {
      margin: 20px 0;
      background-color: #f7f7f7;
      .tabs-item {
        height: 60px;
        padding-left: 30px;
        line-height: 60px;
        text-align: start;
        border-top: 1px solid #dddddd;
        &:last-child {
          border-bottom: 1px solid #dddddd;
        }
        &:hover {
          background-color: #fff;
        }
        .msgCount {
          margin-left: 10px;
          padding: 0 3px;
          color: #fff;
          background-color: $themeColor;
          border-radius: 8px;
        }
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        i {
          display: inline-block;
          width: 22px;
          height: 21px;
          margin-right: 6px;
          vertical-align: middle;
          background: url('@/assets/icons/icon.png') no-repeat;
        }
        .icon-at {
          background-position: -64px -164px;
        }
        .icon-private {
          background-position: -64px -193px;
        }
        .icon-comment {
          background-position: -64px -245px;
        }
        .icon-notify {
          background-position: -58px -400px;
        }
      }
    }
    .active-tabs-item {
      position: relative;
      background-color: #fff;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: -1px;
        width: 1px;
        height: 100%;
        background-color: #fff;
      }
    }
    .btn {
      display: block;
      width: 120px;
      margin: auto;
      border-radius: 20px;
    }
  }
  .right {
    flex: 4;
    border-left: 1px solid #dddddd;
  }
}
</style>
