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
        <el-form-item>
          <el-input v-model="loginFormData.captcha" style="width: 65%;margin-right: 10px" placeholder="请输入短信验证码" />
          <el-button
            v-if="!isSentCaptcha"
            ref="getcaptcha"
            style="width: calc(35% - 10px);"
            :disabled="!isPhone"
            @click="getCaptcha"
          >
            获取验证码
          </el-button>
          <el-button v-else :disabled="!isPhone">
            {{ captchaCountdown }}秒后重发
          </el-button>
        </el-form-item>
        <el-form-item class="btn-login">
          <el-button style="width: 100%" :disabled="isCaptcha" @click="handleLogin(loginForm)">
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
import { loginByCaptcha, schemaCaptcha } from '@/apis/login'
import { ref, onMounted, watch } from 'vue'

const isShowLogin = ref(true)
const loginForm = ref('')
const isPhone = ref(false)
const isCaptcha = ref(true)
const isSentCaptcha = ref(false)
const captchaCountdown = ref(30)
const reg = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/)

const loginFormData = ref({
  phone: '',
  password: '',
  captcha: ''
})
const loginFormRules = ref({
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'change' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合规的电话号码', trigger: 'blur' }
  ]
})

onMounted(() => {

})
watch(() => loginFormData.value.phone, val => {
  reg.test(val) ? isPhone.value = true : isPhone.value = false
})
watch(() => loginFormData.value.captcha, async val => {
  if (val.trim().length === 4 && reg.test(val.phone)) {
    const res = await schemaCaptcha(loginFormData.value)
    res.data.code === 200 ? isCaptcha.value = false : ''
  }
})

const handleLogin = async formName => {
  await loginForm.value.validate((valid, fields) => {
    if (valid) console.log('submit')
    else console.log('error submit!', fields)
  })
}
const getCaptcha = async () => {
  const res = await loginByCaptcha(loginFormData.value.phone)
  if (res.data.code === 200) {
    isCaptcha.value = true
    isPhone.value = true
    isSentCaptcha.value = true
    const i = setInterval(() => {
      if (captchaCountdown.value < 1) {
        isCaptcha.value = false
        isPhone.value = false
        isSentCaptcha.value = false
        return clearInterval(i)
      }
      captchaCountdown.value--
    }, 1000)
  }
}

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
</style>
