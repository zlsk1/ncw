<template>
  <div class="w980 bind-wrap">
    <UserHeader />
    <div class="edit fl-sb f12">
      <div class="left fl-sb">
        <i class="icon-phone" />
        <div>
          <p class="tel">
            手机
          </p>
          <p>使用手机注册：+86 {{ hideTel(phone) }} <span class="edit-tel">修改</span></p>
        </div>
      </div>
      <el-button class="btn" @click="openPassword">
        修改密码
      </el-button>
    </div>
    <el-dialog
      v-model="isPassword"
      class="edit-password"
      width="30%"
      draggable
    >
      <template #header>
        <span>修改密码</span>
      </template>
      <span>你的手机号：<span class="fw">+86  {{ hideTel(phone) }}</span></span>
      <el-form class="edit-password-form">
        <el-form-item>
          <el-input placeholder="设置登录密码，不少于8位" />
        </el-form-item>
        <el-form-item class="btn-full">
          <el-button>下一步</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import UserHeader from './UserHeader'
import { hideTel } from '@/utils/index'
import { onBeforeUnmount, ref } from 'vue'

const phone = '11111111111'

const isPassword = ref(false)

onBeforeUnmount(() => {
  openPassword = null
})

let openPassword = () => { isPassword.value = !isPassword.value }

</script>

<style lang="scss" scoped>
.bind-wrap {
  padding: 40px;
  border: 1px solid #ccc;
  .edit {
    padding: 20px 30px;
    background-color: #f8f8f8;
    border: 1px solid #dfdfdf;
    .left {
      .icon-phone {
        display: block;
        width: 58px;
        height: 58px;
        margin-right: 10px;
        background: url('@/assets/icons/logo.png') 0 -130px no-repeat;
      }
      .tel {
        margin-bottom: 4px;
        font-size: 16px;
        color: #aaa;
      }
      .edit-tel {
        margin-left: 10px;
        color: $primaryColor1;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .btn {
      width: 90px;
    }
  }
  .edit-password {
    .edit-password-form {
      width: 240px;
      margin: auto;
      margin-top: 10px;
      .btn-full {
        button {
          width: 100%;
        }
      }
    }
  }
  :deep(.el-dialog__body) {
    text-align: center;
  }
}
</style>
