<template>
  <div class="login-wrap">
    <el-dialog
      v-model="isShowLogin"
      width="25%"
    >
      <template #header>
        <span class="header">手机号登录</span>
      </template>
      <el-form
        ref="loginForm"
        :model="loginFormData"
        :rules="loginFormRules"
        style="margin-bottom: 50px"
      >
        <el-form-item prop="phone">
          <el-input v-model="loginFormData.phone" placeholder="请输入手机号" style="width: 100%" />
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="loginFormData.captcha" style="width: 65%;margin-right: 10px" placeholder="请输入短信验证码" />
          <el-button style="width: calc(35% - 10px);">
            获取验证码
          </el-button>
        </el-form-item>
        <el-form-item class="btn-login">
          <el-button style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <span class="f12">密码登陆</span>
      <template #footer>
        &lt; <span>其他登录方式</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isShowLogin = ref(true)
const loginFormData = ref({
  phone: '',
  password: '',
  captcha: ''
})
const loginFormRules = ref({

})
</script>

<style lang="scss" scoped>
  .header {
    padding: 60px 0 0 0 ;
    .phone {
      width: 100%;
    }
    .btn-login {
      width: 100%;
    }
  }
</style>

<style>
  .login-wrap .el-dialog__header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 20px;
    color: #fff;
    background-color: #2d2d2d;
  }
  .login-wrap .el-dialog__body {
    padding: 60px 70px 20px;
  }
  .login-wrap .el-dialog__footer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 20px;
    text-align: left;
    font-size: 12px;
    color: #0c72c3;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
  }
  .login-wrap .el-dialog__headerbtn {
    top: 0;
    height: 40px;
  }
  .login-wrap .el-dialog__headerbtn:hover svg {
    color: #909399;
  }

  .login-wrap .el-input__wrapper {
    border-radius: 20px;
  }
  .login-wrap .el-input__wrapper {
    box-shadow: none;
    border: 1px solid #e5e5e5;
  }
  .login-wrap .el-input__wrapper:hover {
    box-shadow: none;
  }
  .login-wrap .el-input {
    width: 158px;
    font-size: 12px;
    color: #333;
  }
  .login-wrap .el-input__inner::-webkit-input-placeholder {
    color: #9b9b9b;
  }

  .login-wrap .el-button {
    font-size: 12px;
    color: #fff;
    background: #ff3a3a;
    border-radius: 20px;
    transition: 0s;
  }
</style>
